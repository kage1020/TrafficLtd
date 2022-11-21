import { Html, Head, Main, NextScript } from 'next/document'

const TrafficLtd = () => {
  return (
    <Html lang='ja' className='font-gothic'>
      <Head>
        <link
          href='https://fonts.googleapis.com/css2?family=Noto+Sans+JP&display=swap'
          rel='stylesheet'
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap'
          rel='stylesheet'
        />
      </Head>
      <body>
        <Main />
        <NextScript />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          `,
          }}
        />
      </body>
    </Html>
  )
}

export default TrafficLtd
