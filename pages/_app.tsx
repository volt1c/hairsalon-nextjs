import '@styles/globals.scss'

import type { AppProps } from 'next/app'
import {
  extendTheme,
  colors,
  ColorScheme,
  VechaiProvider,
} from '@vechaiui/react'

const dark: ColorScheme = {
  id: 'dark',
  type: 'dark',
  colors: {
    bg: {
      base: colors.coolGray['900'],
      fill: colors.coolGray['800'],
    },
    text: {
      foreground: colors.coolGray['100'],
      muted: colors.coolGray['300'],
    },
    primary: colors.cyan,
    neutral: colors.coolGray,
  },
}
const light: ColorScheme = {
  id: 'light',
  type: 'light',
  colors: {
    bg: {
      base: colors.gray['800'],
      fill: colors.gray['900'],
    },
    text: {
      foreground: colors.gray['100'],
      muted: colors.gray['300'],
    },
    primary: colors.teal,
    neutral: colors.gray,
  },
}

const theme = extendTheme({
  cursor: 'pointer',
  colorSchemes: {
    light,
    dark,
  },
})

function App({ Component, pageProps }: AppProps) {
  return (
    <VechaiProvider theme={theme} colorScheme="dark">
      <Component {...pageProps} />
    </VechaiProvider>
  )
}

export default App
