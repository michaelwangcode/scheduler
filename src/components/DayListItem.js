import React from "react";

import "components/DayListItem.scss";

import classNames from "classnames";


export default function DayListItem(props) {

  // Create the dayListItemClass
  const dayListItemClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });

  // This function return a string based on the number of spots remaining
  let formatSpots = function(spots) {
    if (spots === 0) {
      return "no spots remaining";
    } else if (spots === 1) {
      return "1 spot remaining";
    } else {
      return spots + " spots remaining";
    }
  }

  return (
    // When a DayListItem with setDay is clicked, pass in the name of the day
    <li className={dayListItemClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}