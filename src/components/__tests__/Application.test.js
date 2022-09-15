import React from "react";
import { render, cleanup, waitForElement, fireEvent, prettyDOM, getAllByTestId, getByAltText, getByPlaceholderText, getByText } from "@testing-library/react";
import Application from "components/Application";

afterEach(cleanup);


// A group of tests for the Application component
describe("Application", () => {

  // Check to see the page changes when a new day is selected
  it("changes the schedule when a new day is selected", () => {

    const { getByText } = render(<Application />);

    // Wait until we can get a DOM element with the text "Monday"
    return waitForElement(() => getByText("Monday")).then(() => {

      // Click on "Tuesday" 
      fireEvent.click(getByText("Tuesday"));

      // Expect to see the student named "Leopold Silvers"
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });
  });


  // Test to see if an interview is booked and the spots remaining is reduced by 1
  it("loads data, books an interview and reduces the spots remaining for the first day by 1",  async () => {

    const { container } = render(<Application />);

    // Wait until the element containing Archie Cohen renders
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // Store the first appointment
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];
  
    // Click Add button
    fireEvent.click(getByAltText(appointment, "Add"));
  
    // Enter Lydia Miller-Jones as the student name
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    // Click on Sylvia Palmer as the interviewer
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
  
    // Click on the Save button 
    fireEvent.click(getByText(appointment, "Save"));
  
    // Print the appointment component to the console
    // console.log(prettyDOM(appointment));
  })

});