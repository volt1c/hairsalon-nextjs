import type { NextApiRequest, NextApiResponse } from 'next'
import _ from 'lodash'
import { IVisit, Visit, VisitKeys } from '@database/models/visit'
import dbConnect from '@database/dbConnect'
import { getSession } from 'next-auth/react'

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
      if (session?.user?.email == process.env.AUTHORIZED_EMAIL) {
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
      if (session?.user?.email == process.env.AUTHORIZED_EMAIL) {
        await Visit.deleteOne({ _id: id }).exec()
        res.status(202).end()
        return
      } else {
        res.status(401).end()
        return
      }
  }

  res.setHeader('Allow', ['GET', 'DELETE', 'PUT'])
  res.status(405).end(`Method ${method} Not Allowed`)
}
