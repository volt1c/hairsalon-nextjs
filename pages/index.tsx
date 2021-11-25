import { NextPage } from 'next'
import Link from 'next/link'
import styles from '@styles/Home.module.css'
import Layout from '@layouts/default'
import { Button } from '@vechaiui/react'

const IndexPage: NextPage = () => {
  return (
    <Layout>
      <div className="py-64 px-10">
        <h1 className="py-4 text-8xl uppercase">
          The best hair salon in the city
        </h1>
        <p className="text-2xl py-4">
          We cut your hair and give them new life.
        </p>
        <Link href="/book">
          <Button size="lg" variant="solid" color="primary">
            Book now
          </Button>
        </Link>
      </div>
    </Layout>
  )
}

export default IndexPage
