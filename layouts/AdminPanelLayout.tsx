import Head from 'next/head'
import React, { ReactElement, useEffect } from 'react'
import Sidebar from '@components/admin-panel/Sidebar'
import Topbar from '@components/admin-panel/Topbar'

type LayoutProps = {
  children: ReactElement | ReactElement[]
  pageName: string
}

const AdminPanelLayout = ({
  children,
  pageName,
}: LayoutProps): ReactElement => {
  return (
    <div className="min-h-screen h-full bg-base flex fex-nowrap flex-row">
      <Head>
        <title>Admin Panel</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Topbar />
      <Sidebar pageName={pageName} />

      <main className="ml-48 mt-12 p-1 w-full">{children}</main>
    </div>
  )
}

export default AdminPanelLayout
