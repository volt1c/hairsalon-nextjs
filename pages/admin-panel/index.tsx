import AdminPanelLayout from '@layouts/AdminPanelLayout'
import fetchWithCookies from '@utils/fetchWithCookies'
import getOriginUrl from '@utils/getOriginUrl'
import { NextPage, NextPageContext } from 'next'
import Head from 'next/head'
import Router from 'next/router'
import React from 'react'

const IndexPage: NextPage = () => (
  <AdminPanelLayout pageName="index">
    <Head>
      <title>Admin Panel</title>
    </Head>

    <h1>Hello World</h1>
  </AdminPanelLayout>
)

IndexPage.getInitialProps = async (ctx: NextPageContext) => {
  const url = getOriginUrl(ctx.req)
  const cookie = ctx.req?.headers.cookie
  const res = await fetchWithCookies(`${url}/api/permission/`, 'HEAD', cookie)

  if (res.status === 401 && !ctx.req) Router.push(`${url}/api/auth/signin`)
  if (res.status === 401 && ctx.req) {
    ctx.res?.writeHead(302, {
      Location: `${url}/api/auth/signin`,
    })
    ctx.res?.end()
  }
  return {}
}

export default IndexPage
