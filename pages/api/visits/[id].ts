import type { NextApiRequest, NextApiResponse } from 'next'
import _ from 'lodash'
import { IVisit, Visit, VisitKeys } from '@database/models/visit'
import dbConnect from '@database/dbConnect'
import { getSession } from 'next-auth/react'
import hasPermission from '@utils/hasPermission'

dbConnect()

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
        const visit: IVisit = _.pick(
          await Visit.findOne({ _id: id }).exec(),
          VisitKeys
        ) as IVisit
        res.status(200).json(visit)
        return
      } else {
        res.status(401).end()
        return
      }

    case 'DELETE':
      if (await hasPermission(session?.user)) {
        await Visit.deleteOne({ _id: id }).exec()
        res.status(200).end()
        return
      } else {
        res.status(401).end()
        return
      }

    case 'PUT':
      if (await hasPermission(session?.user)) {
        await Visit.replaceOne(
          { _id: id },
          {
            name: body.name,
            surename: body.surename,
            email: body.email,
            phone: body.phone,
            date: new Date(body.year, body.month - 1, body.day, body.hour),
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
