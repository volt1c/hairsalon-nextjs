import type { NextApiRequest, NextApiResponse } from 'next'
import { ICreateVisit, IVisit, Visit, VisitKeys } from '@database/models/visit'
import dbConnect from '@database/dbConnect'
import _ from 'lodash'
import { addVisit } from './addVisit'

dbConnect()
type Data = any

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { method, body } = req

  switch (method) {
    case 'GET':
      const rawVisits: IVisit[] = await Visit.find({}).exec()
      const visits: IVisit[] = rawVisits.map((visit) =>
        _.pick(visit, VisitKeys)
      ) as IVisit[]
      res.status(200).json({ plannedVisits: visits })
      return

    case 'POST':
      let code = 406
      if (
        typeof body.name == 'string' &&
        typeof body.surename == 'string' &&
        typeof body.email == 'string' &&
        typeof body.phone == 'string' &&
        typeof body.year == 'number' &&
        typeof body.month == 'number' &&
        typeof body.day == 'number' &&
        typeof body.hour == 'number'
      ) {
        const visit = body as ICreateVisit
        code = (await addVisit(visit)) ? 201 : 406
      }
      res.status(code).end()
      return

    case 'DELETE':
      Visit.deleteMany({}).exec()
      res.status(202).end()
      return

    default:
      res.setHeader('Allow', ['GET', 'POST', 'DELETE'])
      res.status(405).end(`Method ${method} Not Allowed`)
      return
  }
}
