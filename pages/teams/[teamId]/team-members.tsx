import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Layout from '../../../components/Layout';
import SubMenu from '../../../components/SubMenu';
import { updatePlayerRequest } from '../../../util/database';
import {
  darkBlue,
  largeText,
  lightBlue,
  lightGrey,
} from '../../../util/sharedStyles';
import { RegisterResponse } from '../../api/register';

type Props = {
  username: String;
  teamId: Number;
  acceptedMembers: Member[];
  awaitingMembers: Member[];
};

type Member = {
  id: Number;
  experienceLevel: String;
  playerMessage: String;
  playingSince: String;
  positionOnTeam: String;
  statusId: Number | String;
  userFirstName: String;
  userLastName: String;
};

const mainContainer = css`
  width: 100%;
  display: flex;
`;

const subMenu = css`
  width: 25%;
  position: static;
  display: flex;
  justify-content: flex-start;
  background: ${lightGrey};
  padding: 20px;
  border-right: 2px solid ${darkBlue};
`;

const teamMembersContainer = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  h2,
  h1 {
    font-size: ${largeText};
    margin-top: 20px;
  }

  table {
    text-align: center;
    width: 90%;
    margin: 20px 0 40px 0;

    th {
      background: ${lightBlue};
      color: white;
      padding: 10px;
    }
  }
`;

export default function TeamMembers(props: Props) {
  console.log('props members', props);
  return (
    <>
      <Head>
        <title>Team Vision - Team Members</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout username={props.username} />
      <div css={mainContainer}>
        <div css={subMenu}>
          <SubMenu teamId={props.teamId} />
        </div>
        <div css={teamMembersContainer}>
          <h1>Team Members</h1>
          <h2>Accepted Members</h2>
          <table>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Playing since</th>
              <th>Experience level</th>
              <th>Position on the team</th>
              <th>Message to the coach</th>
              <th>Status</th>
            </tr>
            {props.acceptedMembers.map((member) => {
              return (
                <tr key={member.id}>
                  <td>{member.userFirstName}</td>
                  <td>{member.userLastName}</td>
                  <td>{member.playingSince}</td>
                  <td>{member.experienceLevel}</td>
                  <td>{member.positionOnTeam}</td>
                  <td>{member.playerMessage}</td>
                  <td>{(member.statusId = 1 ? 'Accepted' : 'undefined')}</td>
                </tr>
              );
            })}
          </table>
          <h2>Awaiting Players</h2>
          <table>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Playing since</th>
              <th>Experience level</th>
              <th>Position on the team</th>
              <th>Message to the coach</th>
              <th>Status</th>
            </tr>
            {props.awaitingMembers.map((member) => {
              return (
                <tr key={member.id}>
                  <td>{member.userFirstName}</td>
                  <td>{member.userLastName}</td>
                  <td>{member.playingSince}</td>
                  <td>{member.experienceLevel}</td>
                  <td>{member.positionOnTeam}</td>
                  <td>{member.playerMessage}</td>
                  {/* TODO: onclick change number, in .ts file make POST request, onclick --> See body{.....} */}
                  <td>
                    {(member.statusId = 3) ? (
                      <div>
                        <button
                          onClick={async (event) => {
                            event.preventDefault();
                            const response = await fetch(
                              `/api/teams-by-team-id/team-members`,
                              {
                                method: 'POST',
                                headers: {
                                  'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                  id: member.id,
                                }),
                              },
                            );

                            // const json = {await response.json();
                            // }
                          }}
                        >
                          Accept
                        </button>
                        <button>Decline</button>
                      </div>
                    ) : (
                      'Accepted'
                    )}{' '}
                  </td>
                </tr>
              );
            })}
          </table>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const teamId = context.query.teamId;

  const response = await fetch(
    `${process.env.API_BASE_URL}/teams-by-team-id/${teamId}`,
    {
      method: 'GET',
    },
  );

  const json = await response.json();

  return {
    props: {
      teamId,
      ...json,
    },
  };
}
