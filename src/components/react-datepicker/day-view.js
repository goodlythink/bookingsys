import React from 'react'
import PropTypes from 'prop-types'

import cs from 'classnames'
import moment from 'moment'
import 'moment-range'

import Cell from './cell'
import ViewHeader from './view-header'

export default class DayView extends React.Component {
  static propTypes = {
    date: PropTypes.object.isRequired,
    minDate: PropTypes.any,
    maxDate: PropTypes.any,
    setDate: PropTypes.func,
    nextView: PropTypes.func
  }

  cellClick = e => {
    let cell = e.target
    let date = parseInt(cell.innerHTML, 10)
    let newDate = this.props.date ? this.props.date.clone() : moment()

    if (isNaN(date)) return

    if (cell.className.indexOf('prev') > -1) {
      newDate.subtract(1, 'months')
    } else if (cell.className.indexOf('next') > -1) {
      newDate.add(1, 'months')
    }

    newDate.date(date)
    this.props.setDate(newDate, true)
  }

  getDays() {
    let now = this.props.date ? this.props.date : moment()
    let start = now.clone().startOf('month').weekday(0)
    let end = now.clone().endOf('month').weekday(6)
    let minDate = this.props.minDate
    let maxDate = this.props.maxDate
    let month = now.month()
    let today = moment()
    let currDay = now.date()
    let year = now.year()
    let days = []
    const rangeDay = moment.range(start, end);
    const daysLoop = Array.from(rangeDay.by('days'));

    daysLoop.map(day => {
      /*
  days = [...days, {
    label: day.format('D'),
    prev: (day.month() < month && !(day.year() > year)) || day.year() < year,
    next: day.month() > month || day.year() > year,
    disabled: day.isBefore(minDate, 'day') || day.isAfter(maxDate, 'day'),
    curr: day.date() === currDay && day.month() === month,
    today:
    day.date() === today.date() &&
    day.month() === today.month() &&
    day.year() === today.year()
  }]
  */
      days.push({
        label: day.format('D'),
        prev: (day.month() < month && !(day.year() > year)) || day.year() < year,
        next: day.month() > month || day.year() > year,
        disabled: day.isBefore(minDate, 'day') || day.isAfter(maxDate, 'day'),
        curr: day.date() === currDay && day.month() === month,
        today:
        day.date() === today.date() &&
        day.month() === today.month() &&
        day.year() === today.year()
      })
    })

    return days
  }

  getDaysTitles() {
    let now = moment()
    return [0, 1, 2, 3, 4, 5, 6].map(i => {
      let weekday = now.weekday(i).format('dd')
      return { val: weekday, label: weekday }
    })
  }

  next = () => {
    let nextDate = this.props.date.clone().add(1, 'months')
    if (this.props.maxDate && nextDate.isAfter(this.props.maxDate, 'day')) {
      nextDate = this.props.maxDate
    }
    this.props.setDate(nextDate)
  }

  prev = () => {
    let prevDate = this.props.date.clone().subtract(1, 'months')
    if (this.props.minDate && prevDate.isBefore(this.props.minDate, 'day')) {
      prevDate = this.props.minDate
    }
    this.props.setDate(prevDate)
  }

  render() {
    let titles = this.getDaysTitles().map((item, i) => {
      //return <Cell classes="DayPicker-Weekday" key={i} value={item.label} />
      return <div className="DayPicker-Weekday" key={i}><abbr title={item.label}>{item.label}</abbr></div>
    })
    let _class
    let irow = 0;
    let daysperWeek = [];
    //console.log(this.getDays());
    let days = this.getDays().map((item, i) => {
      _class = cs({
        dayPickerDay: true,
        next: item.next,
        prev: item.prev,
        disabled: item.disabled,
        current: item.curr,
        today: item.today
      })
      //return <Cell classes={_class} key={i} value={item.label} irow={irow} />


      daysperWeek.push({
        label: item.label,
        _class
      })

      if (daysperWeek.length % 7 == 0) {
        let _clone = daysperWeek;
        daysperWeek = [];
        return React.createElement("div", { key: i, className: "DayPicker-Week" },
          _clone.map((item, i) => {
            return React.createElement("div", { key: i, onClick: this.cellClick, className: item._class }, item.label)
            //return <Cell classes={item._class} key={i} value={item.label}/>            
          })
        )
      }

    })

    let currentDate = this.props.date ? this.props.date.format('MMMM') + ' ' + (parseInt(this.props.date.format('YYYY')) + 543) : moment().format('MMMM') + ' ' + (parseInt(moment().format('YYYY')) + 543)

    return (
      <div onKeyDown={this.keyDown}>
        <ViewHeader
          data={currentDate}
          next={this.next}
          prev={this.prev}
        //titleAction={this.props.nextView}
        />

        <div className="DayPicker-Month">
          <div className="DayPicker-Caption">
            <div>{currentDate}</div>
          </div>
          <div className="DayPicker-Weekdays">
            <div className="DayPicker-WeekdaysRow">{titles}</div>
          </div>

          <div className="DayPicker-Body" role="rowgroup">
            {/*<div className="days" onClick={this.cellClick}>{days}</div>*/}
            {days}
          </div>
        </div>
      </div>
    )
  }
}
