import { Schema, Document, model, models } from 'mongoose'

type workWeekDays =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday'

const ScheduleKeys = ['_id', 'workWeekDays', 'openHours', 'planningScope']
const ScheduleSchema = new Schema({
  planningScope: { type: Number, required: true },
  workWeekDays: { type: Array, required: true },
  openHours: { type: Array, required: true },
})

interface ISchedule extends Document {
  _id: string
  planningScope: number
  workWeekDays: Array<workWeekDays>
  openHours: Array<number>
}
interface ICreateSchedule {
  planningScope: ISchedule['planningScope']
  workWeekDays: ISchedule['workWeekDays']
  openHours: ISchedule['openHours']
}
const Schedule = models.Schedule || model<ISchedule>('Schedule', ScheduleSchema)

export type { ISchedule, ICreateSchedule, workWeekDays }
export { Schedule, ScheduleKeys }
