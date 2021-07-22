import { css } from '@emotion/react';
import Link from 'next/link';
import { darkBlue } from '../util/sharedStyles';

const navBarContainer = (open) => css`
  /* selects the ul */
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  z-index: 1200;

  padding: 16px 0 16px 0;

  a {
    text-decoration: none;
    color: white;

    @media (max-width: 924px) {
      padding-bottom: 16px;
    }
  }

  @media (max-width: 924px) {
    flex-flow: column nowrap;
    background-color: ${darkBlue};
    position: fixed;
    top: 0;
    left: -200px;
    height: 100vh;
    width: 200px;
    margin-top: 0;
    padding-top: 3rem;
    transform: ${open ? 'translateX(0)' : 'translateX(100%)'};
    transition: transform 0.3s ease-in-out;
  }
`;

export default function HeaderLeftNav(props) {
  return (
    <ul css={navBarContainer(props.open)}>
      <Link href="/">
        <a>
          <li>Home</li>
        </a>
      </Link>
      <Link href="/#about">
        <a data-cy="header-about-link">
          <li>About</li>
        </a>
      </Link>
      <Link href="/#guide">
        <a data-cy="header-guide-link">
          <li>Guide</li>
        </a>
      </Link>
    </ul>
  );
}
