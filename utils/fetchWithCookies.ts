async function fetchWithCookies(
  url: string,
  method: string,
  cookie: string | undefined = undefined
): Promise<Response> {
  const response = await fetch(
    `${url}`,
    !!cookie
      ? {
          method: method,
          headers: { cookie: cookie },
        }
      : {
          method: method,
          credentials: 'same-origin',
        }
  )
  return response
}

export default fetchWithCookies
