import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { getTeamsByUserId } from '../../util/database';
import { ApplicationError, User } from '../../util/types';
import { SingleUserResponseType } from '../api/users-by-username/[username]';

// TODO: Ternary - show either coach or player "page"
// TODO: Display the teams of the coach or player
// TODO: Style page
// TODO: Style the error messages

type Props = {
  user?: User;
  errors?: ApplicationError[];
  username?: String;
  coachTeams: CoachTeam[];
};

type CoachTeam = {
  id: Number;
  teamName: String;
  sportType: String;
  founded: String;
  coachUserId: Number;
};

const error = css`
  display: flex;
  justify-content: center;
  align-content: center;
`;

export default function SingleUserProfile(props: Props) {
  console.log('props karl', props);
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
      <p>Welcome Coach {props.user.userFirstName}</p>

      {/* TODO: Map over  */}
      <div>
        {props.coachTeams.map((coachTeam) => {
          return (
            <div key={3}>
              <h3>Team Name: {coachTeam.teamName}</h3>
              <p>Sport type: {coachTeam.sportType}</p>
              <p>Founded at: {coachTeam.founded}</p>
              <button>Go to team</button>
            </div>
          );
        })}
      </div>

      <button>
        <Link href="/profiles/create-new-team">
          <a>Create new team</a>
        </Link>
      </button>
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

  console.log('profile page json', json);

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

  const coachTeams = await getTeamsByUserId(json.user.id);

  console.log('Joses Team', coachTeams);

  // spreading the json, will help us to put either the user OR the errors in the return
  return {
    props: {
      ...json,
      coachTeams,
    },
  };
}
