import { css } from '@emotion/react';
import Link from 'next/link';
import router from 'next/router';
import * as BsIcons from 'react-icons/bs';
import * as FaIcons from 'react-icons/fa';
import { link } from '../util/sharedStyles';
import { mainFirstSubContainer } from './CoachProfile';

const buttonDiv = css`
  margin-top: 20px;
`;

export default function PlayerProfile(props) {
  return (
    <div css={mainFirstSubContainer}>
      <h1>Your Profile</h1>
      <FaIcons.FaRunning className="icon" />
      <h2>Welcome Player</h2>
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
        <Link href="/profiles/player-request">
          <a css={link}>Join a new team</a>
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
