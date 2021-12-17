import MainLayout from '@layouts/MainLayout'
import InfoBox from '@components/InfoBox'
import Head from 'next/head'
import React from 'react'
import { ISchedule } from '@database/models/schedule'
import { NextPageContext } from 'next'
import getOriginUrl from '@utils/getOriginUrl'
import FormAddVisit, { fetchAvaliable } from '@components/FormAddVisit'
import { useNotification } from '@vechaiui/react'

function Book({
  avaliable,
  schedule,
}: {
  avaliable: string[]
  schedule: ISchedule
}) {
  const notification = useNotification()

  return (
    <MainLayout>
      <Head>
        <meta charSet="utf-8" />
        <title>Hairsalon - Book an appointment</title>
      </Head>

      <InfoBox className="p-0 border-primary-400 flex flex-row flex-initial mx-24 my-auto">
        <div className=" flex-grow-0 bg-neutral-300 bg-opacity-20 p-5 w-64">
          <div className="mb-3">
            <h1 className="text-2xl pb-4">Schedule: </h1>

            <h2 className="text-lg pb-2">When we are open:</h2>
            <div className="pl-3">
              <p>Work days:</p>
              <ul>
                {schedule.workWeekDays.map((day) => (
                  <li key={day.toString()} className="ml-2">
                    - {`${day}`}
                  </li>
                ))}
              </ul>
              <p>Open hours:</p>
              <ul>
                {schedule.openHours.map((hour) => (
                  <li key={hour.toString()} className="ml-2">
                    - {`${hour}:00`}
                  </li>
                ))}
              </ul>
              <p>Planning scope:</p>
              <ul>
                <li key={schedule.planningScope.toString()} className="ml-2">
                  - {schedule.planningScope} days
                </li>
              </ul>
            </div>
          </div>
          <ul></ul>
        </div>

        <div className="flex flex-wrap flex-col w-full p-5">
          <h1 className="p-4 text-3xl ">Book an appointment</h1>
          <FormAddVisit
            redirectUrl="/"
            avaliable={avaliable}
            notification={notification}
          />
        </div>
      </InfoBox>
    </MainLayout>
  )
}

Book.getInitialProps = async ({ req }: NextPageContext) => {
  let baseUrl: string = getOriginUrl(req)

  let avaliable: string[] = await fetchAvaliable(baseUrl)
  let schedule = {
    _id: 'test',
    planningScope: 0,
    workWeekDays: [],
    openHours: [],
  }

  try {
    const dataSchedule = await (await fetch(`${baseUrl}/api/schedule`)).json()
    schedule = dataSchedule
  } catch (err) {}

  return {
    avaliable,
    schedule,
  }
}

export default Book
