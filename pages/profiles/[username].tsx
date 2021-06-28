import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Layout from '../../components/Layout';
import { ApplicationError, User } from '../../util/types';
import { SingleUserResponseType } from '../api/users-by-username/[username]';

// TODO: style the error messages!!!!

type Props = {
  user?: User;
  errors?: ApplicationError[];
  username?: String;
};

const error = css`
  display: flex;
  justify-content: center;
  align-content: center;
`;

export default function SingleUserProfile(props: Props) {
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
      <Layout username={props.user.username} />
      <Head>
        <title>
          Profile page for {props.user.firstName} {props.user.lastName}
        </title>
      </Head>

      <h1>Profile Page</h1>

      <div>
        id: <span>{props.user.id}</span>
      </div>

      <div>
        username: <span>{props.user.username}</span>
      </div>
      <div>first_name: {props.user.firstName}</div>
      <div>last_name: {props.user.lastName}</div>
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

  console.log('API decoded JSON from response', json);

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

  // spreading the json, will help us to put either the user OR the errors in the return
  return {
    props: {
      ...json,
    },
  };
}
