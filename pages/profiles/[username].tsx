import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import * as FaIcons from 'react-icons/fa';
import * as GiIcons from 'react-icons/gi';
import * as MdIcons from 'react-icons/md';
import Layout from '../../components/Layout';
import {
  getCoachTeamsByUserId,
  getPlayerTeamsByUserId,
} from '../../util/database';
import {
  darkBlue,
  largeText,
  lightPink,
  normalText,
} from '../../util/sharedStyles';
import { ApplicationError, User } from '../../util/types';
import { SingleUserResponseType } from '../api/users-by-username/[username]';

// TODO: Style page
// TODO: Style the error messages

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
};

const error = css`
  display: flex;
  justify-content: center;
  align-content: center;
`;

const mainContainer = css`
  display: flex;
`;

const mainFirstSubContainer = css`
  height: 100vh;
  width: 25%;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${lightPink};

  h1 {
    font-size: 2em;
    margin: 40px 0 40px 0;
  }

  h2 {
    font-size: ${largeText};
    margin-top: 60px;
    margin-bottom: 20px;
  }

  p {
    font-size: ${largeText};
    margin: 10px 0;

    span {
      font-weight: 600;
    }
  }
`;

const mainSecondSubContainer = css`
  height: 90vh;
  width: 100%;
  text-align: center;

  h2 {
    margin-top: 70px;
    margin-bottom: 30px;
  }
`;

const gridContainer = css`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 50px 100px;
  justify-items: stretch;
  margin-left: 100px;
  margin-right: 100px;

  h3 {
    background-image: url('/images/button_background_lightBlue.PNG');
    background-size: cover;
    background-repeat: no-repeat;
    padding: 15px 0;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    color: white;
    text-transform: uppercase;
    margin-bottom: 0;
    font-size: ${largeText};
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
    margin-bottom: 15px;
    margin-left: 20px;
  }

  p {
    font-size: ${normalText};

    span {
      font-weight: 500;
      margin-left: 10px;
    }
  }

  a {
    background-image: url('/images/button_background_lightBlue.PNG');
    background-size: cover;
    background-repeat: no-repeat;
    color: white;
    padding: 5px 15px;
    text-decoration: none;
    text-transform: uppercase;
    font-weight: 500;
  }
`;

export default function SingleUserProfile(props: Props) {
  console.log('props in profile page', props);
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
          <div css={mainFirstSubContainer}>
            <h1>Your Profile</h1>
            <GiIcons.GiWhistle
              style={{
                color: 'white',
                background: '#1d2a48',
                borderRadius: '200px',
                padding: '20px',
              }}
              size={100}
            />
            <h2>
              Welcome Coach {props.user.userFirstName} {props.user.userLastName}
            </h2>
            <p>
              <span>Username:</span> {props.user.username}
            </p>
            <p>
              <span>Email:</span> {props.user.userEmail}
            </p>
          </div>
          <div css={mainSecondSubContainer}>
            <h2>Check out all teams you are coaching!</h2>
            <Link href="/profiles/create-new-team">
              <a>Create new team</a>
            </Link>
            <div css={gridContainer}>
              {props.coachTeams.map((coachTeam) => {
                return (
                  <div key={coachTeam.id}>
                    <h3>{coachTeam.teamName}</h3>
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
                          {/* Link href={`/teams/${coachTeam.teamName}-${coachTeam.id}`} */}
                          <a>Go to team</a>
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
          <div css={mainFirstSubContainer}>
            <h1>Your Profile</h1>
            <FaIcons.FaRunning
              style={{
                color: 'white',
                background: '#1d2a48',
                borderRadius: '200px',
                padding: '20px',
              }}
              size={100}
            />
            <h2>
              Welcome Player {props.user.userFirstName}{' '}
              {props.user.userLastName}
            </h2>
            <p>
              <span>Username:</span> {props.user.username}
            </p>
            <p>
              <span>Email:</span> {props.user.userEmail}
            </p>
          </div>

          <div css={mainSecondSubContainer}>
            <h2>Check out all teams you are playing for!</h2>
            <Link href="/profiles/player-request">
              <a>Join a new team</a>
            </Link>
            <div css={gridContainer}>
              {props.playerTeams.map((playerTeam) => {
                return (
                  <div key={playerTeam.id}>
                    <h3>{playerTeam.teamName}</h3>
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
                          <a>Go to team</a>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {/* <Link href="/profiles/player-request">
            <a>Join a new team</a>
          </Link> */}
        </div>
      )}
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // API design here is not so great, maybe don't copy
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
  console.log('json in profile page', json);

  if ('errors' in json) {
    // Better would be to return the status code
    // in the error itself
    context.res.statusCode = 403;
  } else if (!json.user) {
    // Return a proper status code for a response
    // with a null user (which indicates it has
    // not been found in the database)
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
