import { Button } from '@vechaiui/react'
import { useSession, signIn, signOut } from 'next-auth/react'
import { MouseEventHandler } from 'react'

export default function AuthButton() {
  const { data: session } = useSession()
  const createButton = (value: string, onClick: MouseEventHandler) => (
    <Button className="my-auto mx-3" variant="outline" onClick={onClick}>
      {value}
    </Button>
  )

  if (session && session.user) {
    return (
      <div className="flex flex-row h-full">
        <span className="m-auto mx-3">Signed in as {session.user.name}</span>
        {createButton('Sign out', () => signOut())}
      </div>
    )
  }
  return (
    <div>
      Not signed in
      {createButton('Sign in', () => signIn())}
    </div>
  )
}
