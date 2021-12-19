import type { NextApiRequest, NextApiResponse } from 'next'
import _ from 'lodash'
import { IVisit, Visit, VisitKeys } from '@database/models/visit'
import { getSession } from 'next-auth/react'
import hasPermission from '@utils/hasPermission'
import { Admin } from '@database/models/admin'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IVisit>
) {
  const session = await getSession({ req })
  const {
    query: { id },
    method,
    body,
  } = req

  switch (method) {
    case 'GET':
      if (await hasPermission(session?.user)) {
        const admins = await Admin.findOne({ _id: id }).exec()
        res.status(200).json(admins)
      } else {
        res.status(401).end()
      }
      return

    case 'DELETE':
      if (await hasPermission(session?.user)) {
        await Admin.deleteOne({ _id: id }).exec()
        res.status(200).end()
        return
      } else {
        res.status(401).end()
        return
      }

    case 'PUT':
      if (await hasPermission(session?.user)) {
        await Admin.replaceOne(
          { _id: id },
          {
            email: body.email,
          }
        ).exec()
        res.status(200).end()
        return
      } else {
        res.status(401).end()
        return
      }
  }

  res.setHeader('Allow', ['GET', 'DELETE', 'PUT'])
  res.status(405).end(`Method ${method} Not Allowed`)
}
