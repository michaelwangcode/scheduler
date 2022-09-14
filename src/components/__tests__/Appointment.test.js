import React from "react";
import { render } from "@testing-library/react";    // Import the render functon from the testing-library
import Appointment from "components/Appointment";   // Import the files in the Appointment folder


// The describe function is used to group a series of tests
describe("Appointment", () => {

  it("renders without crashing", () => {
    render(<Appointment />);
  });

  // The 'it' and 'test' keywords both do the same thing
  it("does something it is supposed to do", () => {
    // ...
  });

  test("does something else it is supposed to do", () => {
    // ...
  });

  // The 'xit' and 'test.skip' functions 
  xit("does something it is supposed to do", () => {
    // ...
  });
  
  // or if using test
  test.skip("does something it is supposed to do", () => {
    // ...
  });

  // Use jest.fn to make a mock function
  it("calls the function", () => {
    const fn = jest.fn();
    fn();
    expect(fn).toHaveBeenCalledTimes(1);
   });

   it("calls the function with specific arguments", () => {
    const fn = jest.fn();
    fn(10);
    expect(fn).toHaveBeenCalledWith(10);
   });
});

