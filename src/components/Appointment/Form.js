import React, { useState } from 'react';
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";



export default function Form(props) {

  // Set the default state for student and interviewer
  // If there is no student/interviewer, then it will use an empty string/null
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

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


  return (

    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          {/* Input text field */}
          <input
            className="appointment__create-input text--semi-bold"
            value={student}
            name={student}
            type="text"
            placeholder="Enter Student Name"
            onChange={(event) => setStudent(event.target.value)}
          />
        </form>
        {/* Interviewer List */}
        <InterviewerList 
          interviewer={interviewer}
          interviewers={props.interviewers}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel} >Cancel</Button>
          <Button confirm onClick={event => props.onSave(student, interviewer)}  >Save</Button>
        </section>
      </section>
    </main>

  )

}