/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import Link from 'next/link';
import router from 'next/router';
import { useState } from 'react';
import * as BiIcons from 'react-icons/bi';
import * as BsIcons from 'react-icons/bs';
import * as FaIcons from 'react-icons/fa';
import * as GrIcons from 'react-icons/gr';
import { link } from '../util/sharedStyles';
import { buttonDiv, editForm, mainFirstSubContainer } from './CoachProfile';

export default function PlayerProfile(props) {
  const [showEdit, setShowEdit] = useState(true);
  const [firstName, setFirstName] = useState(props.user.userFirstName);
  const [lastName, setLastName] = useState(props.user.userLastName);
  const [username, setUsername] = useState(props.user.username);
  const [email, setEmail] = useState(props.user.userEmail);
  return (
    <div css={mainFirstSubContainer}>
      <h1>Your Profile</h1>
      <FaIcons.FaRunning className="icon" />

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
        <div className="profileSubDiv">
          <div className="welcomeDiv">
            <h2>Welcome Player</h2>
            <h3>
              {firstName} {lastName}
            </h3>
          </div>
          <div className="usernameDiv">
            <p>
              <span>Username:</span> {username}
            </p>
            <p>
              <span>Email:</span> {email}
            </p>
          </div>
        </div>
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
        <Link href="/profiles/player-request">
          <a data-cy="join-a-team" css={link}>
            JOIN A TEAM
          </a>
        </Link>
      </div>
    </div>
  );
}
