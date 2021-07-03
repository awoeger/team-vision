import { css } from '@emotion/react';
import Link from 'next/link';
import { useState } from 'react';
import { IconContext } from 'react-icons';
import * as AiIcons from 'react-icons/ai';
import * as FaIcons from 'react-icons/fa';
import * as IoIcons from 'react-icons/io';
import { darkBlue, lightBlue, lightPink } from '../util/sharedStyles';

const navBar = css`
  /* background-image: url('/images/button_background_lightBlue.PNG');
  background-repeat: no-repeat;
  background-size: cover; */
  height: 80px;
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100px;
  background-color: ${lightPink};

  button {
    margin-left: 20px;
    background: none;
    border: none;
  }
`;

const menuBars = css`
  margin-left: 2rem;
  font-size: 2rem;
  background: ${lightBlue};
`;

const navMenu = css`
  background: ${lightPink};
  width: 300px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  /* top: 0;
  left: -100%; */
  transition: 850ms;
`;

const navMenuActive = css`
  left: 0;
  transition: 350ms;
`;

const navText = css`
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 8px 0px 8px 30px;
  list-style: none;
  height: 60px;

  a {
    text-decoration: none;
    color: ${darkBlue};
    font-weight: 500;
    word-spacing: 3px;
    font-size: 18px;
    width: 95%;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 16px;
    border-radius: 4px;

    a:hover {
      background-color: blue;
    }
  }
`;

const navMenuItems = css`
  width: 100%;
  padding-left: 0;
`;

// const navBarToggles = css`
//   background-color: ${lightBlue};
//   width: 100%;
//   height: 80px;
//   display: flex;
//   justify-content: start;
//   align-items: center;
// `;

export default function SubMenu(props) {
  const [sideBar, setSideBar] = useState(false);

  const showSideBar = () => setSideBar(!sideBar);

  return (
    <IconContext.Provider value={{ color: '#1d2a48' }}>
      <div css={navBar}>
        <button>
          <FaIcons.FaBars onClick={showSideBar} />
        </button>
      </div>

      <nav css={sideBar ? navMenuActive : navMenu}>
        <ul css={navMenuItems}>
          {/* <li css={navBarToggles}>
            <Link href="#about" css={menuBars}>
              <a>
                <AiIcons.AiOutlineClose onClick={showSideBar} />
              </a>
            </Link>
          </li> */}
          <li css={navText}>
            <AiIcons.AiFillHome />
            <Link href={`/teams/${props.teamId}`}>
              <a>TEAM BASE</a>
            </Link>
          </li>
          <li css={navText}>
            <IoIcons.IoMdPeople />
            <Link href={`/teams/${props.teamId}/team-members`}>
              <a>TEAM MEMBERS</a>
            </Link>
          </li>
          <li css={navText}>
            <AiIcons.AiOutlineCalendar />
            <Link href={`/teams/${props.teamId}/create-new-event`}>
              <a>CREATE EVENT</a>
            </Link>
          </li>
          <li css={navText}>
            <FaIcons.FaRunning />
            <Link href={`/teams/${props.teamId}/exercises`}>
              <a>EXERCISES</a>
            </Link>
          </li>
          <li css={navText}>
            <IoIcons.IoMdSettings />
            <Link href={`/teams/${props.teamId}/team-settings`}>
              <a>TEAM SETTINGS</a>
            </Link>
          </li>
        </ul>
      </nav>
    </IconContext.Provider>
  );
}
