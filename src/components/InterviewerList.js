import React from "react";
import './InterviewerList.scss'
import InterviewerListItem from './InterviewerListItem'
import './InterviewerList.scss'

const InterviewerList = (props) => {
  const { interviewers, setInterviewer, interviewer } = props
  const parsedInterviewers = interviewers.map((singleInterviewer) => {
    let selected = false;
    if(singleInterviewer.id === interviewer){
      selected = true;
    }
    return(
      <InterviewerListItem key={singleInterviewer.id} {...singleInterviewer} setInterviewer={setInterviewer} selected={selected} >
      </ InterviewerListItem>
    )
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {parsedInterviewers}
      </ul>
    </section>
  )
}

export default InterviewerList;