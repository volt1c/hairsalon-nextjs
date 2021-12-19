const getMonthName = (idx: number): string => {
  if (idx < 0 || idx > 11) return 'undefined'

  return [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ][idx]
}
const getDayName = (idx: number): string => {
  if (idx < 0 || idx > 6) return 'undefined'

  return [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ][idx]
}

export { getDayName, getMonthName }
