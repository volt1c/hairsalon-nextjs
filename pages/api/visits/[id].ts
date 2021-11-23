// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import _ from 'lodash'
import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '@database/dbConnect'
import { IVisit, Visit, VisitKeys } from '@database/models/visit'

dbConnect()
type Data = IVisit

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const {
    query: { id },
    method,
  } = req

  if (method != 'GET') {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${method} Not Allowed`)
  }

  const visit: IVisit = _.pick(
    await Visit.findOne({ _id: id }).exec(),
    VisitKeys
  ) as IVisit

  res.status(200).json(visit)
}
