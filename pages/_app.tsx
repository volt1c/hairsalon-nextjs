import '@styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '@layouts/default'

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default App
