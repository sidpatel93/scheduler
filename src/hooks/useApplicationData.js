import axios from 'axios';
import { useState, useEffect } from 'react';


const useApplicationData = () => {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

  const updateSpots = (id, toAdd) => {
    const day = state.days.find((day)=> day.appointments.includes(id))
    toAdd ? day.spots -= 1 : day.spots += 1
    const days = state.days.map((singleDay) => {
      if(singleDay.name === day.name) {
        return {...day, spots: day.spots}
      }
      else {
        return {...singleDay}
      }
    })
    return days
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
    .then(res => console.log(res))
    .then(() => {
      const days = updateSpots(id)
      setState({
        ...state, appointments, days
      })
    })
  }

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`http://localhost:8001/api/appointments/${id}`, {interview: interview})
    .then(res => console.log(res))
    .then(() => {
      const days = updateSpots(id, true)
      setState({...state, appointments, days})
    })
  }
  
  const setDay = day => setState({ ...state, day });


  useEffect(()=>{
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ]).then((all) => {
      //console.log(all)
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
    })
  },[])

  return {state, setDay, bookInterview, cancelInterview}
}

export default useApplicationData;