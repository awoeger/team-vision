import { css } from '@emotion/react';
import Head from 'next/head';
import Layout from '../components/Layout';
import { extralargeText } from '../util/sharedStyles';

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

  @media (min-width: 1441px) {
    h2 {
      font-size: ${extralargeText};
    }
  }
`;

type Props = {
  username: String;
};

export default function RegistrationSuccessful(props: Props) {
  return (
    <>
      <Head>
        <title>Team Vision - Registration Successful</title>
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
