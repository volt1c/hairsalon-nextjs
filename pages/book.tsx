import Layout from '@layouts/default'
import InfoBox from '@components/InfoBox'
import React from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import { FormControl, Input } from '@vechaiui/react'

const Book: NextPage = () => {
  return (
    <Layout>
      <Head>
        <meta charSet="utf-8" />
        <title>Hairsalon - Book an appointment</title>
      </Head>

      <InfoBox>
        <div className="flex flex-wrap w-full p-5">
          <h1 className="p-4 text-3xl">Book an appointment</h1>
          <FormControl id="name" className="p-4">
            <Input placeholder="Name" variant="solid" />
          </FormControl>
          <FormControl id="surename" className="p-4">
            <Input placeholder="Surename" variant="solid" />
          </FormControl>
          <FormControl id="email" className="p-4">
            <Input placeholder="Email" variant="solid" />
          </FormControl>
          <FormControl id="phone" className="p-4">
            <Input.Group>
              <Input.LeftAddon children="+xxx" />
              <Input placeholder="Phone Number" variant="solid" />
            </Input.Group>
          </FormControl>
          <FormControl id="date" className="p-4">
            <Input.Group>
              <Input.RightElement
                children={
                  <svg
                    className="h-6 w-6 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    ></path>
                  </svg>
                }
              />
              <Input placeholder="Date" type="datetime-local" variant="solid" />
            </Input.Group>
          </FormControl>
        </div>
      </InfoBox>
    </Layout>
  )
}

export default Book
