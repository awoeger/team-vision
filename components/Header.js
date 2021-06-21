import { css } from '@emotion/react';
import Image from 'next/image';
import Link from 'next/link';
import { largeText } from '../util/sharedStyles';

const headerContainer = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;

  :first-child {
    display: flex;
    align-items: center;
  }

  span {
    text-transform: uppercase;
    font-size: ${largeText};
    font-weight: 600;
    margin-left: 50px;
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
              src="/images/logo_blue/logo_blue.png"
              width="50px"
              height="40px"
            />
          </a>
        </Link>
        <Link href="/create-new-team">
          <a>
            <span>Create new team</span>
          </a>
        </Link>
      </div>
      <div>
        <Link href="#about">
          <a>
            <span>About</span>
          </a>
        </Link>
        <Link href="#contact">
          <a>
            <span>Contact</span>
          </a>
        </Link>
        <Link href="/sign-in">
          <a>
            <span>Sign in</span>
          </a>
        </Link>
      </div>
    </div>
  );
}
