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

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";



// Appointment component
export default function Appointment(props) {
  
  // Use our useVisualMode hook
  // If props.interview contains a value, use the SHOW mode
  const { mode, transition, back, backToForm } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );


  // Function for saving appointments
  function save(name, interviewer) {

    // If name or interviewer are blank, don't save
    if (!name || !interviewer) {
      return
    }

    // Store the interview info
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
        .then(() => {

          // Transition to the SHOW mode          
          transition(SHOW);
        })
        .catch((error) => {

          // Transition to the ERROR_SAVE mode          
          transition(ERROR_SAVE, true);
        })

    }, 1000);
  }


  // Function for editing appointments
  function edit(name, interviewer) {

    // If name or interviewer are blank, don't save
    if (!name || !interviewer) {
      return
    }

    // Store the interview info
    const interview = {
      student: name,
      interviewer
    };

    // Transition to the SAVING mode
    transition(SAVING);

    // Add a 1 second delay (to simulate fetching data)
    setTimeout(function () {
  
      // Call the editInterview function that was passed down
      props.editInterview(props.id, interview)
        .then(() => {

          // Transition to the SHOW mode          
          transition(SHOW);
        })
        .catch((error) => {

          // Transition to the ERROR_SAVE mode          
          transition(ERROR_SAVE, true);
        })

    }, 1000);
  }


  // Function for deleting appointment
  function deleteAppointment() {

    // If the mode is currently SHOW,
    if (mode === SHOW) {

      // Transition to the CONFIRM mode ("Delete this appointment?")
      transition(CONFIRM);
      
    } else {

      // Transition to the DELETE mode
      transition(DELETING, true);

      // Add a 1 second delay (to simulate deleting data)
      setTimeout(function () {

        // Call the cancelInterview function passed down from Application
        props.cancelInterview(props.id)
          .then(() => {

            // Transition to the EMPTY mode
            transition(EMPTY);
          })
          .catch(() => {

            // Transition to the ERROR_DELETE mode          
            transition(ERROR_DELETE, true);
          })

      }, 1000);
    }
  }


  // Function for editing an appointment
  function editAppointment() {

    // Transition to the EDIT mode
    transition(EDIT);
  }


  // Return the Application component
  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time}></Header>

      {/* Add the Empty component with the (+) button */}
      {/* Clicking it will transition to the CREATE mode */}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      
      {mode === SHOW && (
        // Add the Show component
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={deleteAppointment}
          onEdit={editAppointment}
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

      {mode === DELETING && (
        <Status
          message={"Deleting"}
        />
      )}

      {mode === CONFIRM && (
        <Confirm
          message={"Are you sure you would like to delete?"}
          onCancel={back}
          onConfirm={deleteAppointment}
        />
      )}

      {mode === EDIT && (
        <Form
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onCancel={back}
          onSave={edit}
        />
      )}

      {mode === ERROR_SAVE && (
        <Error
          message={"Could not create appointment"}
          onClose={backToForm}
        />
      )}

      {mode === ERROR_DELETE && (
        <Error
          message={"Could not cancel appointment"}
          onClose={back}
        />
      )}

    </article>
  )
}