import React from 'react'
import classNames from 'classnames';
import 'components/DayListItem.scss'

export default function DayListItem(props) {

  const {selected, spots, name, setDay} = props

  let dayClass = classNames("day-list__item", {
   "day-list__item--selected": selected,
   "day-list__item--full": spots===0
  })

  const formatSpots = (spots) => {
    if(spots === 0) {
      return "no spots remaining"
    }
    if(spots === 1) {
      return `${spots} spot remaining`
    }
    return `${spots} spots remaining`
  }
  return (
    <li className={dayClass} onClick={()=>{setDay(name)}} data-testid="day">
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">{formatSpots(spots)}</h3>
    </li>
  );
}