import React from 'react';
import DayListItem from './DayListItem';

const DayList = (props) => {

  const {days, value, onChange} = props

  const parsedDays = days.map((singleDay) => {
    let selected = false
    // if(singleDay.name === value){
    //   selected = true
    // }
    return (
    <DayListItem key={singleDay.id} {...singleDay} selected={singleDay.name === value} setDay={()=> onChange(singleDay.name)}>
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