import Link from 'next/link';
import * as FaIcons from 'react-icons/fa';
import { button, mainFirstSubContainer } from './CoachProfile';

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
      <div css={button}>
        <Link href="/profiles/player-request">
          <a>Join a new team</a>
        </Link>
      </div>
    </div>
  );
}
