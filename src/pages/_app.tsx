import type { AppProps } from 'next/app'

import { SWRConfig } from 'swr'
import '@styles/globals.css'
import '@styles/leaflet.css'

import GoogleAnalytics from '@components/googleAnalytics'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        revalidateOnReconnect: false,
        revalidateOnFocus: false,
      }}
    >
      <GoogleAnalytics />
      <Component {...pageProps} />
    </SWRConfig>
  )
}

export default MyApp
