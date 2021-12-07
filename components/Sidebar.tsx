import { ReactElement } from 'react'
import { AiOutlineDashboard } from 'react-icons/ai'
import ListItem from '@components/Sidebar/ListItem'

const Sidebar = (): ReactElement => (
  <aside className="min-h-screen flex flex-col w-48">
    <header className="bg-blue-900 w-full p-3">
      Admin <span className="font-bold">Panel</span>
    </header>
    <section className="bg-blue-700 w-full h-full">
      <h5 className="px-3 p-1 font-thin">Genaral</h5>
      <ul className="w-full">
        <ListItem
          Icon={AiOutlineDashboard}
          href="/admin-panel/"
          title="option 1"
        />
        <ListItem
          Icon={AiOutlineDashboard}
          isChosen={true}
          href="/admin-panel/"
          title="option 2"
        />
      </ul>
    </section>
  </aside>
)

export default Sidebar
