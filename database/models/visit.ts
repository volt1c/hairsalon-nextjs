import { Schema, Document, model, models } from 'mongoose'

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
  date: Date
}
interface ICreateVisit {
  name: IVisit['name']
  surename: IVisit['surename']
  email: IVisit['email']
  phone: IVisit['phone']
  date: IVisit['date']
}
const Visit = models.Visit || model<IVisit>('Visit', visitShema)

export type { IVisit, ICreateVisit }
export { Visit, VisitKeys }
