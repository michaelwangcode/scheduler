// This function returns an array of appointments for that day
// It takes in a state object (containing an array of days and an object of appointments)
// It takes in a day as a String: "Monday" etc.
export function getAppointmentsForDay(state, day) {

  // Store the appointment days by iterating through the days array
  let days = state["days"];
  let appointmentNumbers = [];

  for (let d of days) {
    if (d.name === day) {
      appointmentNumbers = d.appointments;
    }
  }

  // Store the appointment details in a new array by iteratring through the appointment days
  let appointmentDetails = [];

  for (let num of appointmentNumbers) {
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


