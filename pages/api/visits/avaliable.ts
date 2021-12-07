import type { NextApiRequest, NextApiResponse } from 'next'
import getAvaliableDates from '@utils/getAvaliableDates'
import { IVisit, Visit } from '@database/models/visit'
import dbConnect from '@database/dbConnect'
import _ from 'lodash'

dbConnect()
type Data = any

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { method } = req

  switch (method) {
    case 'GET':
      const rawVisits: IVisit[] = await Visit.find({}).exec()
      const unavaliable: Date[] = rawVisits.map((visit) => visit.date)
      const avaliable: Date[] = await getAvaliableDates(
        //todo get actuall date
        new Date(2021, 11, 5, 14),
        unavaliable.map((date) => date.valueOf())
      )
      res.status(200).json({ avaliable: avaliable })
      return

    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
      return
  }
}
