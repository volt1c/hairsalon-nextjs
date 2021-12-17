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
      const unavaliable: Date[] = rawVisits.map((visit) => new Date(visit.date))
      const avaliable: Date[] = await getAvaliableDates(
        (() => {
          const date = new Date(Date.now())
          date.setMinutes(0)
          date.setSeconds(0)
          date.setMilliseconds(0)
          return date
        })(),
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
