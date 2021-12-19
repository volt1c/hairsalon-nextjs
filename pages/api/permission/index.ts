import type { NextApiRequest, NextApiResponse } from 'next'
import _ from 'lodash'
import { Admin } from '@database/models/admin'
import { getSession } from 'next-auth/react'
import hasPermission from '@utils/hasPermission'

type Data = any

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const session = await getSession({ req })
  const { method, body } = req

  switch (method) {
    case 'GET':
      if (await hasPermission(session?.user)) {
        const admins = await Admin.find({}).exec()
        res.status(200).json(admins)
      } else {
        res.status(401).end()
      }
      return

    case 'POST':
      if (await hasPermission(session?.user)) {
        //todo proper data validation
        try {
          const admin = await Admin.create({
            email: body.email,
          })
          res.status(201).end()
        } catch (err) {
          res.status(422).end()
        }
      } else {
        res.status(401).end()
      }
      return

    case 'HEAD':
      res.status((await hasPermission(session?.user)) ? 200 : 401).end()
      return

    default:
      res.setHeader('Allow', ['GET', 'POST', 'HEAD'])
      res.status(405).end(`Method ${method} Not Allowed`)
      return
  }
}
