import Head from 'next/head'
import React, { ReactElement } from 'react'
import Sidebar from '@components/Sidebar'
import Topbar from '@components/Topbar'

type LayoutProps = {
  children: ReactElement | ReactElement[]
}

const AdminPanelLayout = ({ children }: LayoutProps): ReactElement => (
  <div className="min-h-screen h-full bg-base flex fex-nowrap flex-row">
    <Head>
      <title>Admin Panel</title>
      <meta name="description" content="" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Sidebar />
    <Topbar />
    <main className="mt-12 p-1">{children}</main>
  </div>
)

export default AdminPanelLayout
