import Layout from '@layouts/default'
import InfoBox from '@components/InfoBox'
import Head from 'next/head'
import Link from 'next/link'
import { FormControl, Input, Button, useNotification } from '@vechaiui/react'
import React from 'react'
import SelectDate from '@components/SelectDate'

function Book({
  avaliable,
  schedule,
}: {
  avaliable: string[]
  schedule: object
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

      <InfoBox>
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

export async function getStaticProps() {
  const baseUrl = process.env.URL as string

  const data = await (await fetch(`${baseUrl}/api/visits/avaliable`)).json()
  const avaliable: string[] = data.avaliable

  return {
    props: {
      avaliable,
    },
  }
}

export default Book
