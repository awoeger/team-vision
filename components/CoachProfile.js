/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { css } from '@emotion/react';
import Link from 'next/link';
import router from 'next/router';
import { useState } from 'react';
import * as BiIcons from 'react-icons/bi';
import * as BsIcons from 'react-icons/bs';
import * as GiIcons from 'react-icons/gi';
import * as GrIcons from 'react-icons/gr';
import {
  darkBlue,
  largeText,
  lightBlue,
  lightGrey,
  link,
  normalText,
  orange,
} from '../util/sharedStyles';

export const mainFirstSubContainer = css`
  position: static;
  width: 25%;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${lightGrey};
  border-right: 2px solid ${darkBlue};
  text-align: center;

  button {
    padding: 10px;
    color: ${orange};
    background: rgba(255, 255, 255, 0.7);
    border-radius: 90%;
    border: none;
    cursor: pointer;
    margin: 20px;

    :hover {
      background: white;
    }

    :active {
      transform: translate(0, 3px);
    }

    .btn {
      width: 20px;
      height: 20px;
    }
  }

  .icon {
    background: ${orange};
    border-radius: 200px;
    padding: 20px;
    width: 100px;
    height: 100px;
    color: white;
  }

  h1 {
    font-size: 1.5em;
    margin: 40px 0 40px 0;
  }

  h2 {
    font-size: ${normalText};
    margin-top: 60px;
    font-weight: 600;
  }

  h3 {
    font-size: ${normalText};
    margin-bottom: 40px;
    font-weight: 600;
  }

  p {
    font-size: ${normalText};
    margin: 10px 0;

    span {
      font-weight: 600;
    }
  }

  @media (max-width: 1024px) {
    width: 35%;
  }

  @media (max-width: 768px) {
    width: 40%;
    padding: 10px;

    h1 {
      font-size: 1.2em;
    }

    .whistleIcon {
      width: 80px;
      height: 80px;
    }
  }
`;

export const editForm = css`
  margin-top: 20px;

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
`;

const buttonDiv = css`
  margin-top: 20px;
`;

export default function CoachProfile(props) {
  const [showEdit, setShowEdit] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  return (
    <div css={mainFirstSubContainer}>
      <h1>Your Profile</h1>
      <GiIcons.GiWhistle className="icon" />
      <h2>Welcome Coach</h2>
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
