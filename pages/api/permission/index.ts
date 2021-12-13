import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '@database/dbConnect'
import _ from 'lodash'
import { Admin, IAdmin } from '@database/models/admin'
import { getSession } from 'next-auth/react'
import hasPermission from '@utils/hasPermission'

dbConnect()
type Data = any

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const session = await getSession()
  const { method } = req

  switch (method) {
    case 'HEAD':
      res.status((await hasPermission(session?.user)) ? 200 : 401).end()
      return

    default:
      res.setHeader('Allow', ['HEAD'])
      res.status(405).end(`Method ${method} Not Allowed`)
      return
  }
}
