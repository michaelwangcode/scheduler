// This function returns an array of appointments for that day
// It takes in a state object (containing an array of days and an object of appointments)
// It takes in a day as a String: "Monday" etc.
export function getAppointmentsForDay(state, day) {

  // Store the appointment days by iterating through the days array
  let days = state["days"];
  let appointmentNumbers = [];

  // Iterate through the days array
  for (let d of days) {
    // If the day name is equal to the specified day,
    if (d.name === day) {
      // Save its appointments array
      appointmentNumbers = d.appointments;
    }
  }

  // Store the appointment details in a new array
  let appointmentDetails = [];

  // Iterate through the appointment numbers
  for (let num of appointmentNumbers) {
    // Add the details to the appointments array
    appointmentDetails.push(state.appointments[num]);
  }

  return appointmentDetails;
}



// This function returns an object contaning interview data 
// It takes an object that contains the interviewer
export function getInterview(state, interview) {

  // Store the interviewers portion of the state object
  let interviewers = state.interviewers;

  // If either input is invalid, return null
  if (!interviewers || !interview) {
    return null;
  }

  // Store the interviewer data object 
  const interviewerData = interviewers[interview.interviewer];

  // Return an onject containing the student name and interviewer data object
  let result = {
    student: interview.student,
    interviewer: interviewerData
  }

  return result;
}




// This function returns an array of interviewers for that day
// It takes a state object and a string for the day: "Monday" etc.
export function getInterviewersForDay(state, day) {

  // Store the appointment days by iterating through the days array
  let days = state["days"];
  let interviewerNumbers = [];

  // Iterate through the days array
  for (let d of days) {
    // If the day name is equal to the specified day,
    if (d.name === day) {
      // Save its interviewers array
      interviewerNumbers = d.interviewers;
    }
  }

  // Store the interviewer details in a new array
  let interviewerDetails = [];

  // Iterate through the interviewer numbers
  for (let num of interviewerNumbers) {
    // Add the details to the interviewers array
    interviewerDetails.push(state.interviewers[num]);
  }

  return interviewerDetails;
}