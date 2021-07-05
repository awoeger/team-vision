import { css } from '@emotion/react';
import Link from 'next/link';
import * as GiIcons from 'react-icons/gi';
import { darkBlue, lightGrey, normalText } from '../util/sharedStyles';

export const button = css`
  background-image: url('/images/button_background_lightBlue.PNG');
  background-size: cover;
  background-repeat: no-repeat;
  padding: 10px 15px;
  text-decoration: none;
  text-transform: uppercase;
  font-weight: 500;
  margin-top: 20px;

  a {
    color: white;
    text-decoration: none;
    font-weight: 500;
  }
`;

export const mainFirstSubContainer = css`
  position: static;
  width: 25%;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${lightGrey};
  border-right: 2px solid ${darkBlue};

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
`;

export default function CoachProfile(props) {
  return (
    <div css={mainFirstSubContainer}>
      <h1>Your Profile</h1>
      <GiIcons.GiWhistle
        style={{
          color: 'white',
          background: '#1d2a48',
          borderRadius: '200px',
          padding: '20px',
        }}
        size={100}
      />
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
      <div css={button}>
        <Link href="/profiles/create-new-team">
          <a>Create new team</a>
        </Link>
      </div>
    </div>
  );
}
