import { NextPage } from 'next'
import Link from 'next/link'
import MainLayout from '@layouts/MainLayout'
import { Button } from '@vechaiui/react'

const IndexPage: NextPage = () => {
  return (
    <MainLayout>
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
    </MainLayout>
  )
}

export default IndexPage
