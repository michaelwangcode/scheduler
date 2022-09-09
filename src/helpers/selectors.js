export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day

  // Takes in a state object (containing an array of days and an object of appointments)


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
