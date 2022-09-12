import { useState } from "react"

// Create a custom hook called useVisualMode
export default function useVisualMode(initial) {

  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  // Transition to a new mode
  function transition(newMode, replace = false) {

    // If replace is true,
    if (replace) {

      // Set the mode to the new mode
      setMode(newMode);

      // Make a copy of the array in oldHistory
      let oldHistory = [...history];

      // Set the current mode in the history array to the mode state
      oldHistory[oldHistory.length - 1] = mode;

      // Set the history to the oldHistory array
      setHistory(oldHistory);

    } else {

      // Set the mode to the new mode
      setMode(newMode);

      // Make a copy of the array in newHistory
      let newHistory = [...history];

      // Add the new mode to the history
      newHistory.push(newMode);

      // Set the history to the newHistory array
      setHistory(newHistory);
    }
  }

  // Go back to a previous mode
  function back() {

    // If the history array has more than one value
    if (history.length > 1) {
      
      // Set the mode to the previous mode in the history stack
      setMode(history[history.length -2]);

      // Make a copy of the array in oldHistory
      let oldHistory = [...history];

      // Remove the last mode from the stack
      oldHistory.pop()

      // Set the history to the oldHistory array
      setHistory(oldHistory);
    }
  }

  // Return the mode, transition function and back function
  return { mode, transition, back }
}