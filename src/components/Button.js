import React from "react";
import "components/Button.scss";
import classNames from "classnames";



export default function Button(props) {

  // Create the button class
  // If the prop is a confirm button, add the button--confirm class to the buttonClass
  // If the prop is a danger button, add the button--danger class to the buttonClass
  const buttonClass = classNames("button", {
    "button--confirm": props.confirm,
    "button--danger": props.danger
  });

  return (
    // Give the button a class name, and pass in the onClick and disabled properties
    <button className={buttonClass} onClick={props.onClick} disabled={props.disabled}>
      {props.children}
    </button>
  );
}
