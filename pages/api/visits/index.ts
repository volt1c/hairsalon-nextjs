import type { NextApiRequest, NextApiResponse } from 'next'
import { IVisit, Visit, VisitKeys } from '@database/models/visit'
import dbConnect from '@database/dbConnect'
import _ from 'lodash'

dbConnect()
type Data = {
  plannedVisits: IVisit[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { method, body } = req

  if (method == 'GET') {
    const rawVisits: (IVisit & object)[] = await Visit.find({}).exec()
    const visits: IVisit[] = rawVisits.map((visit) =>
      _.pick(visit, VisitKeys)
    ) as IVisit[]
    res.status(200).json({ plannedVisits: visits })
    return
  }

  if (method == 'POST') {
    // todo: validate body
    const newVisit: IVisit = {
      name: body.name,
      surename: body.surename,
      email: body.email,
      phone: body.phone,
      date: new Date(`${body.date} ${body.time}`),
    } as IVisit
    await Visit.create(newVisit)
    return res.status(201).end()
  }

  if (method == 'DELETE') {
    Visit.deleteMany({}).exec()
    return res.status(202).end()
  }

  res.setHeader('Allow', ['GET', 'POST', 'DELETE'])
  res.status(405).end(`Method ${method} Not Allowed`)
}
