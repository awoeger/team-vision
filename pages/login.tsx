import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Header from '../components/Header';
import { darkBlue, largeText, lightBlue } from '../util/sharedStyles';
import { LoginResponse } from './api/login';

// TODO: focus-visible on input fields

export const mainContainer = css`
  background-image: url(/images/background_blue_smoke.PNG);
  background-size: cover;
  background-repeat: no-repeat;
  height: 100vh;
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

    button {
      background-image: url(/images/button_background_lightBlue.PNG);
      background-repeat: no-repeat;
      background-size: cover;
      color: white;
      font-weight: bold;
      border: none;
      padding: 10px 20px;
      width: 100%;
      margin-bottom: 20px;
      cursor: pointer;
    }
  }
`;

export const mainSubContainer = css`
  padding: 30px;
  box-shadow: 10px 5px 5px ${darkBlue};
  border-radius: 20px;
  background-color: white;
  text-align: center;
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
`;

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  return (
    <>
      <Header />

      <Head>
        <title>Login</title>
      </Head>
      <div css={mainContainer}>
        <div css={mainSubContainer}>
          <h1>Login</h1>

          {/* Send username and password to the API for verification */}
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

              router.push(`/`);
            }}
          >
            <div>
              <label>
                Username
                <input
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
                  placeholder="*************"
                  value={password}
                  type="password"
                  onChange={(event) => {
                    setPassword(event.currentTarget.value);
                  }}
                />
              </label>
            </div>

            <button>LOGIN</button>
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
