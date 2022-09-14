import { useState, useEffect} from "react";
import axios from "axios";


// Create a custom hook called useApplicationData
// It keeps track of the current state of the Application
export default function useApplicationData() {

  // Use the useState hook to keep track of the current state
  // Store the default state as Monday with no days or appointments
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
  })

  // The setDay function sets the day to the current state
  const setDay = day => setState({...state, day});

  // Set the days and appointments at the same time using a promise
  // It uses the axios library to get the data
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
      // console.log(all);
    })
  }, [])


  // Function for booking interviews
  function bookInterview(id, interview) {

    // Update the appointment object
    // Add the interview to the "appointments" section of the database
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
  
    // Update the appointments object
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    // Save the interview data to the appointments database with the following format:
    // "interview": { student: "Archie Cohen", interviewer: 2 }
    return axios.put(`api/appointments/${id}`, {"interview": interview})
      .then(() => {

        // Call the updateSpots function
        // This updates the number of spots in the days array
        updateSpots(-1);

        // Call setState with the new state object
        setState({...state, appointments});
      })
  }


  // Function for cancelling (deleting) an existing interview
  function cancelInterview(id) {

    // Update the appointment object
    // Set the interview to null
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    // Update the appointments object
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    // Delete the appointment from the database
    return axios.delete(`api/appointments/${id}`)
      .then(() => {

        // Call the updateSpots function
        // This updates the number of spots in the days array
        updateSpots(1);

        // Call setState with the new state object
        setState({...state, appointments});
      })
  }


  
  // This helper function updates the number of spots in the days array
  // Num is 1 or -1 depending on if an appointment is being created or deleted
  function updateSpots(num) {

    // Store the index of the day in the days array
    let dayIndex;

    // Set the current index in the days array depending on the day
    if (state.day === "Monday") {
      dayIndex = 0;
    } else if (state.day === "Tuesday") {
      dayIndex = 1;
    } else if (state.day === "Wednesday") {
      dayIndex = 2;
    } else if (state.day === "Thursday") {
      dayIndex = 3;
    } else if (state.day === "Friday") {
      dayIndex = 4;
    }

    // Set the spots for that day
    // Num is 1 or -1 depending on if an appointment is being created or deleted
    state.days[dayIndex].spots += num;
  }


  return { state, setDay, bookInterview, cancelInterview }
}