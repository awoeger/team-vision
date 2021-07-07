import { css } from '@emotion/react';
import Link from 'next/link';
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
      <FaIcons.FaRunning
        style={{
          color: 'white',
          background: '#1d2a48',
          borderRadius: '200px',
          padding: '20px',
        }}
        size={100}
      />
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
    </div>
  );
}
