import React from "react";

import DayListItem from "components/DayListItem";

export default function DayList(props) {

  // A Days array will be passed as a prop, which supplies data to the DayListItems

  // Iterate over the Days array
  // Use data to create a new array of DayListItem components
  // Use the map method
  // The DayListItem components will be rendered in the <ul> component
  const days = props.days.map((day) => {

    return (
      <DayListItem
        key={day.id}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.day}
        setDay={props.setDay}
      />
    )
  })

  return (
    <ul>
      {days}
    </ul>
  );
}

