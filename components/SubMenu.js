import { css } from '@emotion/react';
import Link from 'next/link';
import { IconContext } from 'react-icons';
import * as AiIcons from 'react-icons/ai';
import * as FaIcons from 'react-icons/fa';
import * as IoIcons from 'react-icons/io';
import { darkBlue, largeText } from '../util/sharedStyles';

const navMenuActive = css`
  display: flex;
  justify-content: center;
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
    font-size: ${largeText};
    font-weight: 500;
    word-spacing: 3px;
    font-size: 18px;
    width: 95%;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 16px;
    border-radius: 4px;
  }
`;

const navMenuItems = css`
  width: 100%;
  padding-left: 0;
`;

export default function SubMenu(props) {
  console.log('submenu props', props);
  return (
    <IconContext.Provider value={{ color: '#1d2a48' }}>
      <nav css={navMenuActive}>
        <ul css={navMenuItems}>
          <li css={navText}>
            <AiIcons.AiFillHome />
            <Link href={`/teams/${props.teamId}`}>
              <a>TEAM BASE</a>
            </Link>
          </li>
          {props.userRoleId === 1 ? (
            <>
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
            </>
          ) : undefined}

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
