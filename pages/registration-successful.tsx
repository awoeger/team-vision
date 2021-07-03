import { css } from '@emotion/react';
import Head from 'next/head';
import Layout from '../components/Layout';

const mainContainer = css`
  background-image: url(/images/background_blue_smoke.PNG);
  background-size: cover;
  background-repeat: no-repeat;
  height: 90vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  h2 {
    color: white;
  }

  a {
    color: white;
  }
`;

type Props = {
  username: String;
};

export default function RegistrationSuccessful(props: Props) {
  return (
    <>
      <Head>
        <title>Registration Successful</title>
      </Head>
      <Layout username={props.username} />
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
