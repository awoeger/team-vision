import { css } from '@emotion/react';
import cookie from 'cookie';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useEffect } from 'react';
import Layout from '../components/Layout';
import { deleteSessionByToken } from '../util/database';
import { mainContainer } from './login';

type Props = {
  refreshUsername: () => void;
  username?: string;
};

const heading = css`
  color: white;

  @media (max-width: 472px) {
    padding: 0 20px;
  }
`;

export default function Logout(props: Props) {
  useEffect(() => props.refreshUsername(), [props]);
  return (
    <>
      <Head>
        <title>Team Vision - Logout Successful</title>
      </Head>
      <Layout username={props.username} />
      <div css={mainContainer}>
        <h2 css={heading}>You have been successfully logged out.</h2>
      </div>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const sessionToken = context.req.cookies.sessionToken;

  if (sessionToken) {
    await deleteSessionByToken(sessionToken);
  }
  // Note: if you want to redirect the user when they have no session
  // token, you could return an object with the `redirect` prop
  // https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering

  // Instruct the browser to delete the cookie
  context.res.setHeader(
    'Set-Cookie',
    cookie.serialize('sessionToken', '', {
      maxAge: -1,
      path: '/',
    }),
  );

  return {
    props: {},
  };
}
