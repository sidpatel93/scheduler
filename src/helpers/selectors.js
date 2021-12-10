export const getAppointmentsForDay = (state, day) => {
  let result = []
  for(let singleDay of state.days) {
    if(singleDay.name === day) {
      for(let appointment of singleDay.appointments) {
        result.push(state.appointments[appointment])
      }
    }
  }
  return result;
}

export const getInterview = (state, interview) => {
  if (interview) {
    return {
      "student": interview.student,
      "interviewer": state.interviewers[interview.interviewer]
    }
  }
  return null
}

