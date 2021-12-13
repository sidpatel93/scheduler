import React, {Fragment} from "react"
import './styles.scss'
import Header from "./Header"
import Show from "./Show"
import Status from "./Status"
import Confirm from "./Confirm"
import Empty from "./Empty"
import useVisualMode from 'hooks/useVisualMode'
import Form from "./Form"
import Error from "./Error"


const Appointment = (props) => {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETE = "DELETE"
  const CONFIRM = "CONFIRM"
  const EDIT = "EDIT"
  const ERROR_SAVE = "ERROR_SAVE"
  const ERROR_DELETE = "ERROR_DELETE"

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
    .catch(err=>transition(ERROR_SAVE, true))
  }

  function deleteAppointment () {
    transition(DELETE, true)
    cancelInterview(props.id)
    .then(()=> transition(EMPTY))
    .catch((err)=> transition(ERROR_DELETE, true))
  }

  function confirmDeletion() {
    transition(CONFIRM)
  }

  function editAppointment() {
    transition(EDIT)
  }

  return(
    <article className="appointment">
      <Header time={time} />
      {mode===EMPTY && <Empty onAdd={()=> transition(CREATE)}/>}
      {mode === CONFIRM && 
        <Confirm
          message="Are you sure?"
          onConfirm={deleteAppointment}
          onCancel={()=>back()}
        />
      }
      {mode === SAVING && <Status message="SAVING..." />}
      {mode === SHOW && <Show student={props.interview.student} interviewer={props.interview.interviewer} onEdit={editAppointment} onDelete={confirmDeletion}/> }
      {mode === CREATE && <Form interviewers={props.interviewers} onCancel={()=>back()} onSave={save} />}
      {mode === DELETE && <Status message="DELETING..." />}
      {mode === EDIT && (
        <Form
          student={props.interview.student}
          interviewer={props.interview.interviewer["id"]}
          interviewers={props.interviewers}
          onCancel={()=>back()}
          onSave={save}
        />
      )}
      {mode === ERROR_SAVE && <Error message="Can not save." onClose={() => back()} />}
      {mode === ERROR_DELETE && <Error message="Can not detele." onClose={() => back()} />}
    </article>
  )
}

export default Appointment;