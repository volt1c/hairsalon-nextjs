import { NextPage } from 'next'
import MainLayout from '@layouts/MainLayout'
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
import { AiOutlineMail, AiOutlinePhone } from 'react-icons/ai'

const ContactPage: NextPage = () => {
  return (
    <MainLayout>
      <InfoBox className="p-0 border-primary-400 flex flex-row flex-initial mx-24 my-auto">
        <div className=" flex-grow-0 bg-neutral-300 bg-opacity-20 p-5">
          <div className="mb-3">
            <h1 className="text-2xl pb-4">Contact Information</h1>
            <p>We answer to yor question as soon as possible...</p>
          </div>
          <ul>
            <li className="flex flex-nowrap gap-2 p-2">
              <AiOutlinePhone className="w-6 h-6" />
              <span>+xxx 000 000 000</span>
            </li>
            <li className="flex flex-nowrap gap-2 p-2">
              <AiOutlineMail className="w-6 h-6" />
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
    </MainLayout>
  )
}

export default ContactPage
