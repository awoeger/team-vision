import { css } from '@emotion/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Header from '../components/Header';
// import { darkBlue, largeText, lightBlue } from '../util/sharedStyles';
import { mainContainer, mainSubContainer } from './login';

export default function Register() {
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
      <Header />

      <Head>
        <title>Register</title>
      </Head>
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
