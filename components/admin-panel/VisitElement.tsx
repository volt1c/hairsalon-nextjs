import { IVisit } from '@database/models/visit'
import { getDayName } from '@utils/dateNames'
import fetchWithCookies from '@utils/fetchWithCookies'
import { Button, Link } from '@vechaiui/react'
import { ReactElement, useState } from 'react'

type Props = {
  visit: IVisit
}

const VisitElement = ({
  visit: { _id, name, surename, email, phone, date },
}: Props): ReactElement => {
  const [show, setShow] = useState(true)

  const formatDate = (date: Date) =>
    `${date.getFullYear()} - ${
      date.getMonth() + 1
    } - ${date.getDate()} : ${date.getHours()}:00 | (${getDayName(
      date.getDay()
    )})`

  const deleteVisit = (id: string) => {
    fetchWithCookies(`/api/visits/${id}`, 'DELETE')
    setShow(false)
  }

  return show ? (
    <div className="border-l-4 rounded border-neutral-600 pl-4 m-3">
      <h2 className="font-bold py-1">{`${name} ${surename}`}</h2>
      <ul className="py-1">
        <li>Email: {email}</li>
        <li>Tel: {phone}</li>
        <li>Date: {formatDate(new Date(date))}</li>
      </ul>
      <Link href={`/admin-panel/visit/${_id}`}>
        <Button variant="ghost">Edit</Button>
      </Link>
      <Button variant="ghost" onClick={() => deleteVisit(_id)}>
        Delete
      </Button>
    </div>
  ) : (
    <></>
  )
}

export default VisitElement
