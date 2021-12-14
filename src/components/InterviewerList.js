import React from "react";
import './InterviewerList.scss'
import InterviewerListItem from './InterviewerListItem'
import './InterviewerList.scss'
import PropTypes from 'prop-types';

const InterviewerList = (props) => {
  const { interviewers, onChange, value } = props
  const parsedInterviewers = interviewers.map((singleInterviewer) => {
    return(
      <InterviewerListItem key={singleInterviewer.id} {...singleInterviewer} setInterviewer={(e)=>{onChange(singleInterviewer.id)}} selected={singleInterviewer.id === value} >
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

InterviewerList.prototype = {
  interviewers: PropTypes.array.isRequired
};

export default InterviewerList;