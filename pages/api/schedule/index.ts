import type { NextApiRequest, NextApiResponse } from 'next'
import { ISchedule, Schedule, ScheduleKeys } from '@database/models/schedule'
import dbConnect from '@database/dbConnect'
import _ from 'lodash'

dbConnect()
type Data = any

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { method, body } = req

  switch (method) {
    case 'GET':
      const rawSchedule: ISchedule = await Schedule.findOne({}).exec()
      const schedule: ISchedule = _.pick(rawSchedule, ScheduleKeys) as ISchedule
      res.status(200).json(schedule)
      return

    case 'PUT':
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

    default:
      res.setHeader('Allow', ['GET', 'POST', 'DELETE'])
      res.status(405).end(`Method ${method} Not Allowed`)
      return
  }
}
