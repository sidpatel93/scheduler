import React, {useState, useEffect} from "react";
import axios from 'axios'
import "components/Application.scss";
import DayList from "./DayList"
import Appointment from "./Appointment/index";

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer:{
        id: 3,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
  },
  {
    id: 4,
    time: "3pm",
    interview: {
      student: "Archie Andrews",
      interviewer:{
        id: 4,
        name: "Cohana Roy",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      }
    }
  },
  {
    id: 5,
    time: "4pm",
  }
];

const appointmentArray = appointments.map(appointment => {
  return(
    <Appointment key={appointment.id} {...appointment} />
  )
})

export default function Application(props) {

  const [daySelected, setdaySelected] = useState("Monday")

  const [days, setDays] = useState([])

  useEffect(()=>{
    axios.get("http://localhost:8001/api/days")
    .then(res => {
      setDays(res.data)
    })
  },[])

  return (
    <main className="layout">
      <section className="sidebar">
        {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={days}
            value={daySelected}
            onChange={setdaySelected}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentArray}
      </section>
    </main>
  );
}
