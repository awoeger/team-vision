import { css } from '@emotion/react';
import Link from 'next/link';
import * as AiIcons from 'react-icons/ai';
import * as FaIcons from 'react-icons/fa';
import * as GiIcons from 'react-icons/gi';
import * as IoIcons from 'react-icons/io';
import { darkBlue, lightGrey, orange } from '../util/sharedStyles';

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

  .RoleIcon {
    color: white;
    background: ${orange};
    border-radius: 100%;
    padding: 10px;
    width: 50px;
    height: 50px;
  }

  .icon {
    min-width: 20px;
    min-height: 20px;
  }

  a {
    text-decoration: none;
    color: ${darkBlue};
    text-transform: uppercase;
    font-size: 20px;
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

  @media (max-width: 856px) {
    a {
      font-size: 0.8em;
    }
  }

  @media (max-width: 750px) {
    justify-content: space-evenly;
    margin-left: 0px;

    li {
      margin: 0;
    }

    .RoleIcon,
    .iconLi {
      display: none;
      margin: 0;
    }

    .lastNavText {
      margin-right: 0;
    }
  }

  @media (max-width: 560px) {
    flex-wrap: wrap;
    text-align: center;

    a {
      margin: 0;
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
    <nav css={navMenuActive}>
      <ul css={navMenuItems}>
        <li css={navText}>
          {' '}
          {props.userRoleId === 1 ? (
            <GiIcons.GiWhistle className="RoleIcon" />
          ) : (
            <FaIcons.FaRunning className="RoleIcon" />
          )}
        </li>
        <li css={navText}>
          <AiIcons.AiFillHome className="icon" />
          <Link href={`/teams/${props.teamId}`}>
            <a>TEAM BASE</a>
          </Link>
        </li>
        {props.userRoleId === 1 ? (
          <>
            <li css={navText}>
              <IoIcons.IoMdPeople className="icon" />
              <Link href={`/teams/${props.teamId}/team-members`}>
                <a>TEAM MEMBERS</a>
              </Link>
            </li>

            <li css={navText}>
              <AiIcons.AiOutlineCalendar className="icon" />
              <Link href={`/teams/${props.teamId}/create-new-event`}>
                <a>CREATE EVENT</a>
              </Link>
            </li>
          </>
        ) : undefined}

        <li css={navText}>
          <FaIcons.FaRunning className="icon" />
          <Link href={`/teams/${props.teamId}/exercises`}>
            <a className="lastNavText">EXERCISES</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
