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

  switch (method) {
    case 'GET':
      const visit: IVisit = _.pick(
        await Visit.findOne({ _id: id }).exec(),
        VisitKeys
      ) as IVisit
      res.status(200).json(visit)
      return

    case 'DELETE':
      await Visit.deleteOne({ _id: id }).exec()
      res.status(202).end()
      return
  }

  res.setHeader('Allow', ['GET', 'DELETE'])
  res.status(405).end(`Method ${method} Not Allowed`)
}
