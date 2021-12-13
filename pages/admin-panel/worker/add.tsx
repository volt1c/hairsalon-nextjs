import AdminPanelLayout from '@layouts/AdminPanelLayout'
import fetchWithCookies from '@utils/fetchWithCookies'
import getOriginUrl from '@utils/getOriginUrl'
import { Button, FormControl, Input, useNotification } from '@vechaiui/react'
import { NextPage, NextPageContext } from 'next'
import Router from 'next/router'
import React from 'react'

type Props = {}

const AddVisitPage: NextPage<Props, any> = ({}: Props) => {
  const notification = useNotification()
  const handleMessage = (ok: boolean) =>
    notification({
      title: ok ? 'Success...' : 'Error...',
      description: `Apppointment ${
        ok ? ' was successfully updated' : "couldn't be updated"
      }`,
      status: ok ? 'success' : 'error',
      position: 'top',
    })
  const formSubmit = async () => {
    const getValue = (id: string): string | number => {
      const value = (document.querySelector(`#${id}`) as any).value as string
      return value
    }

    const formData: { [key: string]: any } = {}
    ;['email'].forEach(
      (name) => (formData[name as string] = getValue(name as string))
    )

    const res = await fetch(`/api/permission/`, {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    handleMessage(res.ok)
  }

  return (
    <AdminPanelLayout pageName="worker:add">
      <h1 className="pl-4 py-2 text-2xl">Add</h1>
      <form>
        <FormControl id="email" className="pb-6">
          <Input placeholder="Email" variant="solid" />
        </FormControl>
        <Button type="button" className="mr-3" onClick={formSubmit}>
          Send
        </Button>
      </form>
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
  return {}
}

export default AddVisitPage
