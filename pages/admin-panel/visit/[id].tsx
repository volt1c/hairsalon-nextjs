import FormAddVisit, { fetchAvaliable } from '@components/FormAddVisit'
import SelectDate from '@components/SelectDate'
import { IVisit } from '@database/models/visit'
import AdminPanelLayout from '@layouts/AdminPanelLayout'
import fetchWithCookies from '@utils/fetchWithCookies'
import getOriginUrl from '@utils/getOriginUrl'
import { Button, FormControl, Input, useNotification } from '@vechaiui/react'
import { NextPage, NextPageContext } from 'next'
import Router, { useRouter } from 'next/router'
import React from 'react'

type Props = {
  visit: IVisit
  avaliable: string[]
}

const AddVisitPage: NextPage<Props, any> = ({ visit, avaliable }: Props) => {
  const notification = useNotification()
  const deleteVisit = (id: string) => {
    fetchWithCookies(`/api/visits/${id}`, 'DELETE')
    useRouter().push('/admin-panel/list')
  }

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
    const getValue = (
      id: string,
      isNumber: boolean = false
    ): string | number => {
      const value = (document.querySelector(`#${id}`) as any).value as string
      return isNumber ? parseInt(value) : value
    }

    const formData: { [key: string]: any } = {}
    ;[
      ['name'],
      ['surename'],
      ['email'],
      ['phone'],
      ['year', true],
      ['month', true],
      ['day', true],
      ['hour', true],
    ].forEach(
      ([name, isNumber = false]) =>
        (formData[name as string] = getValue(
          name as string,
          isNumber as boolean
        ))
    )

    const res = await fetch(`/api/visits/${visit._id}`, {
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
      <h1 className="pl-4 py-2 text-2xl">Visit</h1>
      <form className="pl-4">
        <FormControl id="name" className="pb-6">
          <Input placeholder="Name" variant="solid" defaultValue={visit.name} />
        </FormControl>
        <FormControl id="surename" className="pb-6">
          <Input
            placeholder="Surename"
            variant="solid"
            defaultValue={visit.surename}
          />
        </FormControl>
        <FormControl id="email" className="pb-6">
          <Input
            placeholder="Email"
            variant="solid"
            defaultValue={visit.email}
          />
        </FormControl>
        <FormControl id="phone" className="pb-6">
          <Input.Group>
            <Input.LeftAddon children="+xxx" />
            <Input
              placeholder="Phone Number"
              variant="solid"
              defaultValue={visit.phone}
            />
          </Input.Group>
        </FormControl>
        <div className="flex flex-row">
          <SelectDate dates={avaliable} defaultValue={new Date(visit.date)} />
        </div>

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
  const res = await fetchWithCookies(`${url}/api/visits/${id}`, 'GET', cookie)

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
