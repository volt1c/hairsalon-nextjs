import AdminElement from '@components/admin-panel/AdminElement'
import { IAdmin } from '@database/models/admin'
import AdminPanelLayout from '@layouts/AdminPanelLayout'
import fetchWithCookies from '@utils/fetchWithCookies'
import getOriginUrl from '@utils/getOriginUrl'
import { NextPage, NextPageContext } from 'next'
import Router from 'next/router'
import React from 'react'

type Props = {
  admins: IAdmin[]
}

const ListWorkerPage: NextPage<Props, any> = ({ admins }) => {
  return (
    <AdminPanelLayout pageName="worker:list">
      <div className="pl-4">
        <h1 className="py-2 text-2xl">List</h1>
        <ul>
          {admins.map((admin, idx) => {
            return (
              <li key={idx}>
                <AdminElement admin={admin} />
              </li>
            )
          })}
        </ul>
      </div>
    </AdminPanelLayout>
  )
}

ListWorkerPage.getInitialProps = async (ctx: NextPageContext) => {
  const url = getOriginUrl(ctx.req)
  const cookie = ctx.req?.headers.cookie
  const res = await fetchWithCookies(`${url}/api/permission`, 'GET', cookie)

  if (res.status === 401 && !ctx.req) Router.push(`${url}/api/auth/signin`)
  if (res.status === 401 && ctx.req) {
    ctx.res?.writeHead(302, {
      Location: `${url}/api/auth/signin`,
    })
    ctx.res?.end()
  }

  const admins: IAdmin[] = await res.json()

  return { admins }
}

export default ListWorkerPage
