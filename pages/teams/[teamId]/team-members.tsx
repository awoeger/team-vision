/* eslint-disable @typescript-eslint/no-unused-vars */
import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import * as BsIcons from 'react-icons/bs';
import * as FaIcons from 'react-icons/fa';
import Layout from '../../../components/Layout';
import SubMenu from '../../../components/SubMenu';
import {
  checkIfCoachInTeam,
  checkIfPlayerInTeam,
  getUserByValidSessionToken,
} from '../../../util/database';
import { largeText, orange } from '../../../util/sharedStyles';
import { DeclinedPlayerRequestResponse, Member } from '../../../util/types';

type Props = {
  username: String;
  teamId: number;
  allMembers: Member[];
  userRoleId: number;
  userErrors: { message: string };
};

const mainContainer = css`
  width: 100%;
  display: flex;
`;

const teamMembersContainer = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    margin: 40px 0;
  }

  h2 {
    font-size: ${largeText};
    margin-top: 20px;
    display: flex;
    align-items: center;

    span {
      margin-left: 20px;
    }
  }

  table {
    text-align: center;
    width: 90%;
    margin: 20px 0 40px 0;

    th {
      color: white;
      padding: 10px;
    }

    td {
      padding: 10px;
    }

    button {
      margin: 5px 10px;
      padding: 8px;
      border-radius: 100%;
      color: white;
      border: none;
      box-shadow: rgba(0, 0, 0, 0.25) 0px 5px 10px,
        rgba(0, 0, 0, 0.22) 0px 5px 5px;
      cursor: pointer;

      :active {
        transform: translate(0, 3px);
      }
    }

    .icon {
      width: 20px;
      height: 20px;
    }

    @media (max-width: 1024px) {
      .icon {
        width: 15px;
        height: 15px;
      }
    }
  }
`;

const acceptedMembers = css`
  background: #0ea70e;
`;

const awaitingMembers = css`
  background: #ffa500;
`;

const acceptButton = css`
  background: rgb(14 167 14 / 60%);

  :hover,
  :active {
    background: #0ea70e;
  }
`;

const declineButton = css`
  background: rgb(253 60 1 / 70%);

  :hover,
  :active {
    background: ${orange};
  }
