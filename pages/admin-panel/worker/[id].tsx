import { fetchAvaliable } from '@components/FormAddVisit'
import { IVisit } from '@database/models/visit'
import AdminPanelLayout from '@layouts/AdminPanelLayout'
import fetchWithCookies from '@utils/fetchWithCookies'
import getOriginUrl from '@utils/getOriginUrl'
import { Button, FormControl, Input, useNotification } from '@vechaiui/react'
import { NextPage, NextPageContext } from 'next'
import Router from 'next/router'
import React from 'react'

type Props = {
  visit: IVisit
  avaliable: string[]
}

const AddVisitPage: NextPage<Props, any> = ({ visit, avaliable }: Props) => {
  const notification = useNotification()
  const deleteVisit = (id: string) => {
    fetchWithCookies(`/api/permission/${id}`, 'DELETE')
    Router.push('/admin-panel/worker/list')
  }

  const handleMessage = (ok: boolean) =>
    notification({
      title: ok ? 'Success...' : 'Error...',
      description: `Worker ${
        ok ? ' was successfully updated' : "couldn't be updated"
      }`,
      status: ok ? 'success' : 'error',
      position: 'top',
    })
  const formSubmit = async () => {
    const getValue = (
      id: string,
      isNumber: boolean = false
    ): string | number => {
      const value = (document.querySelector(`#${id}`) as any).value as string
      return isNumber ? parseInt(value) : value
    }

    const formData: { [key: string]: any } = {}
    ;[['email']].forEach(
      ([name, isNumber = false]) =>
        (formData[name as string] = getValue(
          name as string,
          isNumber as boolean
        ))
    )

    const res = await fetch(`/api/permission/${visit._id}`, {
      method: 'PUT',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    handleMessage(res.ok)
  }

  return (
    <AdminPanelLayout pageName="">
      <h1 className="px-4 py-2 text-2xl">Visit</h1>
      <form className="px-4">
        <FormControl id="email" className="pb-6">
          <Input
            placeholder="Email"
            variant="solid"
            defaultValue={visit.email}
          />
        </FormControl>

        <Button
          type="button"
          variant="ghost"
          onClick={() => deleteVisit(visit._id)}
        >
          Delete
        </Button>
        <Button type="button" variant="ghost" onClick={() => formSubmit()}>
          Save
        </Button>
      </form>
    </AdminPanelLayout>
  )
}

AddVisitPage.getInitialProps = async (ctx: NextPageContext) => {
  const {
    query: { id },
  } = ctx

  const url = getOriginUrl(ctx.req)
  const cookie = ctx.req?.headers.cookie
  const res = await fetchWithCookies(
    `${url}/api/permission/${id}`,
    'GET',
    cookie
  )

  if (res.status === 401 && !ctx.req) Router.push(`${url}/api/auth/signin`)
  if (res.status === 401 && ctx.req) {
    ctx.res?.writeHead(302, {
      Location: `${url}/api/auth/signin`,
    })
    ctx.res?.end()
  }

  const visit: IVisit = await res.json()
  const avaliable: string[] = await fetchAvaliable(url)

  return { visit, avaliable }
}

export default AddVisitPage
