// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import _ from 'lodash'
import { IVisit, Visit, VisitKeys } from '@database/models/visit'
import dbConnect from '@database/dbConnect'

dbConnect()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IVisit>
) {
  const {
    query: { id },
    method,
  } = req

  if (method == 'GET') {
    const visit: IVisit = _.pick(
      await Visit.findOne({ _id: id }).exec(),
      VisitKeys
    ) as IVisit
    res.status(200).json(visit)
  }

  res.setHeader('Allow', ['GET', 'POST', 'DELETE'])
  res.status(405).end(`Method ${method} Not Allowed`)
}
