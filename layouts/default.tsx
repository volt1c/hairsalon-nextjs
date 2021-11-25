import Head from 'next/head'
import styles from '@styles/components/Layout.module.css'
import Navbar from '@components/Navbar'
import Footer from '@components/Footer'
import { ReactElement } from 'react'

type LayoutProps = {
  children: ReactElement | ReactElement[]
}

const Layout = ({ children }: LayoutProps): ReactElement => (
  <div className="min-h-screen bg-gradient-to-r from-blue-800 via-green-700 to-indigo-600">
    <Head>
      <title>HairSalon</title>
      <meta name="description" content="Generated by create next app" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Navbar />
    <div />
    <div>
      <main>{children}</main>
    </div>
    <Footer />
  </div>
)

export default Layout
