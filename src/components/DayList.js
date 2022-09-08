import React from "react";
import DayListItem from "components/DayListItem";



export default function DayList(props) {

  // A Days array will be passed as a prop, which supplies data to the DayListItems

  /*
  const days = [
    { id: 1,
      name: "Monday",
      spots: 2 },
    { id: 2,
      name: "Tuesday",
      spots: 5 },
    { id: 3,
      name: "Wednesday",
      spots: 0 },
  ];
  */

  // Iterate over the Days array and use the map method
  // to create a new array of DayListItem components
  const days = props.days.map((day) => {

    return (
      <DayListItem
        key={day.id}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.value}
        setDay={props.onChange}
      />
    )
  })

  // Display the list of days
  return (
    <ul>
      {days}
    </ul>
  );
}

