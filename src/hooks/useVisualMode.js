const { useState } = require("react")

const useVisualMode = (initialMode) => {
  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);

  const transition = (newMode, replace = false) => {
    if(replace) {
      setHistory(chanageLastEle(history, newMode))
    } else {
      setHistory(addEle(history, newMode))
    }
    setMode(history[history.length - 1])
  }

  const back =() => {
    if(history.length > 1) {
      setHistory(removeLastEle(history))
      setMode(history[history.length - 1])
    }
  }
  return {mode, transition, back}
}

const chanageLastEle = (arr, newEle) => {
  arr[arr.length -1] = newEle
  return arr
}
const removeLastEle = (arr) => {
  arr.pop()
  return arr
}
const addEle = (arr, newEle) => {
  arr.push(newEle)
  return arr
}

export default useVisualMode;