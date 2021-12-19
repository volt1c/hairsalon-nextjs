import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Link,
  RequiredIndicator,
} from '@vechaiui/react'
import Router from 'next/router'
import { ReactElement, useState } from 'react'
import SelectDate from './SelectDate'

type Props = {
  avaliable: string[]
  notification: any
  redirectUrl: string
}

const FormAddVisit = ({
  avaliable,
  notification,
  redirectUrl = './',
}: Props): ReactElement => {
  const [wasSend, setWasSend] = useState(false)
  const handleMessage = (ok: boolean) =>
    notification({
      title: ok ? 'Success...' : 'Error...',
      description: ok
        ? 'Apppointment was successfully booked'
        : 'Apppointment couldn not be booked',
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

    setWasSend(true)
    const res = await fetch('/api/visits', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    handleMessage(res.ok)
    if (res.ok) {
      setTimeout(() => Router.push(redirectUrl), 3000)
    } else {
      setWasSend(false)
    }
  }

  return (
    <form className="p-4 flex flex-row flex-wrap">
      <FormControl id="name" className="p-2 w-1/2 flex-grow">
        <FormLabel>
          Name
          <RequiredIndicator />
        </FormLabel>
        <Input placeholder="Name" />
      </FormControl>
      <FormControl id="surename" className="p-2 w-1/2 flex-grow">
        <FormLabel>
          Surename
          <RequiredIndicator />
        </FormLabel>
        <Input placeholder="Surename" />
      </FormControl>
      <FormControl id="email" className="p-2 w-1/2 flex-grow">
        <FormLabel>
          Email
          <RequiredIndicator />
        </FormLabel>
        <Input placeholder="Email" type="email" />
      </FormControl>
      <FormControl id="phone" className="p-2 w-1/2 flex-grow">
        <FormLabel>
          Phone number
          <RequiredIndicator />
        </FormLabel>
        <Input.Group>
          <Input.LeftAddon children="+xxx" />
          <Input placeholder="Phone number" />
        </Input.Group>
      </FormControl>
      <div className="flex flex-row w-full p-2 flex-grow">
        <SelectDate dates={avaliable} isRequired={true} />
      </div>
      <Button
        type="button"
        className="ml-2 mr-3"
        onClick={formSubmit}
        disabled={wasSend}
      >
        Send
      </Button>
      <Link href="/contact">
        <Button type="button" variant="ghost">
          Contact another way
        </Button>
      </Link>
    </form>
  )
}

const fetchAvaliable = async (baseUrl: string): Promise<string[]> => {
  let avaliable: string[] = []

  try {
    const dataAvaliable = await (
      await fetch(`${baseUrl}/api/visits/avaliable`)
    ).json()
    avaliable = dataAvaliable.avaliable
  } catch (err) {}

  return avaliable
}

export default FormAddVisit
export { fetchAvaliable }
