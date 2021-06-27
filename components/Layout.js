import { css } from '@emotion/react';
import Header from './Header';

// const containerStyles = css``;

export default function Layout(props) {
  return (
    <>
      <Header username={props.username} />
      <div>{props.children}</div>
      {/* <Footer /> */}
    </>
  );
}
