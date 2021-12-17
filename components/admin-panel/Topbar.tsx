import { ReactElement } from 'react'
import AuthButton from './AuthButton'

const Topbar = (): ReactElement => (
  <nav className="fixed w-full h-12 bg-fill top-0 right-0 flex flex-row">
    <section className="grow w-full flex flex-row-reverse">
      <AuthButton />
    </section>
  </nav>
)

export default Topbar
