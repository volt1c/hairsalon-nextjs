import VisitElement from '@components/admin-panel/VisitElement'
import { IVisit, Visit } from '@database/models/visit'
import AdminPanelLayout from '@layouts/AdminPanelLayout'
import fetchWithCookies from '@utils/fetchWithCookies'
import getOriginUrl from '@utils/getOriginUrl'
import { NextPage, NextPageContext } from 'next'
import Router from 'next/router'
import React from 'react'

type Props = {
  visits: IVisit[]
}

const AddVisitPage: NextPage<Props, any> = ({ visits }) => {
  return (
    <AdminPanelLayout pageName="visit:list">
      <h1 className="pl-4 py-2 text-2xl">List</h1>
      <ul>
        {visits.map((visit, idx) => {
          return (
            <li key={idx}>
              <VisitElement visit={visit} />
            </li>
          )
        })}
      </ul>
    </AdminPanelLayout>
  )
}

AddVisitPage.getInitialProps = async (ctx: NextPageContext) => {
  const url = getOriginUrl(ctx.req)
  const cookie = ctx.req?.headers.cookie
  const res = await fetchWithCookies(`${url}/api/visits`, 'GET', cookie)

  if (res.status === 401 && !ctx.req) Router.push(`${url}/api/auth/signin`)
  if (res.status === 401 && ctx.req) {
    ctx.res?.writeHead(302, {
      Location: `${url}/api/auth/signin`,
    })
    ctx.res?.end()
  }

  const visits: IVisit[] = await res.json()

  return { visits }
}

export default AddVisitPage
