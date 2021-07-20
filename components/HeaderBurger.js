import { css } from '@emotion/react';

const burgerStyle = (open) => css`
  width: 2rem;
  height: 2rem;
  position: fixed;
  top: 20px;
  left: 24px;
  display: flex;
  justify-content: space-around;
  z-index: 1300;
  display: none;

  @media (min-width: 925px) {
    div {
      display: none;
    }
  }

  @media (max-width: 924px) {
    display: flex;
    justify-content: space-around;
    flex-flow: column nowrap;
  }

  div {
    width: 2rem;
    height: 0.25rem;
    background-color: ${open ? 'white' : 'white'};
    border-radius: 12px;
    transform-origin: 1px;
    transition: all 0.3s linear;

    &:nth-type(1) {
      transform: ${open ? 'rotate(45deg)' : 'rotate(0deg)'};
    }

    &:nth-type(2) {
      transform: ${open ? 'translateX(100%)' : 'translateX(0)'};
      opacity: ${open ? 0 : 1};
    }

    &:nth-type(3) {
      transform: ${open ? 'rotate(-45deg)' : 'rotate(0deg)'};
    }
  }
`;

export default function HeaderBurger(props) {
  return (
    <div
      css={burgerStyle(props.open)}
      onClick={() => props.setOpen(!props.open)}
      onKeyDown={() => props.setOpen(!props.open)}
      role="button"
      tabIndex={0}
    >
      <div />
      <div />
      <div />
    </div>
  );
}
