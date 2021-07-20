import { css } from '@emotion/react';
import Link from 'next/link';
import { useState } from 'react';
import { darkBlue, largeText, normalText } from '../util/sharedStyles';
import HeaderBurger from './HeaderBurger';
import HeaderLeftNav from './HeaderLeftNav';

const headerContainer = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: ${darkBlue};

  .icon {
    color: white;
    min-width: 30px;
    min-height: 30px;
  }

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

    span {
      padding-bottom: 16px;
    }
  }

  @media (max-width: 1024px) {
    a {
      font-size: 20px;
    }
  }

  @media (max-width: 958px) {
    a {
      font-size: ${normalText};
    }
  }

  @media (max-width: 924px) {
    flex-direction: row-reverse;
    a {
      font-size: 20px;
      padding: 20px;
      margin: 0;
    }
  }
`;

export default function Header(props) {
  const [open, setOpen] = useState(false);

  return (
    <div css={headerContainer}>
      <HeaderLeftNav
        shoppingCart={props.shoppingCart}
        setShoppingCart={props.setShoppingCart}
        open={open}
      />
      <HeaderBurger open={open} setOpen={setOpen} />
      <div>
        {props.username ? (
          <Link href={`/profiles/${props.username}`}>
            <a data-cy="your-profile">
              <span>{props.username && 'Your Profile'} &nbsp;</span>
            </a>
          </Link>
        ) : (
          <div />
        )}

        {props.username ? (
          <Link href="/logout">
            <a data-cy="header-logout-link">
              <span>Logout</span>
            </a>
          </Link>
        ) : (
          <Link href="/login">
            <a data-cy="header-login-link">
              <span>Login</span>
            </a>
          </Link>
        )}
      </div>
    </div>
  );
}
