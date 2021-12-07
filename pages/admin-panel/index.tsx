import AdminPanelLayout from '@layouts/AdminPanelLayout'
import { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'

const IndexPage: NextPage = () => (
  <AdminPanelLayout>
    <Head>
      <title>Admin Panel</title>
    </Head>

    <h1>Hello World</h1>
  </AdminPanelLayout>
)

export default IndexPage
