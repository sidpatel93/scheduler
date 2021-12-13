import React from "react";
import "components/Application.scss";
import DayList from "./DayList"
import Appointment from "./Appointment/index";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData";

export default function Application(props) {
    const {
      state,
      setDay,
      bookInterview,
      cancelInterview
    } = useApplicationData();
 
  const appointmentsForDay = getAppointmentsForDay(state,state.day)
  const appointmentArray = appointmentsForDay.map(appointment => {
  const interview = getInterview(state, appointment.interview)
  const getInterviewrsForDay = getInterviewersForDay(state, state.day)
    return(
      <Appointment key={appointment.id} id={appointment.id} 
      time={appointment.time} interview={interview} interviewers={getInterviewrsForDay} bookInterview={bookInterview} cancelInterview={cancelInterview}/>
    )
  })

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
            days={state.days}
            value={state.day}
            onChange={setDay}
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
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
