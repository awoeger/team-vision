import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { link } from '../util/sharedStyles';

const mainContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  h1,
  a {
    margin: 40px;
  }

  @media (max-width: 599px) {
    flex-direction: column;
    justify-content: center;
    text-align: center;
  }

  @media (max-width: 434px) {
    h1 {
      font-size: 1em;
    }
  }
`;

export default function NotFound() {
  return (
    <>
      <Head>
        <title>404 - Page not found</title>
      </Head>
      <div css={mainContainer}>
        <div>
          <h1>
            404 - Oops. It seems, you took a wrong turn. <br />
            This page does not exist.
          </h1>
          <Link href="/">
            <a css={link}> Go back to safety</a>
          </Link>
        </div>
        <div className="imageContainer">
          <Image
            alt="American Football Player standing"
            src="/images/football-player.jpg"
            width="700px"
            height="700px"
          />
        </div>
      </div>
    </>
  );
}
