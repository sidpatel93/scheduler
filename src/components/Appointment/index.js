import React, {Fragment} from "react"
import './styles.scss'
import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"
import useVisualMode from 'hooks/useVisualMode'
import Form from "./Form"


const Appointment = (props) => {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";


  const {time, interview, interviewers} = props
  const {mode, transition, back} = useVisualMode(
    interview ? SHOW : EMPTY
  )
  return(
    <article className="appointment">
      <Header time={time} />
      {mode===EMPTY && <Empty onAdd={()=> transition(CREATE)}/>}
      {mode === SHOW && <Show student={interview.student} interviewer={interview.interviewer}/> }
      {mode === CREATE && <Form interviewers={interviewers} onCancel={()=>back()}/>}
    </article>
  )
}

export default Appointment;