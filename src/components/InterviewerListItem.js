import React from "react";
import "components/InterviewerListItem.scss"
import classNames from "classnames";


export default function InterviewerListItem(props) {

  // Create the interviewerListItemClass
  const interviewerListItemClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected
  });

  // Render interviewer's name only if item is selected
  let renderInterviewerName = function() {
    if (props.selected) {
      return props.name;
    } else {
      return "";
    }
  }

  return (
    // When an item with setInterviewer is clicked, pass in the ID of the interviewer
    <li className={interviewerListItemClass} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {renderInterviewerName()}
    </li>
  );
}