import { NextPage } from 'next'
import Head from 'next/head'
import { VechaiProvider, Button } from '@vechaiui/react'
import Layout from '@layouts/default'

const About: NextPage = () => {
  return (
    <Layout>
      <div className="flex flex-wrap w-full p-8 space-x-2">
        <Button color="primary">Button</Button>
        <Button variant="solid" color="primary">
          Button
        </Button>
        <Button variant="light" color="primary">
          Button
        </Button>
        <Button variant="ghost" color="primary">
          Button
        </Button>
        <Button variant="link" color="primary">
          Button
        </Button>
      </div>
    </Layout>
  )
}

export default About
