import { css } from '@emotion/react';
import Image from 'next/image';
import Link from 'next/link';
import { darkBlue, largeText } from '../util/sharedStyles';

// TODO: sticky header on index.js but not the other pages

const headerContainer = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  width: 100%;
  background-color: ${darkBlue};
  /* position: fixed;
  z-index: 1; */

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
  }
`;

const link = css`
  margin-left: 50px;
`;

export default function Header(props) {
  return (
    <div css={headerContainer}>
      <div>
        <Link href="/">
          <a>
            <Image
              alt="Logo Icon"
              src="/images/logo_white/teamvision_icon.png"
              width="50px"
              height="50px"
            />
          </a>
        </Link>
        <Link href="/#about">
          <a css={link}>
            <span>About</span>
          </a>
        </Link>
        <Link href="/#guide">
          <a css={link}>
            <span>Guide</span>
          </a>
        </Link>
        <Link href="/#contact">
          <a css={link}>
            <span>Contact</span>
          </a>
        </Link>
      </div>
      <div>
        {props.username ? (
          <Link href={`/profiles/${props.username}`}>
            <a css={link}>{props.username && 'Your Profile'} &nbsp;</a>
          </Link>
        ) : (
          <div />
        )}

        {props.username ? (
          <Link href="/logout">
            <a css={link}>Logout</a>
          </Link>
        ) : (
          <Link href="/login">
            <a css={link}>Login</a>
          </Link>
        )}
      </div>
    </div>
  );
}
