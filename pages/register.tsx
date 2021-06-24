import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Header from '../components/Header';

export default function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [roleId, setRoleId] = useState('1');
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

          router.push(`/registration-successful`);
        }}
      >
        <div>
          <label>
            First Name:
            <input
              value={firstName}
              onChange={(event) => {
                setFirstName(event.currentTarget.value);
              }}
            />
          </label>
        </div>

        <div>
          <label>
            Last Name:
            <input
              value={lastName}
              onChange={(event) => {
                setLastName(event.currentTarget.value);
              }}
            />
          </label>
        </div>

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
            Email:
            <input
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

        <div>
          <label>
            Role:
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

        <button>Create Account</button>
      </form>
    </>
  );
}
