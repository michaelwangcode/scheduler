import React from "react";
import "components/Appointment/styles.scss";
import useVisualMode from "hooks/useVisualMode";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
//import Status from "./Status";
//import Confirm from "./Confirm";
//import Error from "./Error";



// Appointment component
export default function Appointment(props) {
  
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  

  // Use our useVisualMode hook
  // If props.interview contains a value, use the SHOW mode
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );


  // Function for saving interviews
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    // Transition to the SAVING mode
    transition(SAVING);

    // Add a 1 second delay (to simulate fetching data)
    setTimeout(function () {
  
      // Call the bookInterview function that was passed down
      props.bookInterview(props.id, interview)

      // Transition to the SHOW mode
      transition(SHOW);
                
    }, 1000);
  }


  // Return the Application component
  return (
    <article className="appointment">
      <Header time={props.time}></Header>

      {/* Add the Empty component with the (+) button */}
      {/* Clicking it will transition to the CREATE mode */}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      
      {mode === SHOW && (
        // Add the Show component
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
      
      {mode === CREATE && (
        // Add the Create component
        <Form
          name={props.name}
          value={props.value}
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}

      {mode === SAVING && (
        <Status
          message={"Saving"}
        />
      )}

    </article>
  )
}