import { Schema, Document, model, models } from 'mongoose'

const AdminKeys = ['_id', 'email']
const AdminSchema = new Schema({
  email: { type: String, required: true },
})

interface IAdmin extends Document {
  _id: string
  email: number
}
interface ICreateAdmin {
  email: IAdmin['email']
}
const Admin = models?.Admin || model<IAdmin>('Admin', AdminSchema)

export type { IAdmin, ICreateAdmin }
export { Admin, AdminKeys }
