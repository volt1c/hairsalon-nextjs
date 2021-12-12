import { IVisit } from '@database/models/visit'
import { getDayName } from '@utils/dateNames'
import fetchWithCookies from '@utils/fetchWithCookies'
import { Alert, Button, Input, Link } from '@vechaiui/react'
import { useRouter } from 'next/router'
import { ReactElement, useState } from 'react'

type InfoBoxProps = {
  visit: IVisit
}

const VisitElement = ({
  visit: { _id, name, surename, email, phone, date },
}: InfoBoxProps): ReactElement => {
  const [show, setShow] = useState(true)
  const dateInstance = new Date(date)
  const deleteVisit = (id: string) => {
    fetchWithCookies(`/api/visits/${id}`, 'DELETE')
    setShow(false)
  }
  const visitElement = (
    <div className="border-l-4 rounded border-neutral-600 pl-4 m-3">
      <h2 className="font-bold py-1">{`${name} ${surename}`}</h2>
      <ul className="py-1">
        <li>Email: {email}</li>
        <li>Tel: {phone}</li>
        <li>
          Date:{' '}
          {`${dateInstance.getFullYear()} - ${dateInstance.getMonth()} - ${dateInstance.getDate()}. ${getDayName(
            dateInstance.getDay()
          )}`}
        </li>
      </ul>
      <Link href={`/admin-panel/visit/${_id}`}>
        <Button variant="ghost">Edit</Button>
      </Link>
      <Button variant="ghost" onClick={() => deleteVisit(_id)}>
        Delete
      </Button>
    </div>
  )

  return show ? visitElement : <></>
}

export default VisitElement
