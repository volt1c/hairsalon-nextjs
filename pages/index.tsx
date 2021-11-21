import { NextPage } from 'next'
import Link from 'next/link'
import styles from '@styles/Home.module.css'

const IndexPage: NextPage = () => {
  return (
    <div className={styles.main}>
      <h1 className={styles.banner}>The best hair salon in the city</h1>
      <p className={styles.p}>We cut your hair and give them new life.</p>
      <Link href="/book">
        <a className={styles.buttonLink}>Book now</a>
      </Link>
    </div>
  )
}

export default IndexPage
