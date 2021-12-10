const { useState } = require("react")

const useVisualMode = (initialMode) => {
  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);

  const transition = (newMode, replace = false) => {
    if(replace) {
      history[history.length-1] = newMode
    } else {
       history.push(newMode)
      //setHistory([...history, newMode])
    }
    setHistory(history)
    setMode(history[history.length - 1])
  }

  const back =() => {
    if(history.length > 1) {
      history.pop()
      setHistory(history)
      setMode(history[history.length - 1])
    }
  }
  return {mode, transition, back}
}

export default useVisualMode;