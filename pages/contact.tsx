import { NextPage } from 'next'
import Layout from '@layouts/default'
import InfoBox from '@components/InfoBox'
import React from 'react'
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  RequiredIndicator,
  Textarea,
} from '@vechaiui/react'

const ContactPage: NextPage = () => {
  return (
    <Layout>
      <InfoBox className="p-0 border-primary-400 flex flex-row flex-initial mx-24 my-12">
        <div className=" flex-grow-0 bg-neutral-300 bg-opacity-20 p-5">
          <div className="mb-3">
            <h1 className="text-2xl pb-4">Contact Information</h1>
            <p>We answer to yor question as soon as possible...</p>
          </div>
          <ul>
            <li className="flex flex-nowrap gap-2 p-2">
              <svg
                className="w-6 h-6"
                fill="currentColor"
                stroke="none"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                ></path>
              </svg>
              <span>+xxx 000 000 000</span>
            </li>
            <li className="flex flex-nowrap gap-2 p-2">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                ></path>
              </svg>
              <span>contact@mail.com</span>
            </li>
          </ul>
        </div>
        <div className="p-5 text-2xl">
          <h1>Send us a message</h1>
          <form action="" className="flex flex-row flex-wrap ">
            <FormControl className="p-2 w-1/2 flex-grow">
              <FormLabel>Name</FormLabel>
              <Input placeholder="Name" />
            </FormControl>
            <FormControl className="p-2 w-1/2 flex-grow">
              <FormLabel>Surename</FormLabel>
              <Input placeholder="Surename" />
            </FormControl>
            <FormControl className="p-2 w-1/2 flex-grow">
              <FormLabel>Email</FormLabel>
              <Input placeholder="Email" />
            </FormControl>
            <FormControl className="p-2 w-1/2 flex-grow">
              <FormLabel>
                Phone number
                <RequiredIndicator />
              </FormLabel>
              <Input.Group>
                <Input.LeftAddon children="+xxx" />
                <Input placeholder="Phone number" />
              </Input.Group>
            </FormControl>
            <FormControl className="p-2 flex-grow">
              <FormLabel>Subject</FormLabel>
              <Input placeholder="Subject" />
            </FormControl>
            <FormControl className="p-2 flex-grow">
              <FormLabel>Message</FormLabel>
              <Textarea placeholder="Message" className=" h-40" />
            </FormControl>
            <Button className="m-2">Submit</Button>
          </form>
        </div>
      </InfoBox>
    </Layout>
  )
}

export default ContactPage
