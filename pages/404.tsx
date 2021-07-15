import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { link } from '../util/sharedStyles';

const mainContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;

  h1,
  a {
    margin: 40px;
  }

  @media (max-width: 1024px) {
    margin-top: 50px;
  }

  @media (max-width: 768px) {
    margin-top: 150px;
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
        <div>
          <Image
            alt="American Football Player standing"
            src="/images/football-player.jpg"
            width="800px"
            height="800px"
          />
        </div>
      </div>
    </>
  );
}
