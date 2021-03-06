import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import Layout from '../../../../components/Layout';
import SubMenu from '../../../../components/SubMenu';
import {
  checkIfCoachInTeam,
  checkIfPlayerInTeam,
  getAllMembersNamesByTeamId,
  getAllResponsesForEvent,
  getEventByEventId,
  getUserByValidSessionToken,
} from '../../../../util/database';
import { pushFirstEventResponse } from '../../../../util/functions';
import {
  darkBlue,
  largeText,
  normalText,
  orange,
} from '../../../../util/sharedStyles';
import { LoggedInUser, Response, SingleEvent } from '../../../../util/types';

type Props = {
  username: string;
  event: SingleEvent[];
  userRoleId: number;
  loggedinUser: LoggedInUser[];
  allResponsesForEvent: Response[];
  userErrors: { message: string };
};

const mainContainer = css`
  width: 100%;
  display: flex;
  justify-content: space-evenly;

  @media (max-width: 730px) {
    flex-direction: column;
    align-items: center;
  }
`;

const eventContainer = css`
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px 20px;

  div {
    display: flex;

    h1 {
      margin: 40px 0;
    }

    h2 {
      font-size: ${normalText};
      margin-top: 20px;
    }
  }

  table {
    text-align: center;
    width: 90%;
    margin: 20px 0 40px 0;
    width: 40%;

    th {
      color: white;
      padding: 10px;
    }

    td {
      padding: 10px 0;
    }

    tfoot {
      td {
        border-top: 2px solid ${darkBlue};
        font-weight: 600;
      }
    }
  }

  @media (max-width: 730px) {
    align-items: center;
    margin-bottom: 0;
  }

  @media (max-width: 475px) {
    h2 {
      font-size: 1.2em;
    }
  }
`;

const eventSubContainer = css`
  display: flex;
  flex-direction: column;
`;

const userAttendingDiv = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px 0;
  text-align: center;

  p {
    font-size: ${largeText};
    span {
      font-weight: 600;
    }
  }

  button {
    margin: 10px 20px;
    padding: 15px;
    border-radius: 100%;
    color: white;
    border: none;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 5px 10px,
      rgba(0, 0, 0, 0.22) 0px 5px 5px;
  }
`;

const imageContainer = css`
  display: flex;
  justify-content: center;
  width: 80%;
`;

const yesButton = css`
  background: rgb(14 167 14 / 60%);

  :hover,
  :active {
    background: #0ea70e;
  }
`;

const maybeButton = css`
  background: rgb(255 165 0 / 70%);

  :hover,
  :active {
    background: #ffa500;
  }
`;

const noButton = css`
  background: rgb(253 60 1 / 70%);

  :hover,
  :active {
    background: ${orange};
  }
`;

const yesTableHeader = css`
  background: #0ea70e;
`;

const maybeTableHeader = css`
  background: #ffa500;
`;

const noTableHeader = css`
  background: ${orange};
