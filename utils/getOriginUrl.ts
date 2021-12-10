import { IncomingMessage } from 'http'

function getOriginUrl(req: IncomingMessage) {
  let baseUrl: string
  if (req) {
    // Server side rendering
    baseUrl = 'http://' + req.headers.host
  } else {
    // Client side rendering
    baseUrl =
      window.location.protocol +
      '//' +
      window.location.hostname +
      (window.location.port ? ':' + window.location.port : '')
  }
  return baseUrl
}

export default getOriginUrl
