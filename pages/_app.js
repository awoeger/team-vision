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
            width: 100vw;
            height: 100vh;
          }
          h1 {
            font-size: 4em;
            font-weight: 800;
            text-transform: uppercase;
            margin: 0px;
          }
          h2 {
            margin: 0px;
            font-weight: 600;
            font-size: 1.5em;
          }
        `}
      />

      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
