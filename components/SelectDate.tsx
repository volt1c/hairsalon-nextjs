import { FormControl, Select } from '@vechaiui/forms'
import React, { ReactElement, useState } from 'react'
import { getDayName, getMonthName } from '@utils/dateNames'

type Props = {
  dates: string[]
}

const date: Date = new Date(0, 0, 0, 0)

const SelectDate = ({ dates }: Props): ReactElement => {
  const avaliableDates = dates.map((date) => new Date(date))

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

  const getMonthOtions = () =>
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
    date.setFullYear(parseInt(e.target.value))
    setMonthOptionsState(getMonthOtions())
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
      <Select placeholder="Year" onChange={loadMonths}>
        {yearOptions}
      </Select>
      <Select placeholder="Month" onChange={loadDates}>
        {monthOptions}
      </Select>
      <Select placeholder="Day" onChange={loadHours}>
        {dateOptions}
      </Select>
      <Select placeholder="Hour">{hourOptions}</Select>
    </FormControl>
  )
}
export default SelectDate
