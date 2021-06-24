import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Header from '../components/Header';
import { LoginResponse } from './api/login';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  return (
    <>
      <Header />

      <Head>
        <title>Register</title>
      </Head>

      <h1>Register now</h1>

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
            Username:
            <input
              value={username}
              onChange={(event) => {
                setUsername(event.currentTarget.value);
              }}
            />
          </label>
        </div>

        <div>
          <label>
            Password:
            <input
              value={password}
              type="password"
              onChange={(event) => {
                setPassword(event.currentTarget.value);
              }}
            />
          </label>
        </div>

        <button>Login</button>
        <div style={{ color: 'red' }}>{error}</div>
      </form>
    </>
  );
}
