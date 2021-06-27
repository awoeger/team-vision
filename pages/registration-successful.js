import { css } from '@emotion/react';
import Head from 'next/head';
import Layout from '../components/Layout';

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
      <Layout />
      <div css={mainContainer}>
        <h2>
          Congratulations!
          <br />
          Your account has been successfully created.
          <br />
          You are logged in now.
        </h2>
      </div>
    </>
  );
}
