import React, {Fragment} from "react"
import './styles.scss'
import Header from "./Header"
import Show from "./Show"
import Status from "./Status"
import Empty from "./Empty"
import useVisualMode from 'hooks/useVisualMode'
import Form from "./Form"


const Appointment = (props) => {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";

  const {id, time, interview, interviewers, bookInterview} = props
  const {mode, transition, back} = useVisualMode(
    interview ? SHOW : EMPTY
  )
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    bookInterview(props.id, interview)
    .then(()=>transition(SHOW))

  }


  return(
    <article className="appointment">
      <Header time={time} />
      {mode===EMPTY && <Empty onAdd={()=> transition(CREATE)}/>}
      {mode === SAVING && <Status message="SAVING..." />}
      {mode === SHOW && <Show student={props.interview.student} interviewer={props.interview.interviewer}/> }
      {mode === CREATE && <Form interviewers={props.interviewers} onCancel={()=>back()} onSave={save} />}
    </article>
  )
}

export default Appointment;