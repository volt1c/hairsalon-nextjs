import Link from 'next/link'
import React, { ReactElement } from 'react'
import { IconType } from 'react-icons'

type ComponentProps = {
  isChosen?: boolean
  title: string
  href: string
  Icon: IconType
}
const Sidebar = ({
  isChosen = false,
  title,
  href,
  Icon,
}: ComponentProps): ReactElement => (
  <li>
    <Link href={href}>
      <a
        className={`p-1 px-3 pl-5 text-sm w-full flex align-text-top ${
          isChosen ? 'bg-blue-800' : 'hover:bg-blue-800'
        }`}
      >
        <Icon size="22" />
        <span className="pl-1">{title}</span>
      </a>
    </Link>
  </li>
)

export default Sidebar
