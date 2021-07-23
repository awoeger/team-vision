import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Layout from '../components/Layout';
import { getValidSessionByToken } from '../util/database';
import { button, darkBlue, largeText, lightBlue } from '../util/sharedStyles';
import { LoginResponse } from './api/login';

export const mainContainer = css`
  background-image: url(/images/background_blue_smoke.PNG);
  background-size: cover;
  background-repeat: no-repeat;
  height: 90vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  div {
    h1 {
      color: ${darkBlue};
      font-size: ${largeText};
      padding: 20px;
    }

    label {
      display: flex;
      flex-direction: column;
      text-align: left;
      color: ${darkBlue};
      font-weight: 500;

      input {
        margin: 5px 0 20px 0;
        width: 100%;
        padding: 5px;

        :focus {
          border: 2px solid ${lightBlue};
        }
      }
    }
  }
  /*
  @media (max-width: 476px) {
    form {
      width: 60%;
    }
  } */
`;

export const mainSubContainer = css`
  padding: 30px;
  box-shadow: 10px 5px 5px ${darkBlue};
  border-radius: 20px;
  background-color: white;
  text-align: center;

  @media (max-width: 476px) {
    width: 70%;
  }
`;

const registerDiv = css`
  border-top: 1px solid ${lightBlue};
  width: 343px;

  p {
    margin-bottom: 0;
  }

  a {
    color: ${lightBlue};
    font-weight: bold;
    margin-top: 0;
  }

  @media (max-width: 476px) {
    width: 100%;
  }
`;

type Props = {
  refreshUsername: () => void;
  username?: string;
};

export default function Login(props: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  return (
    <>
      <Layout username={props.username} />

      <Head>
        <title>Team Vision - Login</title>
      </Head>
      <div css={mainContainer}>
        <div css={mainSubContainer}>
          <h1>Login</h1>

          <form
            onSubmit={async (event) => {
              event.preventDefault();
              const response = await fetch(`/api/login`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  username: username,
                  password: password,
                }),
              });

              const json = (await response.json()) as LoginResponse;

              if ('errors' in json) {
                setError(json.errors[0].message);
                return;
              }

              props.refreshUsername();

              router.push(`/profiles/${json.user.username}`);
            }}
          >
            <div>
              <label>
                Username
                <input
                  data-cy="login-username"
                  required
                  name="username"
                  placeholder="Karl Karlson"
                  value={username}
                  onChange={(event) => {
                    setUsername(event.currentTarget.value);
                  }}
                />
              </label>
            </div>

            <div>
              <label>
                Password
                <input
                  data-cy="login-password"
                  required
                  name="password"
                  placeholder="*************"
                  value={password}
                  type="password"
                  onChange={(event) => {
                    setPassword(event.currentTarget.value);
                  }}
                />
              </label>
            </div>

            <button data-cy="login-button" css={button}>
              LOGIN
            </button>
            <div style={{ color: 'red' }}>{error}</div>
            <div />
            <div css={registerDiv}>
              <p>You don't have an account yet?</p>
              <p>
                <Link href="/register">
                  <a>Register now</a>
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // Redirect from HTTP to HTTPS on Heroku
  if (
    context.req.headers.host &&
    context.req.headers['x-forwarded-proto'] &&
    context.req.headers['x-forwarded-proto'] !== 'https'
  ) {
    return {
      redirect: {
        destination: `https://${context.req.headers.host}/login`,
        permanent: true,
      },
    };
  }

  // get session Token
  const sessionToken = context.req.cookies.sessionToken;

  // Pass the session token and check if it is a valid
  const session = await getValidSessionByToken(sessionToken);

  if (session) {
    // if the session is undefined, we allow the person to log in
    // because they don't have a valid session
    // but if they DO have a valid session,
    // we redirect them
    // token by returning an object with the `redirect` prop
    // https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering
    return {
      redirect: {
        destination: `/`,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
