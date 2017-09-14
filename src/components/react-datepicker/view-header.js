import React from 'react'

export default function ViewHeader({ prev, next, titleAction, data }) {
  return (
    <div className="DayPicker-NavBar">
      <span tabIndex="0" role="button" aria-label="Previous Month" className="DayPicker-NavButton DayPicker-NavButton--prev" onClick={prev}></span>
      {/*<span className="navigation-title" onClick={titleAction}>{data}</span>*/}
      {/*<span className="navigation-title">{data}</span>*/}
      <span tabIndex="0" role="button" aria-label="Next Month" className="DayPicker-NavButton DayPicker-NavButton--next" onClick={next}></span>
      
    </div>
  )
}
