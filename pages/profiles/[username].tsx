import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import * as BsIcons from 'react-icons/bs';
import * as GiIcons from 'react-icons/gi';
import * as MdIcons from 'react-icons/md';
import CoachProfile from '../../components/CoachProfile';
import Layout from '../../components/Layout';
import PlayerProfile from '../../components/PlayerProfile';
import {
  getCoachTeamsByUserId,
  getPlayerTeamsByUserId,
} from '../../util/database';
import {
  darkBlue,
  largeText,
  link,
  normalText,
  orange,
} from '../../util/sharedStyles';
import { ApplicationError, User } from '../../util/types';
import { SingleUserResponseType } from '../api/users-by-username/[username]';

type Props = {
  user?: User;
  errors?: ApplicationError[];
  username?: String;
  coachTeams: CoachTeam[];
  playerTeams: PlayerTeam[];
};

type CoachTeam = {
  id: Number;
  teamName: String;
  sportType: String;
  founded: String;
  coachUserId: Number;
};

type PlayerTeam = {
  id: Number;
  teamName: String;
  sportType: String;
  founded: String;
  statusId: Number;
};

type DeletedTeamResponse = {
  id: Number;
};

const error = css`
  display: flex;
  justify-content: center;
  align-content: center;
`;

const mainContainer = css`
  display: flex;
`;

const mainSecondSubContainer = css`
  height: 90vh;
  width: 100%;
  text-align: center;

  h2,
  h4 {
    margin: 60px 100px 20px 100px;
    padding: 10px 0;
    color: white;
    border-radius: 20px;
    font-size: 1.5em;
  }

  h2 {
    background: ${darkBlue};
  }

  h4 {
    background: #ffa500;
  }
`;

const gridContainer = css`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  gap: 40px 100px;
  justify-items: stretch;
  margin: 30px 100px 30px 100px;
`;

const teamHeader = css`
  display: flex;
  align-items: center;
  background-image: url('/images/button_background_lightBlue.PNG');
  background-size: cover;
  background-repeat: no-repeat;
  justify-content: space-between;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 15px 10px;

  div {
    display: flex;
    align-items: center;
  }

  h3 {
    color: white;
    font-size: ${largeText};
    margin-left: 10px;
    text-transform: uppercase;
    margin: 0 0 0 20px;
  }

  button {
    padding: 10px;
    color: ${orange};
    background: rgba(255, 255, 255, 0.7);
    border-radius: 90%;
    border: none;
    cursor: pointer;
  }
`;

const teamInfoBox = css`
  background: white;
  border: 1px solid ${darkBlue};
  border-top: none;
  padding-top: 20px;
  padding-bottom: 20px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;

  div {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    margin-left: 20px;
  }

  p {
    font-size: ${normalText};
    margin: 0;

    span {
      font-weight: 500;
      margin-left: 10px;
    }
  }
`;

