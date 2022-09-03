import { Calendar } from 'antd'
import React from 'react'
import { EventsType } from './EventForm'
import { Moment } from 'moment';
import { formatDate } from '../utils';

export const EventCalendar: React.FC<{ events: EventsType[] }> = (props) => {


  const dateCellRender = (value: Moment) => {
    let formatedDate = formatDate(value.toDate())
    const a = props.events.filter(ev => ev.date === formatedDate)
    return (
      <div>
        {a.map((e) => {
          return (
            <>
              <div><b>Event for:</b>{e.guests}</div>
              <div><b>Description</b>{e.description}</div>
            </>
          )
        })}
      </div>
    )
  }
  return (
    <Calendar
      dateCellRender={dateCellRender}
    />
  )
}
