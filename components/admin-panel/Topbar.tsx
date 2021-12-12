import { ReactElement } from 'react'
import AuthButton from './AuthButton'

const Topbar = (): ReactElement => (
  <nav className="fixed w-full h-12 bg-fill top-0 right-0 flex flex-row">
    <h1 className="w-48 h-12 bg-blue-900 px-3 py-3 font-thin flex-none">
      Admin <span className="font-bold">Panel</span>
    </h1>
    <section className="grow w-full flex flex-row-reverse">
      <AuthButton />
    </section>
  </nav>
)

export default Topbar
