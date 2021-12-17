import { ISchedule, Schedule } from '@database/models/schedule'

function getEndDate(hours: number[], scope: number) {
  let date: Date = new Date(Date.now())
  date.setHours(hours.at(-1) as number)
  date.setMinutes(0)
  date.setMilliseconds(0)
  date.setDate(date.getDate() + scope)
  return date
}

function getNextDate(cDate: Date, hours: number[]) {
  const date: Date = new Date(cDate.valueOf())

  if (date.getHours() >= (hours.at(-1) as number)) {
    date.setDate(date.getDate() + 1)
    date.setHours(hours[0])
  } else {
    const nextHour = hours[hours.indexOf(date.getHours()) + 1]
    date.setHours(nextHour)
  }

  return date
}

async function getAvaliableDates(
  startDate: Date,
  unavalible: number[]
): Promise<Date[]> {
  const schedule: ISchedule = await Schedule.findOne({}).exec()
  const scope = schedule.planningScope
  const hours = schedule.openHours
  const week = schedule.workWeekDays

  const dates = []
  const endDate: Date = getEndDate(hours, scope)

  let currentDate = startDate
  currentDate = getNextDate(currentDate, hours)
  while (currentDate <= endDate) {
    if (!unavalible.includes(currentDate.valueOf())) {
      dates.push(currentDate)
    }
    currentDate = getNextDate(currentDate, hours)
  }

  return dates
}

export default getAvaliableDates