`;

export default function TeamMembers(props: Props) {
  const [members, setMembers] = useState<Member[]>(props.allMembers);

  const errors = props.userErrors;
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (errors) {
    return (
      <Layout>
        <Head>
          <title>Error</title>
        </Head>
        <div>Error: {errors.message}</div>
      </Layout>
    );
  }

  return (
    <>
      <Head>
        <title>Team Vision - Team Members</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout username={props.username} />
      <SubMenu userRoleId={props.userRoleId} teamId={props.teamId} />
      <div css={mainContainer}>
        <div css={teamMembersContainer}>
          <h1>Team Members</h1>
          <h2>
            <BsIcons.BsPersonCheckFill className="icon" />{' '}
            <span>
              Accepted Members -{' '}
              {members.filter((member) => member.statusId === 1).length}
            </span>
          </h2>
          <table>
            <thead css={acceptedMembers}>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Playing since</th>
                <th>Experience level</th>
                <th>Position on the team</th>
                <th>Message to the coach</th>
                <th>Delete</th>
              </tr>
            </thead>
            {members
              .filter((member) => member.statusId === 1)
              .map((member) => {
                return (
                  <tr key={member.id}>
                    <td>{member.userFirstName}</td>
                    <td>{member.userLastName}</td>
                    <td>{member.playingSince}</td>
                    <td>{member.experienceLevel}</td>
                    <td>{member.positionOnTeam}</td>
                    <td>{member.playerMessage}</td>
                    <button
                      css={declineButton}
                      onClick={async (event) => {
                        event.preventDefault();

                        if (
                          window.confirm(
                            'Are you sure you want to remove this player from your team?',
                          )
                        ) {
                          const response = await fetch(
                            `/api/teams-by-team-id/team-members`,
                            {
                              method: 'DELETE',
                              headers: {
                                'Content-Type': 'application/json',
                              },
                              body: JSON.stringify({
                                id: member.id,
                              }),
                            },
                          );

                          const json =
                            (await response.json()) as DeclinedPlayerRequestResponse;

                          // Delete Member on the frontend on decline button click
                          const declineMember = () => {
                            // create a copy of the allmembers array
                            const newMemberArray = [...members];
                            // find the person.id that has been clicked on
                            const deletedMember = newMemberArray.find(
                              (m) => m.id === member.id,
                            );

                            // get the index of the person in the copy of the array
                            if (deletedMember) {
                              const deletedMemberIndex =
                                newMemberArray.indexOf(deletedMember);
                              // splice the index out of the array

                              newMemberArray.splice(deletedMemberIndex, 1);
                            }
                            return newMemberArray;
                          };
                          // set the state to the result of the function
                          setMembers(declineMember());
                        }
                      }}
                    >
                      <BsIcons.BsTrashFill className="icon" />
                    </button>
                  </tr>
                );
              })}
          </table>
          <h2>
            <BsIcons.BsFillPersonFill className="icon" />{' '}
            <span>
              Awaiting Players -{' '}
              {members.filter((member) => member.statusId === 3).length}
            </span>
          </h2>
          <table>
            <thead>
              <tr css={awaitingMembers}>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Playing since</th>
                <th>Experience level</th>
                <th>Position on the team</th>
                <th>Message to the coach</th>
                <th>Change Status</th>
              </tr>
            </thead>
            <tbody>
              {members
                .filter((member) => member.statusId === 3)
                .map((member) => {
                  return (
                    <tr key={member.id}>
                      <td>{member.userFirstName}</td>
                      <td>{member.userLastName}</td>
                      <td>{member.playingSince}</td>
                      <td>{member.experienceLevel}</td>
                      <td>{member.positionOnTeam}</td>
                      <td>{member.playerMessage}</td>
                      <td>
                        <div>
                          <button
                            data-cy="accept-player-request"
                            css={acceptButton}
                            onClick={async (event) => {
                              event.preventDefault();
                              await fetch(
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

                              const acceptMember = () => {
                                // create a copy of the allmembers array
                                const newMemberArray = [...members];
                                // find the person.id that has been clicked on
                                const acceptedMember = newMemberArray.find(
                                  (m) => m.id === member.id,
                                );
                                // Change the status number to accepted
                                if (acceptedMember) {
                                  acceptedMember.statusId = 1;
                                }

                                return newMemberArray;
                              };
                              // set the state to the result of the function
                              setMembers(acceptMember());
                            }}
                          >
                            <FaIcons.FaCheck className="icon" />
                          </button>
                          <button
                            data-cy="decline-player-request"
                            css={declineButton}
                            onClick={async (event) => {
                              event.preventDefault();

                              if (
                                window.confirm(
                                  'Are you sure you want to decline the request from this player?',
                                )
                              ) {
                                const response = await fetch(
                                  `/api/teams-by-team-id/team-members`,
                                  {
                                    method: 'DELETE',
                                    headers: {
                                      'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({
                                      id: member.id,
                                    }),
                                  },
                                );

                                const json =
                                  (await response.json()) as DeclinedPlayerRequestResponse;

                                // Delete Member on the frontend on decline button click
                                const declineMember = () => {
                                  // create a copy of the allmembers array
                                  const newMemberArray = [...members];
                                  // find the person.id that has been clicked on
                                  const deletedMember = newMemberArray.find(
                                    (m) => m.id === member.id,
                                  );
                                  // get the index of the person in the copy of the array
                                  const deletedMemberIndex =
                                    newMemberArray.indexOf(deletedMember!);
                                  // splice the index out of the array
                                  if (deletedMember) {
                                    newMemberArray.splice(
                                      deletedMemberIndex,
                                      1,
                                    );
                                  }

                                  return newMemberArray;
                                };
                                // set the state to the result of the function
                                setMembers(declineMember());
                              }
                            }}
                          >
                            <BsIcons.BsTrashFill className="icon" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
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

  const sessionToken = context.req.cookies.sessionToken;
  const user = await getUserByValidSessionToken(sessionToken);
  const userRoleId = user?.userRoleId ?? null;

  let userErrors = null;

  if (!user) {
    userErrors = { message: 'Access denied' };
  } else {
    if (user.id && teamId) {
      const isPlayerInTeam = await checkIfPlayerInTeam(user.id, Number(teamId));
      const isCoachInTeam = await checkIfCoachInTeam(user.id, Number(teamId));
      if (
        isPlayerInTeam &&
        isPlayerInTeam[0].count === '0' &&
        isCoachInTeam &&
        isCoachInTeam[0].count === '0'
      ) {
        userErrors = { message: 'You are not allowed to visit this team.' };
      }
    }
  }

  return {
    props: {
      teamId,
      ...json,
      userRoleId,
      userErrors,
    },
  };
}
