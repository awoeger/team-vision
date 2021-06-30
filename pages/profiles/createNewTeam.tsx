import router from 'next/router';
import { useState } from 'react';
import Layout from '../../components/Layout';
import { RegisterResponse } from '../api/register';

type Props = {
  username: String;
};

export default function CreateNewTeamForm(props: Props) {
  const [teamName, setTeamName] = useState('');
  const [sportType, setSportType] = useState('');
  const [foundedAt, setFoundedAt] = useState('');

  return (
    <>
      <Layout username={props.username} />
      <div>
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            const response = await fetch(
              `/api/users-by-username/createNewTeam`,
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  teamName: teamName,
                  sportType: sportType,
                  foundedAt: foundedAt,
                }),
              },
            );

            const json = (await response.json()) as RegisterResponse;
            console.log('json', json);

            // Todo: Link to single user page
            router.push(`/`);
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
              type="date"
              value={foundedAt}
              onChange={(event) => {
                setFoundedAt(event.currentTarget.value);
              }}
            />
          </label>

          <button type="submit">CREATE NEW TEAM</button>
        </form>
      </div>
    </>
  );
}
