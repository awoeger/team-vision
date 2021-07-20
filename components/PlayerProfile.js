/* eslint-disable @typescript-eslint/no-unnecessary-condition */

import { css } from '@emotion/react';
import Link from 'next/link';
import router from 'next/router';
import { useState } from 'react';
import * as BiIcons from 'react-icons/bi';
import * as BsIcons from 'react-icons/bs';
import * as FaIcons from 'react-icons/fa';
import * as GrIcons from 'react-icons/gr';
import { link } from '../util/sharedStyles';
import { editForm, mainFirstSubContainer } from './CoachProfile';

const buttonDiv = css`
  margin-top: 20px;
`;

export default function PlayerProfile(props) {
  const [showEdit, setShowEdit] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  return (
    <div css={mainFirstSubContainer}>
      <h1>Your Profile</h1>
      <FaIcons.FaRunning className="icon" />
      <h2>Welcome Player</h2>
      {!showEdit ? (
        <form css={editForm}>
          <div>
            <label>
              First Name:
              <input
                required
                maxLength={50}
                onChange={(event) => {
                  setFirstName(event.currentTarget.value);
                }}
                value={firstName}
                disabled={showEdit ? 'disabled' : ''}
              />
            </label>
          </div>
          <div>
            <label>
              Last Name:
              <input
                required
                maxLength={50}
                onChange={(event) => {
                  setLastName(event.currentTarget.value);
                }}
                value={lastName}
                disabled={showEdit ? 'disabled' : ''}
              />
            </label>
          </div>
          <div>
            <label>
              Username:
              <input
                required
                maxLength={50}
                onChange={(event) => {
                  setUsername(event.currentTarget.value);
                }}
                value={username}
                disabled={showEdit ? 'disabled' : ''}
              />
            </label>
          </div>
          <div>
            <label>
              Email:
              <input
                required
                maxLength={50}
                type="email"
                onChange={(event) => {
                  setEmail(event.currentTarget.value);
                }}
                value={email}
                disabled={showEdit ? 'disabled' : ''}
              />
            </label>
          </div>
        </form>
      ) : (
        <>
          <h3>
            {props.user.userFirstName} {props.user.userLastName}
          </h3>
          <p>
            <span>Username:</span> {props.user.username}
          </p>
          <p>
            <span>Email:</span> {props.user.userEmail}
          </p>
        </>
      )}

      <div>
        <button
          data-cy="user-edit-details-button"
          onClick={async () => {
            if (showEdit) {
              // This is to allow changes

              setShowEdit(false);
            } else {
              // This is to disable input and save changes
              setShowEdit(true);

              const response = await fetch(
                `/api/users-by-username/${props.user.username}`,
                {
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    userId: props.user.id,
                    firstName: firstName,
                    lastName: lastName,
                    username: username,
                    email: email,
                    // csrfToken: props.csrfToken,
                  }),
                },
              );
              await response.json();
            }
          }}
        >
          {showEdit ? (
            <GrIcons.GrEdit className="btn" />
          ) : (
            <BiIcons.BiSave className="btn" />
          )}
        </button>

        <button
          onClick={async (singleTeam) => {
            singleTeam.preventDefault();

            if (
              window.confirm('Are you sure you want to delete this profile?')
            ) {
              await fetch(`/api/users-by-username/${props.user?.username}`, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  id: props.user.id,
                }),
              });
            }
            router.push('/');
          }}
        >
          <BsIcons.BsTrashFill className="btn" />
        </button>
      </div>

      <div css={buttonDiv}>
        <Link href="/profiles/create-new-team">
          <a data-cy="create-new-team" css={link}>
            Create new team
          </a>
        </Link>
      </div>
    </div>
  );
}
