import { css } from '@emotion/react';
import Image from 'next/image';
import Link from 'next/link';
import { darkBlue, largeText } from '../util/sharedStyles';

const headerContainer = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  width: 100%;
  background-color: ${darkBlue};
  position: fixed;
  z-index: 1;

  > div {
    display: flex;
    align-items: center;
  }

  span {
    text-transform: uppercase;
    font-size: ${largeText};
    font-weight: 600;
    margin-left: 50px;
  }

  a {
    text-decoration: none;
    color: white;
  }
`;

export default function Header() {
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
        <Link href="/login">
          <a>
            <span>LOGIN</span>
          </a>
        </Link>
      </div>
    </div>
  );
}
