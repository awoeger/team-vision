import { css } from '@emotion/react';
import { useState } from 'react';
import Layout from '../../components/Layout';
import { formContainer } from './createNewTeam';

type Props = {
  username: String;
};

const input = css`
  margin: 5px 0 20px 0;
  width: 100%;
  padding: 5px;
`;

export default function PlayerRequest(props: Props) {
  const [positionOnTeam, setPositionOnTeam] = useState('');
  const [playingSince, setPlayingSince] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('Beginner');
  const [message, setMessage] = useState('');

  return (
    <>
      <Layout username={props.username} />
      <div css={formContainer}>
        <form
        // onSubmit={async (event) => {
        //   event.preventDefault();
        //   const response = await fetch(
        //     `/api/users-by-username/createNewTeam`,
        //     {
        //       method: 'POST',
        //       headers: {
        //         'Content-Type': 'application/json',
        //       },
        //       body: JSON.stringify({
        //         teamName: teamName,
        //         sportType: sportType,
        //         foundedAt: foundedAt,
        //       }),
        //     },
        //   );

        //   const json = (await response.json()) as RegisterResponse;
        //   console.log('json', json);

        //   // Todo: Link to single user page
        //   router.push(`/`);
        // }}
        >
          <h1>Player request</h1>
          <h2>
            You want to be part of a team? Send a request to the coach!
            <br /> As soon as you got accepted, your team will be displayed on
            the profile page.
          </h2>

          <label>
            What position do you plan on playing?
            <input
              placeholder="Defender"
              value={positionOnTeam}
              onChange={(event) => {
                setPositionOnTeam(event.currentTarget.value);
              }}
            />
          </label>

          <label>
            Since when have you been playing this sport?
            <input
              placeholder="mm/yyyy"
              value={playingSince}
              onChange={(event) => {
                setPlayingSince(event.currentTarget.value);
              }}
            />
          </label>

          <label>
            Role
            <select
              css={input}
              id="role"
              value={experienceLevel}
              onChange={(event) => {
                setExperienceLevel(event.currentTarget.value);
              }}
            >
              <option value="Beginner">Beginner</option>
              <option value="Advanced">Advanced</option>
              <option value="Professional">Profressional</option>
            </select>
          </label>

          <label>
            Message to the coach
            <textarea
              css={input}
              placeholder="Why do you want to join this team?"
              value={message}
              onChange={(event) => {
                setMessage(event.currentTarget.value);
              }}
            />
          </label>

          <button type="submit">SEND REQUEST</button>
        </form>
      </div>
    </>
  );
}
