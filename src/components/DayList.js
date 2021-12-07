import React from 'react';
import DayListItem from './DayListItem';

const DayList = (props) => {

  const {days, day, setDay} = props

  const parsedDays = days.map((singleDay) => {
    let selected = false
    if(singleDay.name === day){
      selected = true
    }
    return (
    <DayListItem key={singleDay.id} {...singleDay} selected={selected} setDay={setDay}>
    </DayListItem>
    )
  });

  return (
    <ul>
      {parsedDays}
    </ul>
  )
}

export default DayList;