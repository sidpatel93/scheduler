import React, {useState} from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

const Form = (props) => {
  const {interviewers, onSave, onCancel} = props

  const [student, setStudent] = useState(props.student || "")
  const [error, setError] = useState("")
  const [interviewer, setInterviewer] = useState(props.interviewer || null)

  const reset= () => {
    setStudent("")
    setInterviewer("")
  }

  const cancel = () => {
    reset()
    onCancel()
  }

  const validate = () => {
    if (student === "") {
      setError("A student name cannot be empty.");
      return;
    } 
    else if ( interviewer === null ) {
      setError("An interviewer must be selected.");
      return;
    }
      setError("")
      return onSave(student, interviewer);
  };

  return (
    <main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off" onSubmit={(event)=> event.preventDefault()}>
      <input
        data-testid="student-name-input"
        className="appointment__create-input text--semi-bold"
        name="name"
        type="text"
        placeholder="Enter Student Name"
        value={student}
        onChange={(event)=> setStudent(event.target.value)}
      />
    </form>
    <section className="appointment__validation">{error}</section>
    <InterviewerList 
      interviewers={interviewers} 
      value={interviewer} 
      onChange={setInterviewer}
    />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger onClick={cancel}>Cancel</Button>
      <Button confirm onClick={()=>validate()}>Save</Button>
    </section>
  </section>
</main>
  )
}

export default Form;