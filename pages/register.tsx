import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Header from '../components/Header';
import Layout from '../components/Layout';
import { getValidSessionByToken } from '../util/database';
// import { darkBlue, largeText, lightBlue } from '../util/sharedStyles';
import { mainContainer, mainSubContainer } from './login';

type Props = {
  refreshUsername: () => void;
  username?: string;
};
export default function Register(props: Props) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [roleId, setRoleId] = useState('1');
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

  const registerButton = css``;

  return (
    <>
      <Head>
        <title>Register</title>
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
                  firstName: firstName,
                  lastName: lastName,
                  username: username,
                  password: password,
                  email: email,
                  roleId: Number(roleId),
                }),
              });

              const { user: createdUser } = await response.json();

              props.refreshUsername();

              router.push(`/registration-successful`);
            }}
          >
            <div css={namesDiv}>
              <div css={firstNameDiv}>
                <label>
                  First Name
                  <input
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

            <button css={registerButton}>CREATE ACCOUNT</button>
          </form>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // // Redirect from HTTP to HTTPS on Heroku
  // if (
  //   context.req.headers.host &&
  //   context.req.headers['x-forwarded-proto'] &&
  //   context.req.headers['x-forwarded-proto'] !== 'https'
  // ) {
  //   return {
  //     redirect: {
  //       destination: `https://${context.req.headers.host}/login`,
  //       permanent: true,
  //     },
  //   };
  // }

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
        // TODO: Where do I want to redirect the user if the are already logged in and they go to registration page?
        destination: `/`,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
