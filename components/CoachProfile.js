import { css } from '@emotion/react';
import Link from 'next/link';
import router from 'next/router';
import * as BsIcons from 'react-icons/bs';
import * as GiIcons from 'react-icons/gi';
import {
  darkBlue,
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
    margin: 40px;

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

const buttonDiv = css`
  margin-top: 20px;
`;

export default function CoachProfile(props) {
  console.log('profile props', props);
  return (
    <div css={mainFirstSubContainer}>
      <h1>Your Profile</h1>
      <GiIcons.GiWhistle className="icon" />
      <h2>Welcome Coach</h2>
      <h3>
        {props.user.userFirstName} {props.user.userLastName}
      </h3>
      <p>
        <span>Username:</span> {props.user.username}
      </p>
      <p>
        <span>Email:</span> {props.user.userEmail}
      </p>
      <div css={buttonDiv}>
        <Link href="/profiles/create-new-team">
          <a data-cy="create-new-team" css={link}>
            Create new team
          </a>
        </Link>
      </div>

      <button
        onClick={async (singleTeam) => {
          singleTeam.preventDefault();

          if (window.confirm('Are you sure you want to delete this profile?')) {
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
  );
}