export default function SingleUserProfile(props: Props) {
  const [coachTeams, setCoachTeams] = useState(props.coachTeams);

  // Show message if user not allowed
  const errors = props.errors;
  if (errors) {
    return (
      <Layout>
        <Head>
          <title>Error</title>
        </Head>
        <div css={error}>Error: {errors[0].message}</div>
      </Layout>
    );
  }

  // Show message if user does not exist
  if (!props.user) {
    return (
      <Layout>
        <Head>
          <title>User not found!</title>
        </Head>
        <p>User not found</p>
      </Layout>
    );
  }

  return (
    <>
      <Head>
        <title>
          Profile page for {props.user.userFirstName} {props.user.userLastName}
        </title>
      </Head>

      <Layout username={props.user.username} />

      {props.user.userRoleId === 1 ? (
        <div css={mainContainer}>
          <CoachProfile user={props.user} />
          <div css={mainSecondSubContainer}>
            <h2>YOUR TEAMS</h2>

            <div css={gridContainer}>
              {coachTeams.map((coachTeam) => {
                return (
                  <div key={coachTeam.id}>
                    <div css={teamHeader}>
                      <h3>{coachTeam.teamName}</h3>
                      <button
                        onClick={async (singleTeam) => {
                          singleTeam.preventDefault();

                          if (
                            window.confirm(
                              'Are you sure you want to delete this team?',
                            )
                          ) {
                            const response = await fetch(
                              `/api/users-by-username/${props.user.username}`,
                              {
                                method: 'DELETE',
                                headers: {
                                  'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                  id: coachTeam.id,
                                }),
                              },
                            );

                            const json =
                              (await response.json()) as DeletedTeamResponse;

                            const deleteTeam = () => {
                              // create a copy of the allTeam array
                              const newTeamArray = [...coachTeams];
                              // find the team.id that has been clicked on
                              const deletedTeam = newTeamArray.find(
                                (e) => e.id === coachTeam.id,
                              );
                              // get the index of the team in the copy of the array
                              const deletedTeamIndex =
                                newTeamArray.indexOf(deletedTeam);
                              // splice the index out of the array
                              if (deletedTeam) {
                                newTeamArray.splice(deletedTeamIndex, 1);
                              }

                              return newTeamArray;
                            };

                            setCoachTeams(deleteTeam());
                          }
                        }}
                      >
                        <BsIcons.BsTrashFill size={20} />
                      </button>
                    </div>

                    <div css={teamInfoBox}>
                      <div>
                        <GiIcons.GiVolleyballBall
                          style={{
                            color: '#1d2a48',
                          }}
                          size={30}
                        />
                        <p>
                          <span>Sport type:</span> {coachTeam.sportType}
                        </p>
                      </div>
                      <div>
                        <MdIcons.MdToday
                          style={{
                            color: '#1d2a48',
                          }}
                          size={30}
                        />
                        <p>
                          <span>Founded at:</span> {coachTeam.founded}
                        </p>
                      </div>
                      <div>
                        <Link href={`/teams/${coachTeam.id}`}>
                          <a css={link}>Go to team</a>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div css={mainContainer}>
          <PlayerProfile user={props.user} />
          <div css={mainSecondSubContainer}>
            <h2>YOUR TEAMS</h2>
            <h3>
              Congratulations, you have been accepted to the following teams
            </h3>

            <div css={gridContainer}>
              {props.playerTeams
                .filter((team) => team.statusId === 1)
                .map((playerTeam) => {
                  return (
                    <div key={playerTeam.id}>
                      <div css={teamHeader}>
                        <h3>{playerTeam.teamName}</h3>
                      </div>
                      <div css={teamInfoBox}>
                        <div>
                          <GiIcons.GiVolleyballBall
                            style={{
                              color: '#1d2a48',
                            }}
                            size={30}
                          />
                          <p>
                            <span>Sport type:</span> {playerTeam.sportType}
                          </p>
                        </div>
                        <div>
                          <MdIcons.MdToday
                            style={{
                              color: '#1d2a48',
                            }}
                            size={30}
                          />
                          <p>
                            <span>Founded at:</span> {playerTeam.founded}
                          </p>
                        </div>
                        <div>
                          <Link href={`/teams/${playerTeam.id}`}>
                            <a css={link}>Go to team</a>
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
            {/* Player awaiting */}

            <div css={mainSecondSubContainer}>
              <h4>PENDING REQUESTS</h4>

              <div css={gridContainer}>
                {props.playerTeams
                  .filter((team) => team.statusId === 3)
                  .map((playerTeam) => {
                    return (
                      <div key={playerTeam.id}>
                        <div css={teamHeader}>
                          <h3>{playerTeam.teamName}</h3>
                        </div>
                        <div css={teamInfoBox}>
                          <div>
                            <GiIcons.GiVolleyballBall
                              style={{
                                color: '#1d2a48',
                              }}
                              size={30}
                            />
                            <p>
                              <span>Sport type:</span> {playerTeam.sportType}
                            </p>
                          </div>
                          <div>
                            <MdIcons.MdToday
                              style={{
                                color: '#1d2a48',
                              }}
                              size={30}
                            />
                            <p>
                              <span>Founded at:</span> {playerTeam.founded}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const response =
    // Since we're fetching on the server side,
    // the browser is not a part of this `fetch`
    // and it is therefore not sending the cookies along
    //
    // This is using the node-fetch library
    // internally
    await fetch(
      `${process.env.API_BASE_URL}/users-by-username/${context.query.username}`,
      {
        method: 'GET',
        headers: {
          // This forwards the cookie to the API route
          cookie: context.req.headers.cookie || '',
        },
      },
    );

  const json = (await response.json()) as SingleUserResponseType;

  if ('errors' in json) {
    context.res.statusCode = 403;
  } else if (!json.user) {
    context.res.statusCode = 404;
  }

  // Getting all teams the coach has created
  const coachTeams = await getCoachTeamsByUserId(json.user.id);

  // Getting all teams the player got accepted to
  const playerTeams = await getPlayerTeamsByUserId(json.user.id);

  console.log('playerTeams', playerTeams);

  // spreading the json, will help us to put either the user OR the errors in the return
  return {
    props: {
      ...json,
      coachTeams,
      playerTeams,
    },
  };
}
