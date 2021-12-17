import { IAdmin } from '@database/models/admin'
import fetchWithCookies from '@utils/fetchWithCookies'
import { Button, Link } from '@vechaiui/react'
import { ReactElement, useState } from 'react'

type Props = {
  admin: IAdmin
}

const AdminElement = ({ admin: { _id, email } }: Props): ReactElement => {
  const [show, setShow] = useState(true)
  const deleteVisit = (id: string) => {
    fetchWithCookies(`/api/permission/${id}`, 'DELETE')
    setShow(false)
  }
  const adminElement = (
    <div className="border-l-4 rounded border-neutral-600 pl-4 m-3">
      <ul className="py-1">
        <li>Email: {email}</li>
      </ul>
      <Link href={`/admin-panel/worker/${_id}`}>
        <Button variant="ghost">Edit</Button>
      </Link>
      <Button variant="ghost" onClick={() => deleteVisit(_id)}>
        Delete
      </Button>
    </div>
  )

  return show ? adminElement : <></>
}

export default AdminElement
