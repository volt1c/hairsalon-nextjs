import { FormControl, Select } from '@vechaiui/forms'
import React, { ReactElement, useState } from 'react'
import { getDayName, getMonthName } from '@utils/dateNames'

type Props = {
  dates: string[]
  defaultValue?: Date | undefined
}

let isRendered = false

const SelectDate = ({
  dates,
  defaultValue = undefined,
}: Props): ReactElement => {
  const date: Date = !defaultValue ? new Date(0, 0, 0, 0) : defaultValue
  const avaliableDates = dates.map((date) => new Date(date))
  const [defValue, setDefValue] = useState(defaultValue)

  const getOptions = (
    filterCallback: (value: Date) => boolean,
    mapCallback: (value: Date) => number,
    formatCallback: (value: number) => string
  ) =>
    avaliableDates
      .filter((d) => filterCallback(d))
      .map((d) => mapCallback(d))
      .filter((el, idx, arr) => arr.indexOf(el) === idx)
      .map((opt) => (
        <option value={opt.toString()} key={opt.toString()}>
          {formatCallback(opt)}
        </option>
      ))

  const getYearOptions = () =>
    getOptions(
      (d) => true,
      (d) => d.getFullYear(),
      (n) => n.toString()
    )

  const getMonthOptions = () =>
    getOptions(
      (d) => d.getFullYear() == date.getFullYear(),
      (d) => d.getMonth(),
      (n) => `${n + 1}. ${getMonthName(n)}`
    )

  const getDateOptions = () =>
    getOptions(
      (d) =>
        d.getFullYear() == date.getFullYear() &&
        d.getMonth() == date.getMonth(),
      (d) => d.getDate(),
      (n) =>
        `${n}. ${(() => {
          const newDate = new Date(date.getTime())
          newDate.setDate(n)
          return getDayName(newDate.getDay())
        })()}`
    )
  const getHourOptions = () =>
    getOptions(
      (d) =>
        d.getFullYear() == date.getFullYear() &&
        d.getMonth() == date.getMonth() &&
        d.getDate() == date.getDate(),
      (d) => d.getHours(),
      (n) => `${n}:00`
    )

  const yearOptions = getYearOptions()
  const [monthOptions, setMonthOptionsState] = useState<JSX.Element[]>()
  const [dateOptions, setDateOptionsState] = useState<JSX.Element[]>()
  const [hourOptions, setHourOptionsState] = useState<JSX.Element[]>()

  const loadMonths = (e: any) => {
    setDefValue(undefined)
    date.setFullYear(parseInt(e.target.value))
    setMonthOptionsState(getMonthOptions())
  }
  const loadDates = (e: any) => {
    date.setMonth(parseInt(e.target.value))
    setDateOptionsState(getDateOptions())
  }
  const loadHours = (e: any) => {
    date.setDate(parseInt(e.target.value))
    setHourOptionsState(getHourOptions())
  }

  return (
    <FormControl className="flex flex-row gap-2 pb-6">
      <Select
        id="year"
        placeholder="Year"
        onChange={loadMonths}
        defaultValue={!defValue ? '' : defValue.getFullYear().toString()}
      >
        {yearOptions}
      </Select>
      <Select
        id="month"
        placeholder="Month"
        onChange={loadDates}
        defaultValue={!defValue ? '' : defValue.getMonth().toString()}
      >
        {monthOptions}
        {!defValue
          ? ''
          : (() => {
              const v = defValue.getMonth()
              return (
                <option value={v.toString()} key={v.toString()}>
                  {`${v + 1}. ${getMonthName(v)}`}
                </option>
              )
            })()}
      </Select>
      <Select
        id="day"
        placeholder="Day"
        onChange={loadHours}
        defaultValue={!defValue ? '' : defValue.getDate().toString()}
      >
        {dateOptions}
        {!defValue
          ? ''
          : (() => {
              const v = defValue.getDate()
              return (
                <option value={v.toString()} key={v.toString()}>
                  {`${v}. ${(() => {
                    const newDate = new Date(date.getTime())
                    newDate.setDate(v)
                    return getDayName(newDate.getDay())
                  })()}`}
                </option>
              )
            })()}
      </Select>
      <Select
        id="hour"
        placeholder="Hour"
        defaultValue={!defValue ? '' : defValue.getHours().toString()}
      >
        {hourOptions}
        {!defValue
          ? ''
          : (() => {
              const v = defValue.getHours()
              return (
                <option value={v.toString()} key={v.toString()}>
                  {`${v}:00`}
                </option>
              )
            })()}
      </Select>
    </FormControl>
  )
}
export default SelectDate
