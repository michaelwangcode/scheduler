import React from "react";
import { render, cleanup, waitForElement, fireEvent } from "@testing-library/react";
import Application from "components/Application";

afterEach(cleanup);


// Check to see if the page loads on Monday
it("defaults to Monday and changes the schedule when a new day is selected", () => {
  const { getByText } = render(<Application />);

  // Wait until we can get a DOM element with the text "Monday"
  return waitForElement(() => getByText("Monday")).then(() => {

    // Click on "Tuesday" 
    fireEvent.click(getByText("Tuesday"));

    // Expect to see the student named "Leopold Silvers"
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });
});