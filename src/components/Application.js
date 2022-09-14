import React from "react";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData";


// Application component
export default function Application() {

  // Use our custom useApplicationData hook to manage state
  // and import the bookInterview and cancelInterview functions
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  // Store an array of appointments for one day
  const dailyAppointments = getAppointmentsForDay(state, state.day);

  // Store an array of interviewers for one day
  const dailyInterviewers = getInterviewersForDay(state, state.day);


  // Convert the appointments object into an array
  const appointmentsArray = dailyAppointments.map((appointment) => {

    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={appointment.id} 
        id={appointment.id}
        time={appointment.time}
        interviewers={dailyInterviewers}
        interview={interview}
        bookInterview={bookInterview} // Pass the bookInterview function
        cancelInterview={cancelInterview}
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
        <Appointment key="last" time="5pm" bookInterview={bookInterview}/>

      </section>
    </main>
  );
}
