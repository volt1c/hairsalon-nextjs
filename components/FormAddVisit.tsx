import { Button, FormControl, Input, Link } from '@vechaiui/react'
import { ReactElement } from 'react'
import SelectDate from './SelectDate'

type Props = {
  avaliable: string[]
  notification: any
}

const FormAddVisit = ({ avaliable, notification }: Props): ReactElement => {
  const handleMessage = (ok: boolean) =>
    notification({
      title: ok ? 'Success...' : 'Error...',
      description: `Apppointment ${
        ok ? ' was successfully booked' : "couldn't be booked"
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

    const res = await fetch('/api/visits', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    handleMessage(res.ok)
  }

  return (
    <form className="block p-4">
      <FormControl id="name" className="pb-6">
        <Input placeholder="Name" variant="solid" />
      </FormControl>
      <FormControl id="surename" className="pb-6">
        <Input placeholder="Surename" variant="solid" />
      </FormControl>
      <FormControl id="email" className="pb-6">
        <Input placeholder="Email" variant="solid" />
      </FormControl>
      <FormControl id="phone" className="pb-6">
        <Input.Group>
          <Input.LeftAddon children="+xxx" />
          <Input placeholder="Phone Number" variant="solid" />
        </Input.Group>
      </FormControl>
      <div className="flex flex-row">
        <SelectDate dates={avaliable} />
      </div>
      <Button type="button" className="mr-3" onClick={formSubmit}>
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
