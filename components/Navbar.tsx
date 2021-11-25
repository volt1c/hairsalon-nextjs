import { Button } from '@vechaiui/react'
import Link from 'next/link'
import { ReactElement } from 'react'

const Navbar = (): ReactElement => (
  <header className="bg-black">
    <nav className="justify-between flex items-center px-5">
      <h1 className="py-5 text-2xl uppercase">
        <Link href="/">
          <a>HairSalon</a>
        </Link>
      </h1>
      <ul>
        <li className="inline-block px-5">
          <Link href="/about">
            <Button variant="ghost">About</Button>
          </Link>
        </li>
        <li className="inline-block px-5">
          <Link href="/contact">
            <Button variant="ghost">Contact</Button>
          </Link>
        </li>
        <li className="inline-block px-5">
          <Link href="/book">
            <Button variant="ghost">Book</Button>
          </Link>
        </li>
      </ul>
      <Link href="/about">
        <Button variant="light" color="primary" className="uppercase">
          book an appointment
        </Button>
      </Link>
    </nav>
  </header>
)

export default Navbar
