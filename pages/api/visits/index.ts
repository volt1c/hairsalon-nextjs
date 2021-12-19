import type { NextApiRequest, NextApiResponse } from 'next'
import { ICreateVisit, IVisit, Visit, VisitKeys } from '@database/models/visit'
import _ from 'lodash'
import { addVisit } from './addVisit'
import { getSession } from 'next-auth/react'
import hasPermission from '@utils/hasPermission'

type Data = any

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { method, body } = req
  const session = await getSession({ req })

  switch (method) {
    case 'GET':
      if (await hasPermission(session?.user)) {
        const rawVisits: IVisit[] = await Visit.find({}).exec()
        const visits: IVisit[] = rawVisits.map((visit) =>
          _.pick(visit, VisitKeys)
        ) as IVisit[]

        res.status(200).json(visits)
        return
      } else {
        res.status(401).end()
        return
      }

    case 'POST':
      let code = 422
      if (
        typeof body.name == 'string' &&
        typeof body.surename == 'string' &&
        typeof body.email == 'string' &&
        typeof body.phone == 'string' &&
        typeof body.year == 'number' &&
        typeof body.month == 'number' &&
        typeof body.day == 'number' &&
        typeof body.hour == 'number' &&
        !!body.name &&
        !!body.surename &&
        !!body.email &&
        !!body.phone
      ) {
        const visit = body as ICreateVisit
        code = (await addVisit(visit)) ? 201 : 422
      }
      res.status(code).end()
      return

    case 'DELETE':
      if (await hasPermission(session?.user)) {
        await Visit.deleteMany({}).exec()
        res.status(200).end()
        return
      } else {
        res.status(401).end()
        return
      }

    default:
      res.setHeader('Allow', ['GET', 'POST', 'DELETE'])
      res.status(405).end(`Method ${method} Not Allowed`)
      return
  }
}
