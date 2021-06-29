import { GetServerSidePropsContext } from 'next';
import router from 'next/router';
import { useState } from 'react';
import { User } from '../../util/types';
import { SingleUserResponseType } from '../api/users-by-username/[username]';

type Props = {
  user?: User;
  username?: String;
};

export default function CreateNewTeamForm(props: Props) {
  console.log('props', props);
  const [teamName, setTeamName] = useState('');
  const [sportType, setSportType] = useState('');
  const [foundedAt, setFoundedAt] = useState('');

  return (
    <div>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          const response = await fetch(`/api/createNewTeam`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              teamName: teamName,
              sportType: sportType,
              foundedAt: foundedAt,
              // TODO: GET userId from DATABASE??
              // userId: props.user.id,
            }),
          });

          const json = await response.json();
          console.log('json', json);

          // Todo: Link to single user page
          router.push(`/Home`);
        }}
      >
        <h2>Team Information</h2>

        <label>
          Team Name
          <input
            placeholder="Chicago Bulls"
            value={teamName}
            onChange={(event) => {
              setTeamName(event.currentTarget.value);
            }}
          />
        </label>

        <label>
          Sport type
          <input
            placeholder="Basketball"
            value={sportType}
            onChange={(event) => {
              setSportType(event.currentTarget.value);
            }}
          />
        </label>

        <label>
          founded at
          <input
            placeholder="01/1966"
            type="month"
            value={foundedAt}
            onChange={(event) => {
              setFoundedAt(event.currentTarget.value);
            }}
          />
        </label>

        <button type="submit">CREATE NEW TEAM</button>
      </form>
    </div>
  );
}

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   // API design here is not so great, maybe don't copy
//   const response =
//     // Since we're fetching on the server side,
//     // the browser is not a part of this `fetch`
//     // and it is therefore not sending the cookies along
//     //
//     // This is using the node-fetch library
//     // internally
//     await fetch(
//       `${process.env.API_BASE_URL}/users-by-username/${context.query.username}`,
//       {
//         method: 'GET',
//         // headers: {
//         //   // This forwards the cookie to the API route
//         //   cookie: context.req.headers.cookie || '',
//         // },
//       },
//     );

//   const json = (await response.json()) as SingleUserResponseType;

//   console.log('API decoded JSON from response', json);

//   if ('errors' in json) {
//     // Better would be to return the status code
//     // in the error itself
//     context.res.statusCode = 403;
//   } else if (!json.user) {
//     // Return a proper status code for a response
//     // with a null user (which indicates it has
//     // not been found in the database)
//     context.res.statusCode = 404;
//   }

//   // spreading the json, will help us to put either the user OR the errors in the return
//   return {
//     props: {
//       ...json,
//     },
//   };
// }
