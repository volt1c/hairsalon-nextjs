import { ReactElement } from 'react'

const Topbar = (): ReactElement => (
  <nav className="fixed w-full h-12 bg-fill top-0 right-0">
    <h1 className="w-48 h-12 bg-blue-900 px-3 py-3 font-thin">
      Admin <span className="font-bold">Panel</span>
    </h1>
    <section className=""></section>
  </nav>
)

export default Topbar
