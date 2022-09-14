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
    appointments: {}
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

        // Call setState with the new state object
        setState({...state, appointments});
      })
  }


  // Function for cancelling (deleting) an existing interview
  function cancelInterview(id) {

    // Update the appointments object
    const appointments = {
      ...state.appointments,
      id: {}
    };

    // Delete the appointment from the database
    return axios.delete(`api/appointments/${id}`)
      .then(() => {

        // Call setState with the new state object
        setState({...state, appointments});
      })
  }


  return { state, setDay, bookInterview, cancelInterview }
}