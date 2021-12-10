import Layout from '@layouts/default'
import InfoBox from '@components/InfoBox'
import Head from 'next/head'
import Link from 'next/link'
import { FormControl, Input, Button, useNotification } from '@vechaiui/react'
import React from 'react'
import SelectDate from '@components/SelectDate'
import { ISchedule } from '@database/models/schedule'
import { NextPageContext } from 'next'
import getOriginUrl from '@utils/getOriginUrl'

function Book({
  avaliable,
  schedule,
}: {
  avaliable: string[]
  schedule: ISchedule
}) {
  const notification = useNotification()
  const handleMessage = (ok: boolean) =>
    notification({
      title: ok ? 'Success...' : 'Error...',
      description: `Apppointment ${
        ok ? ' was successfully booked' : "couldn't be booked"
      }`,
      status: ok ? 'success' : 'error',
      position: 'top',
    })
  const formSubmit = async () => {
    const getValue = (
      id: string,
      isNumber: boolean = false
    ): string | number => {
      const value = (document.querySelector(`#${id}`) as any).value as string
      return isNumber ? parseInt(value) : value
    }

    const formData: { [key: string]: any } = {}
    ;[
      ['name'],
      ['surename'],
      ['email'],
      ['phone'],
      ['year', true],
      ['month', true],
      ['day', true],
      ['hour', true],
    ].forEach(
      ([name, isNumber = false]) =>
        (formData[name as string] = getValue(
          name as string,
          isNumber as boolean
        ))
    )

    const res = await fetch('./api/visits', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    console.log(JSON.stringify(formData))
    console.log(res)
    handleMessage(res.ok)
  }

  return (
    <Layout>
      <Head>
        <meta charSet="utf-8" />
        <title>Hairsalon - Book an appointment</title>
      </Head>

      <InfoBox className="flex flex-row flex-initial">
        <div className=" flex-grow-0 bg-neutral-300 bg-opacity-20 p-5">
          <div className="mb-3">
            <h1 className="text-2xl pb-4">Schedule: </h1>

            <h2 className="text-lg pb-4">When we are open:</h2>
            <p>Work days:</p>
            <ul>
              {schedule.workWeekDays.map((day) => (
                <li key={day.toString()} className="ml-2">{`${day}`}</li>
              ))}
            </ul>
            <p>Open hours:</p>
            <ul>
              {schedule.openHours.map((hour) => (
                <li key={hour.toString()} className="ml-2">{`${hour}:00`}</li>
              ))}
            </ul>
            <p>Planning scope:</p>
            <ul>
              <li key={schedule.planningScope.toString()} className="ml-2">
                {schedule.planningScope} days
              </li>
            </ul>
          </div>
          <ul></ul>
        </div>

        <div className="flex flex-wrap flex-col w-full p-5">
          <h1 className="p-4 text-3xl ">Book an appointment</h1>
          <form className="block p-4">
            <FormControl id="name" className="pb-6">
              <Input placeholder="Name" variant="solid" />
            </FormControl>
            <FormControl id="surename" className="pb-6">
              <Input placeholder="Surename" variant="solid" />
            </FormControl>
            <FormControl id="email" className="pb-6">
              <Input placeholder="Email" variant="solid" />
            </FormControl>
            <FormControl id="phone" className="pb-6">
              <Input.Group>
                <Input.LeftAddon children="+xxx" />
                <Input placeholder="Phone Number" variant="solid" />
              </Input.Group>
            </FormControl>
            <div className="flex flex-row">
              <SelectDate dates={avaliable} />
            </div>
            <Button type="button" className="mr-3" onClick={formSubmit}>
              Send
            </Button>
            <Link href="/contact">
              <Button type="button" variant="ghost">
                Contact another way
              </Button>
            </Link>
          </form>
        </div>
      </InfoBox>
    </Layout>
  )
}

Book.getInitialProps = async ({ req }: NextPageContext) => {
  if (!req) throw new Error('error - ctx.req is not defined')

  let baseUrl: string = getOriginUrl(req)

  let avaliable: string[] = []
  let schedule = {
    _id: 'test',
    planningScope: 0,
    workWeekDays: [],
    openHours: [],
  }

  try {
    const dataAvaliable = await (
      await fetch(`${baseUrl}/api/visits/avaliable`)
    ).json()
    avaliable = dataAvaliable.avaliable
  } catch (err) {}

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
