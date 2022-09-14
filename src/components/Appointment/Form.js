import React, { useState } from 'react';
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";



// The Form component
export default function Form(props) {

  // Set the default state for student and interviewer
  // If there is no student/interviewer, then it will use an empty string/null
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  // Set the default state for the error message
  const [error, setError] = useState("");


  // Reset function used by the cancel function
  let reset = function() {
    setStudent("");
    setInterviewer();
  }

  // Cancel function for the Cancel button
  let cancel = function() {
    reset();
    props.onCancel();
  }

  // Validate whether a student name and interviewer have been selected
  function validate() {

    // If the student name has not been entered, display an error message
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    }

    // If the interviewer has not been selected, display an error message
    if (interviewer === null) {
      setError("Please select an interviewer");
      return;
    }
  
    // Save the student and interviewer
    props.onSave(student, interviewer);
  }


  return (

    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">

          {/* Input text field */}
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={event => {
              setStudent(event.target.value);
            }}
            data-testid="student-name-input"
          />
          
        </form>
        
        {/* Error Message */}
        <section className="appointment__validation">{error}</section>

        {/* Interviewer List */}
        <InterviewerList 
          interviewer={interviewer}
          interviewers={props.interviewers}
          onChange={setInterviewer}
        />

      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={event => validate()}>Save</Button>
        </section>
      </section>
    </main>

  )

}