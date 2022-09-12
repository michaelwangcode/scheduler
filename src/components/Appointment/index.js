import React from "react";
import "components/Appointment/styles.scss";
import useVisualMode from "hooks/useVisualMode";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";



// Appointment component
export default function Appointment(props) {
  
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  

  // Use our useVisualMode hook
  // If props.interview contains a value, use the SHOW mode
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );


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
          interviewers={[]}
          onCancel={back}
        />
      )}

    </article>
  )
}