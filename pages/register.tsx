import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Header from '../components/Header';

export default function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
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
              password: password,
              email: email,
              role: role,
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
              value={role}
              onChange={(event) => {
                setRole(event.currentTarget.value);
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