`;

export default function SingleEventPage(props: Props) {
  const [allResponses, setAllResponses] = useState(props.allResponsesForEvent);

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
        <title>Team Vision - Event</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout username={props.username} />
      <SubMenu userRoleId={props.userRoleId} teamId={props.event[0].teamId} />
      <div css={mainContainer}>
        <div css={eventContainer}>
          <div css={eventSubContainer}>
            {props.loggedinUser.map((user) => {
              return (
                <div css={userAttendingDiv} key={user.id}>
                  <div>
                    <p>
                      Tell your coach, if you would like to attend the <br />{' '}
                      <span>{props.event[0].eventType}</span> on{' '}
                      <span>{props.event[0].startDay}</span> at{' '}
                      <span>{props.event[0].startTime}</span>.
                    </p>
                  </div>
                  <div>
                    <button
                      css={yesButton}
                      onClick={async (event) => {
                        event.preventDefault();
                        // Post Request via API Route to insert user into event_user table
                        await fetch(`/api/teams-by-team-id/single-event`, {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json',
                          },
                          body: JSON.stringify({
                            usersId: user.id,
                            eventId: props.event[0].id,
                            response: 'Yes',
                          }),
                        });

                        // set use State to the result of pushFirstEventResponse
                        setAllResponses(
                          pushFirstEventResponse(
                            props.loggedinUser,
                            allResponses,
                            'Yes',
                          ),
                        );
                      }}
                    >
                      <FaIcons.FaThumbsUp className="icon" />
                    </button>
                    <button
                      css={maybeButton}
                      onClick={async (event) => {
                        event.preventDefault();
                        await fetch(`/api/teams-by-team-id/single-event`, {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json',
                          },
                          body: JSON.stringify({
                            usersId: user.id,
                            eventId: props.event[0].id,
                            response: 'Maybe',
                          }),
                        });

                        setAllResponses(
                          pushFirstEventResponse(
                            props.loggedinUser,
                            allResponses,
                            'Maybe',
                          ),
                        );
                      }}
                    >
                      <FaIcons.FaQuestion className="icon" />
                    </button>
                    <button
                      css={noButton}
                      onClick={async (event) => {
                        event.preventDefault();

                        await fetch(`/api/teams-by-team-id/single-event`, {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json',
                          },
                          body: JSON.stringify({
                            usersId: user.id,
                            eventId: props.event[0].id,
                            response: 'No',
                          }),
                        });

                        setAllResponses(
                          pushFirstEventResponse(
                            props.loggedinUser,
                            allResponses,
                            'No',
                          ),
                        );
                      }}
                    >
                      <FaIcons.FaThumbsDown className="icon" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <h2>Attending Players</h2>
          <table>
            <thead>
              <tr>
                <th css={yesTableHeader}>First Name</th>
                <th css={yesTableHeader}>Last Name</th>
              </tr>
            </thead>
            <tbody>
              {allResponses
                .filter((response) => response.response === 'Yes')
                .map((response) => {
                  return (
                    <tr key={response.usersId}>
                      <td>{response.userFirstName}</td>
                      <td>{response.userLastName}</td>
                    </tr>
                  );
                })}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={2}>
                  Total Amount:{' '}
                  {
                    allResponses.filter(
                      (response) => response.response === 'Yes',
                    ).length
                  }
                </td>
              </tr>
            </tfoot>
          </table>

          <h2>Possibly attending Players</h2>
          <table>
            <thead>
              <tr>
                <th css={maybeTableHeader}>First Name</th>
                <th css={maybeTableHeader}>Last Name</th>
              </tr>
            </thead>
            <tbody>
              {allResponses
                .filter((response) => response.response === 'Maybe')
                .map((response) => {
                  return (
                    <tr key={response.usersId}>
                      <td>{response.userFirstName}</td>
                      <td>{response.userLastName}</td>
                    </tr>
                  );
                })}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={2}>
                  Total Amount:{' '}
                  {
                    allResponses.filter(
                      (response) => response.response === 'Maybe',
                    ).length
                  }
                </td>
              </tr>
            </tfoot>
          </table>

          <h2>Non attending Players</h2>
          <table>
            <thead>
              <tr>
                <th css={noTableHeader}>First Name</th>
                <th css={noTableHeader}>Last Name</th>
              </tr>
            </thead>
            <tbody>
              {allResponses
                .filter((response) => response.response === 'No')
                .map((response) => {
                  return (
                    <tr key={response.usersId}>
                      <td>{response.userFirstName}</td>
                      <td>{response.userLastName}</td>
                    </tr>
                  );
                })}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={2}>
                  Total Amount:{' '}
                  {
                    allResponses.filter(
                      (response) => response.response === 'No',
                    ).length
                  }
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
        <div css={imageContainer}>
          <Image
            alt="Basketball Player running with ball"
            src="/images/basketball-player.jpg"
            width="450px"
            height="500px"
          />
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const teamId = context.query.teamId;
  const eventId = context.query.eventId;
  const event = await getEventByEventId(Number(eventId));

  // get UserRole Id which parts of the app the user is allowed to see
  const sessionToken = context.req.cookies.sessionToken;
  const user = await getUserByValidSessionToken(sessionToken);
  const userRoleId = user?.userRoleId ?? null;
  const userId = user?.id;

  let loggedinUser = null;
  // get all members of team
  if (userId) {
    loggedinUser = await getAllMembersNamesByTeamId(
      Number(teamId),
      Number(userId),
    );
  }

  const allResponsesForEvent = await getAllResponsesForEvent(Number(eventId));

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
      event,
      userRoleId,
      loggedinUser,
      allResponsesForEvent,
      userErrors,
    },
  };
}
