import React, {Fragment} from "react"
import './styles.scss'
import Header from "./Header"
import Show from "./Show"
import Status from "./Status"
import Confirm from "./Confirm"
import Empty from "./Empty"
import useVisualMode from 'hooks/useVisualMode'
import Form from "./Form"


const Appointment = (props) => {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETE = "DELETE"
  const CONFIRM = "CONFIRM"

  const {id, time, interview, interviewers, bookInterview, cancelInterview} = props
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

  function deleteAppointment () {
    transition(DELETE)
    cancelInterview(props.id)
    .then(()=> transition(EMPTY))
  }

  function confirmDeletion() {
    transition(CONFIRM)
  }

  return(
    <article className="appointment">
      <Header time={time} />
      {mode===EMPTY && <Empty onAdd={()=> transition(CREATE)}/>}
      {mode === CONFIRM && 
        <Confirm
          message="Are you sure?"
          onConfirm={deleteAppointment}
          onCancel={back}
        />
      }
      {mode === SAVING && <Status message="SAVING..." />}
      {mode === SHOW && <Show student={props.interview.student} interviewer={props.interview.interviewer} onDelete={confirmDeletion}/> }
      {mode === CREATE && <Form interviewers={props.interviewers} onCancel={()=>back()} onSave={save} />}
      {mode === DELETE && <Status message="DELETING..." />}
    </article>
  )
}

export default Appointment;