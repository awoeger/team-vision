import { css } from '@emotion/react';
import Link from 'next/link';
import { darkBlue, largeText, normalText } from '../util/sharedStyles';

const headerContainer = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 35px 0;
  width: 100%;
  background-color: ${darkBlue};

  > div {
    display: flex;
    align-items: center;
  }

  a {
    text-decoration: none;
    color: white;
    text-transform: uppercase;
    font-size: ${largeText};
    font-weight: 600;
    cursor: pointer;
    margin-right: 30px;
    margin-left: 30px;

    ::after {
      content: '';
      display: block;
      width: 0;
      height: 3px;
      background: white;
      transition: width 0.4s;
    }

    :hover::after {
      width: 100%;
    }
  }

  @media (max-width: 768px) {
    a {
      font-size: 17px;
    }
  }
`;

export default function Header(props) {
  return (
    <div css={headerContainer}>
      <div>
        <Link href="/">
          <a>
            <span>Home</span>
          </a>
        </Link>
        <Link href="/#about">
          <a>
            <span>About</span>
          </a>
        </Link>
        <Link href="/#guide">
          <a>
            <span>Guide</span>
          </a>
        </Link>
        <Link href="/#contact">
          <a>
            <span>Contact</span>
          </a>
        </Link>
      </div>
      <div>
        {props.username ? (
          <Link href={`/profiles/${props.username}`}>
            <a>
              <span>{props.username && 'Your Profile'} &nbsp;</span>
            </a>
          </Link>
        ) : (
          <div />
        )}

        {props.username ? (
          <Link href="/logout">
            <a>
              <span>Logout</span>
            </a>
          </Link>
        ) : (
          <Link href="/login">
            <a>
              <span>Login</span>
            </a>
          </Link>
        )}
      </div>
    </div>
  );
}
