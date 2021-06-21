import { css } from '@emotion/react';
import Image from 'next/image';
import React from 'react';
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
        <Image
          alt="Logo Icon"
          src="/images/logo_blue/logo_blue.png"
          width="50px"
          height="40px"
        />
        <span>Create new team</span>
      </div>
      <div>
        <span>About</span>
        <span>Contact</span>
        <span>Sign in</span>
      </div>
    </div>
  );
}
