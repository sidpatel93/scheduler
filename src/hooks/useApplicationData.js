import axios from 'axios';
import { useState, useEffect } from 'react';


const useApplicationData = () => {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

  function cancelInterview(id) {
    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
    .then(res => console.log(res))
    .then(() => {
      setState({
        ...state,
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
    .then(() => setState({...state, appointments}))
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