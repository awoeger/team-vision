import { css } from '@emotion/react';
import Link from 'next/link';
import { IconContext } from 'react-icons';
import * as AiIcons from 'react-icons/ai';
import * as FaIcons from 'react-icons/fa';
import * as IoIcons from 'react-icons/io';
import { darkBlue, largeText, lightGrey } from '../util/sharedStyles';

const navMenuActive = css`
  display: flex;
  justify-content: center;
  background: ${lightGrey};
`;

const navText = css`
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 8px 0px 8px 0px;
  margin-left: 50px;
  list-style: none;

  a {
    text-decoration: none;
    color: ${darkBlue};
    text-transform: uppercase;
    font-size: ${largeText};
    font-weight: 600;
    cursor: pointer;
    margin-right: 30px;
    margin-left: 10px;

    ::after {
      content: '';
      display: block;
      width: 0;
      height: 3px;
      background: ${darkBlue};
      transition: width 0.3s;
    }

    :hover::after {
      width: 100%;
    }
  }
`;

const navMenuItems = css`
  width: 100%;
  padding-left: 0;
  display: flex;
  justify-content: center;
`;

export default function SubMenu(props) {
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
        </ul>
      </nav>
    </IconContext.Provider>
  );
}
