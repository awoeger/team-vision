import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';
import {
  getCoachTeamsByUserId,
  getPlayerTeamsByUserId,
} from '../../util/database';
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

      <h1>Your Profile</h1>

      {props.user.userRoleId === 1 ? (
        <div>
          <p>Welcome Coach {props.user.userFirstName}</p>
          <p>Check out all teams you are coaching!</p>
          <div>
            {props.coachTeams.map((coachTeam) => {
              return (
                <div key={coachTeam.id}>
                  <h3>Team Name: {coachTeam.teamName}</h3>
                  <p>Sport type: {coachTeam.sportType}</p>
                  <p>Founded at: {coachTeam.founded}</p>
                  <Link href={`/teams/${coachTeam.id}`}>
                    {/* Link href={`/teams/${coachTeam.teamName}-${coachTeam.id}`} */}
                    <a>Go to team</a>
                  </Link>
                </div>
              );
            })}
          </div>
          <Link href="/profiles/create-new-team">
            <a>Create new team</a>
          </Link>
        </div>
      ) : (
        <div>
          <p>Welcome Player {props.user.userFirstName}</p>
          <p>Check out all teams you are a part of!</p>
          <div>
            {props.playerTeams.map((playerTeam) => {
              return (
                <div key={playerTeam.id}>
                  <h3>Team Name: {playerTeam.teamName}</h3>
                  <p>Sport type: {playerTeam.sportType}</p>
                  <p>Founded at: {playerTeam.founded}</p>
                  <Link href={`/teams/${playerTeam.id}`}>
                    <a>Go to team</a>
                  </Link>
                </div>
              );
            })}
          </div>
          <Link href="/profiles/player-request">
            <a>Join a new team</a>
          </Link>
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
