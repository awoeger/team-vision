import { css } from '@emotion/react';
// eslint-disable-next-line unicorn/prefer-node-protocol
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Layout from '../components/Layout';
import { generateCsrfSecretByToken } from '../util/auth';
import { getValidSessionByToken } from '../util/database';
import { button } from '../util/sharedStyles';
import { RegisterResponse } from './api/register';
import { mainContainer, mainSubContainer } from './login';

type Props = {
  refreshUsername: () => void;
  username?: string;
  csrfToken: string;
};
export default function Register(props: Props) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [roleId, setRoleId] = useState('1');
  const [error, setError] = useState('');
  const router = useRouter();

  const namesDiv = css`
    display: flex;

    div {
      width: 50%;
    }
  `;

  const firstNameDiv = css`
    margin-right: 20px;
  `;

  const label = css`
    select {
      padding: 5px 0;
      margin: 5px 0 20px 0;
    }
  `;

  return (
    <>
      <Head>
        <title>Team Vision - Register</title>
      </Head>
      <Layout username={props.username} />
      <div css={mainContainer}>
        <div css={mainSubContainer}>
          <h1>REGISTER</h1>

          <form
            onSubmit={async (event) => {
              event.preventDefault();
              const response = await fetch(`/api/register`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  userFirstName: firstName,
                  userLastName: lastName,
                  username: username,
                  password: password,
                  userEmail: email,
                  userRoleId: Number(roleId),
                  csrfToken: props.csrfToken,
                }),
              });

              const json = (await response.json()) as RegisterResponse;

              if ('errors' in json) {
                setError(json.errors[0].message);
                return;
              }

              props.refreshUsername();

              router.push(`/registration-successful`);
            }}
          >
            <div css={namesDiv}>
              <div css={firstNameDiv}>
                <label>
                  First Name
                  <input
                    data-cy="registration-first-name"
                    required
                    maxLength={50}
                    placeholder="Karl"
                    value={firstName}
                    onChange={(event) => {
                      setFirstName(event.currentTarget.value);
                    }}
                  />
                </label>
              </div>

              <div>
                <label>
                  Last Name
                  <input
                    data-cy="registration-last-name"
                    required
                    maxLength={50}
                    placeholder="Karlson"
                    value={lastName}
                    onChange={(event) => {
                      setLastName(event.currentTarget.value);
                    }}
                  />
                </label>
              </div>
            </div>

            <div>
              <label>
                Username
                <input
                  data-cy="registration-username"
                  required
                  maxLength={50}
                  placeholder="Karl_the_Lama"
                  value={username}
                  onChange={(event) => {
                    setUsername(event.currentTarget.value);
                  }}
                />
              </label>
            </div>

            <div>
              <label>
                Email
                <input
                  data-cy="registration-email"
                  required
                  maxLength={50}
                  placeholder="karl@karlson.com"
                  value={email}
                  type="email"
                  onChange={(event) => {
                    setEmail(event.currentTarget.value);
                  }}
                />
              </label>
            </div>

            <div>
              <label>
                Password
                <input
                  data-cy="registration-password"
                  required
                  minLength={4}
                  placeholder="***********"
                  value={password}
                  type="password"
                  onChange={(event) => {
                    setPassword(event.currentTarget.value);
                  }}
                />
              </label>
            </div>

            <div>
              <label css={label}>
                Role
                <select
                  data-cy="registration-role-coach"
                  id="role"
                  value={roleId}
                  onChange={(event) => {
                    setRoleId(event.currentTarget.value);
                  }}
                >
                  <option value="1">Coach</option>
                  <option value="2">Player</option>
                </select>
              </label>
            </div>

            <button data-cy="registration-create-account" css={button}>
              CREATE ACCOUNT
            </button>

            <div style={{ color: 'red' }}>{error}</div>
          </form>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // Redirect from HTTP to HTTPS on Heroku
  // if there is http, the cookies won't work
  if (
    context.req.headers.host &&
    context.req.headers['x-forwarded-proto'] &&
    context.req.headers['x-forwarded-proto'] !== 'https'
  ) {
    return {
      redirect: {
        destination: `https://${context.req.headers.host}/register`,
        permanent: true,
      },
    };
  }

  // eslint-disable-next-line unicorn/prefer-node-protocol
  const crypto = await import('crypto');
  const { createSerializedRegisterSessionTokenCookie } = await import(
    '../util/cookies'
  );

  const { insertFiveMinuteSessionWithoutUserId, deleteExpiredSessions } =
    await import('../util/database');

  // Import and initialize the `csrf` library
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const Tokens = await (await import('csrf')).default;
  const tokens = new Tokens();

  // Get session information if user is already logged in
  const sessionToken = context.req.cookies.sessionToken;

  const session = await getValidSessionByToken(sessionToken);
  if (session) {
    // Redirect the user when they have a session
    // token by returning an object with the `redirect` prop
    // https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering
    return {
      redirect: {
        destination: `/`,
        permanent: false,
      },
    };
  }

  await deleteExpiredSessions();

  // Generate 5-minute short-lived session, only for the registration
  const shortLivedSession = await insertFiveMinuteSessionWithoutUserId(
    crypto.randomBytes(64).toString('base64'),
  );

  // Set new cookie for the short-lived session
  // This cookie is only for the registration, it will expire after 5 minutes
  const cookie = createSerializedRegisterSessionTokenCookie(
    shortLivedSession.token,
  );
  context.res.setHeader('Set-Cookie', cookie);

  // Use token from short-lived session to generate
  // secret for the CSRF token
  const csrfSecret = generateCsrfSecretByToken(shortLivedSession.token);

  // Create CSRF token
  const csrfToken = tokens.create(csrfSecret);

  return {
    props: {
      // Pass CSRF Token via props
      csrfToken,
    },
  };
}
