import Layout from '@layouts/default'
import InfoBox from '@components/InfoBox'
import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { FormControl, Input, Button, useNotification } from '@vechaiui/react'
import React from 'react'
import { AiOutlineCalendar } from 'react-icons/ai'
import { BiTime } from 'react-icons/bi'

const Book: NextPage = () => {
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
    const getValue = (id: string): string =>
      (document.querySelector(`#${id}`) as any).value as string

    const formData: { [key: string]: any } = {}
    ;['name', 'surename', 'email', 'phone', 'date', 'time'].forEach(
      (name) => (formData[name] = getValue(name))
    )
    console.log(formData)

    const res = await fetch('./api/visits', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    })

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
              <FormControl id="date" className="pb-6 pr-3">
                <Input.Group>
                  <Input.RightElement
                    children={<AiOutlineCalendar className="h-6 w-6" />}
                  />
                  <Input placeholder="Date" type="date" variant="solid" />
                </Input.Group>
              </FormControl>
              <FormControl id="time" className="pb-6">
                <Input.Group>
                  <Input.RightElement
                    children={<BiTime className="h-6 w-6" />}
                  />

                  <Input placeholder="Time" type="time" variant="solid" />
                </Input.Group>
              </FormControl>
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

export default Book
