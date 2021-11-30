import Head from 'next/head'
import Navbar from '@components/Navbar'
import Footer from '@components/Footer'
import { ReactElement } from 'react'

type LayoutProps = {
  children: ReactElement | ReactElement[]
}

const AdminPanelLayout = ({ children }: LayoutProps): ReactElement => (
  <div className="min-h-screen h-full bg-gradient-to-r from-blue-800 to-indigo-600">
    <Head>
      <title>Admin Panel</title>
      <meta name="description" content="" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main className="">{children}</main>
  </div>
)

export default AdminPanelLayout
