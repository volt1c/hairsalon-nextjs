import styles from '@styles/components/Navbar.module.css'
import Link from 'next/link'
import { ReactElement } from 'react'

const Navbar = (): ReactElement => (
  <header className={styles.self}>
    <h1 className={styles.logo}>
      <Link href="/">
        <a>HairSalon</a>
      </Link>
    </h1>
    <nav className={styles.nav}>
      <ul>
        <li>
          <Link href="/about">
            <a>About</a>
          </Link>
        </li>
        <li>
          <Link href="/contact">
            <a>Contact</a>
          </Link>
        </li>
        <li>
          <Link href="/book">
            <a>Book</a>
          </Link>
        </li>
      </ul>
    </nav>
  </header>
)

export default Navbar
