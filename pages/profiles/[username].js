import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Layout from '../../components/Layout';
import { ApplicationError, User } from '../../util/types';

// type Props = {
//   user?: User;
//   errors?: ApplicationError[];
//   username: String;
// };

export default function SingleUserProfile(props) {
  // Show message if user not allowed
  // const errors = props.errors;
  // if (errors) {
  //   return (
  //       <Head>
  //         <title>Error</title>
  //       </Head>
  //       Error: {errors[0].message}
  //   );
  // }

  // Show message if user does not exist
  if (!props.user) {
    return (
      <Head>
        <title>User not found!</title>
      </Head>
    );
  }
  console.log('proppys', props);

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

export async function getServerSideProps(context) {
  // TODO: Verify the user's token (from the cookie) and
  // retrieve the user that matches the token

  // TODO: Test if the token user's username matches the username in the URL

  // API design here is not so great, maybe don't copy
  const response =
    // Since we are fetching on the servide side
    // the browers is not a part of tis 'fetch'
    // and it is therefore not sending the cookies along

    // This is using the node-fetch library internally
    // look at docs for node-fetch

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

  console.log('gssp', context.req.cookies.sessionToken);

  const { user } = await response.json();
  console.log('API decoded JSON from response', user);

  return {
    props: {
      user: user,
    },
  };
}
