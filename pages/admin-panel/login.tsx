import AdminPanelLayout from '@layouts/AdminPanelLayout'
import { Button } from '@vechaiui/button'
import {
  FormControl,
  FormLabel,
  Input,
  RequiredIndicator,
} from '@vechaiui/forms'
import { FormErrorMessage } from '@vechaiui/react'
import { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import { useForm } from 'react-hook-form'

const IndexPage: NextPage = () => {
  const [loading, setLoading] = React.useState(false)
  const [showPassword, setShowPassword] = React.useState(false)
  const handleToggleShowPassword = () => setShowPassword(!showPassword)

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm()

  const onSubmit = async (data: any) => {
    setLoading(true)
    setTimeout(() => {
      alert(JSON.stringify(data))
      setLoading(false)
    }, 500)
  }

  return (
    <>
      <Head>
        <title>Admin Panel - Login</title>
      </Head>

      <form className="m-auto w-1/2 h-1/2">
        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input type="text" />
        </FormControl>
        <FormControl invalid={Boolean(errors.password)}>
          <FormLabel>Password</FormLabel>
          <Input.Group>
            <Input
              className="pr-16"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter password"
              {...register('password', { required: true })}
            />
            <Input.RightElement className="w-16">
              <Button
                type="button"
                size="xs"
                variant="solid"
                onClick={handleToggleShowPassword}
              >
                {showPassword ? 'Hide' : 'Show'}
              </Button>
            </Input.RightElement>
          </Input.Group>
          {errors.password && errors.password.type === 'required' && (
            <FormErrorMessage>Password is required</FormErrorMessage>
          )}
        </FormControl>
        <Button type="button" variant="solid">
          LogIn
        </Button>
      </form>
    </>
  )
}

export default IndexPage
