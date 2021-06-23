import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/Header';

const mainContainer = css`
  background-image: url(/images/background_blue_smoke.PNG);
  background-size: cover;
  background-repeat: no-repeat;
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  a {
    color: white;
  }
`;

export default function RegistrationSuccessful() {
  return (
    <>
      <Head>
        <title>Registration Successful</title>
      </Head>
      <Header />
      <div css={mainContainer}>
        <h2>
          Congratulations!
          <br />
          Your account has been successfully created.
          <br />
          Please{' '}
          <Link href="/sign-in">
            <a>sign in</a>
          </Link>{' '}
          now.
        </h2>
      </div>
    </>
  );
}
