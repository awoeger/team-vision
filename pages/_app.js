import '../css/main.css';
import { css, Global } from '@emotion/react';
import Head from 'next/head';
import { darkBlue, normalText } from '../util/sharedStyles';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Global
        styles={css`
          *,
          *::after,
          *::before {
            box-sizing: border-box;
          }
          body {
            margin: 0;
            font-family: 'Barlow', sans-serif;
            font-size: ${normalText};
            color: ${darkBlue};
          }
          h1 {
            font-size: 5em;
            font-weight: 800;
            text-transform: uppercase;
            margin: 0px;
            color: white;
          }
          h2 {
            margin: 0px;
            font-weight: 600;
            font-size: 2em;
            color: white;
          }
        `}
      />
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
