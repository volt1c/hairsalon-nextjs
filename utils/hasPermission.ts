import { Admin, IAdmin } from '@database/models/admin'
import { Session } from 'next-auth'

async function hasPermission(user: Session['user']): Promise<boolean> {
  const admin: IAdmin = await Admin.findOne({
    email: user?.email,
  }).exec()

  return !!admin || user?.email == process.env.AUTH_EMAIL
}

export default hasPermission
