import { ReactElement } from 'react'
import {
  AiOutlineAppstoreAdd,
  AiOutlineDashboard,
  AiOutlineUnorderedList,
} from 'react-icons/ai'
import ListItem from '@components/admin-panel/Sidebar/ListItem'

type Props = {
  pageName: string
}

const Sidebar = ({ pageName }: Props): ReactElement => (
  <aside className="min-h-screen flex flex-col w-48">
    <header className="bg-blue-900 w-full p-3">
      Admin <span className="font-bold">Panel</span>
    </header>
    <section className="bg-blue-700 w-full">
      <h5 className="px-3 p-1 font-thin">General</h5>
      <ul className="w-full">
        <ListItem
          Icon={AiOutlineDashboard}
          isChosen={pageName == 'index'}
          href="/admin-panel/"
          title="index"
        />
      </ul>
    </section>
    <section className="bg-blue-700 w-full">
      <h5 className="px-3 p-1 font-thin">Visit</h5>
      <ul className="w-full">
        <ListItem
          Icon={AiOutlineAppstoreAdd}
          isChosen={pageName == 'visit:add'}
          href="/admin-panel/visit/add"
          title="add"
        />
        <ListItem
          Icon={AiOutlineUnorderedList}
          isChosen={pageName == 'visit:list'}
          href="/admin-panel/visit/list"
          title="list"
        />
      </ul>
    </section>
    <section className="bg-blue-700 w-full h-full">
      <h5 className="px-3 p-1 font-thin">Workers</h5>
      <ul className="w-full">
        <ListItem
          Icon={AiOutlineAppstoreAdd}
          isChosen={pageName == 'worker:add'}
          href="/admin-panel/worker/add"
          title="add"
        />
        <ListItem
          Icon={AiOutlineUnorderedList}
          isChosen={pageName == 'worker:list'}
          href="/admin-panel/worker/list"
          title="list"
        />
      </ul>
    </section>
  </aside>
)

export default Sidebar
