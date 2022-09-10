import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import axios from "axios";
import { getAppointmentsForDay, getInterview } from "helpers/selectors";



// Application component
export default function Application(props) {

  // Combine the day, days and appointments into one state variable
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  })

  // set functions
  const setDay = day => setState({...state, day});
  
  // Set the days and appointments at the same time using a promise
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
      console.log(all);
    })
  }, [])
  

  // Store an array of appointments for one day
  const dailyAppointments = getAppointmentsForDay(state, state.day);

  // Convert the appointments object into an array
  const appointmentsArray = dailyAppointments.map((appointment) => {

    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={appointment.id} 
        id={appointment.id}
        time={appointment.time}
        interview={interview}
      />
    );
  });

  // Return the Application component
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />

        {/* Display the Days list in the sidebar */}
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
        </nav>

        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>

      {/* Display the Schedule in the schedule section */}
      <section className="schedule">

        {appointmentsArray}
        <Appointment key="last" time="5pm" />

      </section>
    </main>
  );
}
