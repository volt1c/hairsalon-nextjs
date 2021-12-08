import { ICreateVisit, IVisit, Visit } from '@database/models/visit'

export async function addVisit(visit: ICreateVisit): Promise<boolean> {
  //todo validation: email, phone
  const newVisit: IVisit = {
    name: visit.name,
    surename: visit.surename,
    email: visit.email,
    phone: visit.phone,
    date: new Date(visit.year, visit.month - 1, visit.day, visit.hour),
  } as IVisit
  Visit.create(newVisit)
  return true
}
