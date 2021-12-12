import FormAddVisit, { fetchAvaliable } from '@components/FormAddVisit'
import AdminPanelLayout from '@layouts/AdminPanelLayout'
import fetchWithCookies from '@utils/fetchWithCookies'
import getOriginUrl from '@utils/getOriginUrl'
import { useNotification } from '@vechaiui/react'
import { NextPage, NextPageContext } from 'next'
import Router from 'next/router'
import React from 'react'

type Props = {
  avaliable: string[]
}

const AddVisitPage: NextPage<Props, any> = ({ avaliable }: Props) => {
  const notification = useNotification()

  return (
    <AdminPanelLayout pageName="visit:add">
      <h1 className="pl-4 py-2 text-2xl">Add</h1>
      <FormAddVisit avaliable={avaliable} notification={notification} />
    </AdminPanelLayout>
  )
}

AddVisitPage.getInitialProps = async (ctx: NextPageContext) => {
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

  const avaliable = await fetchAvaliable(url)

  return {
    avaliable,
  }
}

export default AddVisitPage
