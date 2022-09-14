import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import Form from "components/Appointment/Form";

afterEach(cleanup);


// A group of tests for the Form component
describe("Form", () => {

  // The interviewers array for our test
  const interviewers = [
    {
      id: 1,
      student: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    }
  ];



  //----- TEST 1: Render form without student name if it is not provided -----//
  it("renders without student name if not provided", () => {

    // Render a form, and pass down the interviewers object as a prop
    const { getByPlaceholderText } = render(
      <Form interviewers={interviewers}/>
    )
    
    // Expect the element with the placeholder text "Enter Student Name" to have value ""
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  });



  //----- TEST 2: Render form with the initial student name if it is provided -----//
  it("renders with initial student name", () => {

    // Render a form, and pass down a student name as a prop
    const { getByTestId } = render(
      <Form interviewers={interviewers} student="Lydia Miller-Jones"/>
    )
    
    // Expect the student name field to contain the student name
    expect(getByTestId("student-name-input")).toHaveValue("Lydia Miller-Jones");
  });



  //----- TEST 3: When saving an appointment, check that the student name is not blank -----//
  it("validates that the student name is not blank", () => {

    /* 1. Create the mock onSave function */
    const onSave = jest.fn();

    /* 2. Render the Form with interviewers and the onSave mock function passed as an onSave prop, the student prop should be blank or undefined */
    const { getByText } = render(
      <Form interviewers={interviewers} onSave={onSave} />
    )

    /* 3. Click the save button */
    fireEvent.click(getByText("Save"));

    // Expect the error message to be in the document and expect onSave to not have been called
    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  });
  

  //----- TEST 4: When saving an appointment, check that the interviewer cannot be null -----//
  it("validates that the interviewer cannot be null", () => {

    /* 1. Create the mock onSave function */
    const onSave = jest.fn();

    /* 2. Render the Form with interviewers and the onSave mock function passed as an onSave prop, the interviewer prop should be null */
    const { getByText } = render(
      <Form interviewers={interviewers} onSave={onSave} student="Lydia Miller-Jones" />
    )

    /* 3. Click the save button */
    fireEvent.click(getByText("Save"));

    // Expect the error message to be in the document and expect onSave to not have been called
    expect(getByText(/please select an interviewer/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  });
  

  //----- TEST 5: Save the appointment if a name and interviewer is provided -----//
  it("calls onSave function when the name and interviewer is defined", () => {
    /* 1. Create the mock onSave function */
    const onSave = jest.fn();

    /* 2. Render the Form with interviewers, name and the onSave mock function passed as an onSave prop */
    const { queryByText } = render(
      <Form interviewers={interviewers} student="Lydia Miller-Jones" interviewer={1} onSave={onSave} />
    )

    /* 3. Click the save button */
    fireEvent.click(queryByText("Save"));

    // Expect no error messages to show up
    expect(queryByText(/student name cannot be blank/i)).toBeNull();
    expect(queryByText(/please select an interviewer/i)).toBeNull();

    // Expect the onSave function to be called once 
    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", 1);
  });


});