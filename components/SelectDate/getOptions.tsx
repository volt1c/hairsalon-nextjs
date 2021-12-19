import { ReactElement } from 'react'

const getOptions = (
  dates: Date[],
  filterCallback: (value: Date) => boolean,
  mapCallback: (value: Date) => number,
  formatCallback: (value: number) => string
): JSX.Element[] =>
  dates
    .filter((d) => filterCallback(d))
    .map((d) => mapCallback(d))
    .filter((el, idx, arr) => arr.indexOf(el) === idx)
    .map((opt) => (
      <option value={opt.toString()} key={opt.toString()}>
        {formatCallback(opt)}
      </option>
    ))

export { getOptions }
