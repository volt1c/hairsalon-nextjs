import type { NextApiRequest, NextApiResponse } from 'next'
import { ISchedule, Schedule, ScheduleKeys } from '@database/models/schedule'
import dbConnect from '@database/dbConnect'
import _ from 'lodash'
import hasPermission from '@utils/hasPermission'
import { getSession } from 'next-auth/react'

dbConnect()
type Data = any

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const session = await getSession({ req })
  const { method, body } = req

  switch (method) {
    case 'GET':
      const rawSchedule: ISchedule = await Schedule.findOne({}).exec()
      const schedule: ISchedule = _.pick(rawSchedule, ScheduleKeys) as ISchedule
      res.status(200).json(schedule)
      return

    case 'PUT':
      if (await hasPermission(session?.user)) {
        // todo: validate body
        const newSchedule: ISchedule = {
          planningScope: body.planningScope,
          workWeekDays: body.workWeekDays,
          openHours: body.openHours,
        } as ISchedule
        if ((await Schedule.findOne({}).exec()) == null)
          await Schedule.create(newSchedule)
        await Schedule.findOneAndReplace({}, newSchedule)
        res.status(201).end()
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
