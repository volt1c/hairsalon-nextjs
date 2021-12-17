import { Schema, Document, model, models } from 'mongoose'

type time =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23

const VisitKeys = ['_id', 'name', 'surename', 'email', 'phone', 'date']
const visitShema = new Schema({
  name: { type: String, required: true },
  surename: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  date: { type: Date, required: true },
})

interface IVisit extends Document {
  _id: string
  name: string
  surename: string
  email: string
  phone: string
  date: Date | string
}
interface ICreateVisit {
  name: IVisit['name']
  surename: IVisit['surename']
  email: IVisit['email']
  phone: IVisit['phone']
  year: number
  month: number
  day: number
  hour: number
}
const Visit = models.Visit || model<IVisit>('Visit', visitShema)

export type { IVisit, ICreateVisit }
export { Visit, VisitKeys }
