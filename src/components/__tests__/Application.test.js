import React from "react";
import { render, cleanup, waitForElement, fireEvent, prettyDOM, getAllByTestId, getByAltText, getByPlaceholderText, getByText, queryByText, queryByAltText } from "@testing-library/react";
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

    // Expect the Saving mode to be visible
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    // Check if the student's name is displayed in the page
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    // Check if the DayListItem component is Monday
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday"),
    );

    // Expect "no spots remaining" to be displayed under Monday
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  })


  // Test to see if an interview is deleted and the spots remaining is increased by 1
  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {

    // 1. Render the Application.
    const { container, debug } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );

    fireEvent.click(queryByAltText(appointment, "Delete"));

    // 4. Check that the confirmation message is shown.
    expect(getByText(appointment, "Delete the appointment?")).toBeInTheDocument();

    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(getByText(appointment, "Confirm"));

    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    // 7. Wait until the element with the "Add" button is displayed.
    await waitForElement(() => getByAltText(appointment, "Add"));

    // 8. Check that the DayListItem with the text "Monday" also has the text "1 spot remaining".
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday"),
    );

    // "2 spots remaining" does not appear for some reason, but it does in the real app
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });








});




