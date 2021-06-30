import { css } from '@emotion/react';
import router from 'next/router';
import { useState } from 'react';
import Layout from '../../components/Layout';
import { getAllTeams } from '../../util/database';
import { RegisterResponse } from '../api/register';
import { formContainer } from './create-new-team';

// TODO: Make page invisible for not logged in user
// TODO: Get request to get all teams to map over them in the team options

type Props = {
  username: String;
};

const input = css`
  margin: 5px 0 20px 0;
  width: 100%;
  padding: 5px;
`;

const textarea = css`
  margin: 5px 0 20px 0;
  width: 100%;
  padding: 5px;
  line-height: 40px;
  text-align: left;
`;

export default function PlayerRequest(props: Props) {
  const [teamChoice, setTeamChoice] = useState('');
  const [positionOnTeam, setPositionOnTeam] = useState('');
  const [playingSince, setPlayingSince] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('Beginner');
  const [message, setMessage] = useState('');

  return (
    <>
      <Layout username={props.username} />
      <div css={formContainer}>
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            const response = await fetch(
              `/api/users-by-username/playerRequest`,
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  positionOnTeam: positionOnTeam,
                  playingSince: playingSince,
                  experienceLevel: experienceLevel,
                  message: message,
                }),
              },
            );

            const json = (await response.json()) as RegisterResponse;
            console.log('json', json);

            // Todo: Link to single user page
            router.push(`/`);
          }}
        >
          <h1>Player request</h1>
          <h2>
            You want to be part of a team? Send a request to the coach!
            <br /> As soon as you got accepted, your team will be displayed on
            the profile page.
          </h2>

          <label>
            Which team would you like to apply for?
            <select
              css={input}
              id="teamId"
              value={teamChoice}
              onChange={(event) => {
                setTeamChoice(event.currentTarget.value);
              }}
            >
              <option value="Beginner">Beginner</option>
              <option value="Advanced">Advanced</option>
              <option value="Professional">Profressional</option>
            </select>
          </label>

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
            How would you rate your experience level?
            <select
              css={input}
              id="experienceLevel"
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
            Send your message to the coach.
            <textarea
              css={textarea}
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

export async function getServerSideProps() {
  const allTeams = await getAllTeams();

  return {
    props: {
      allTeams,
    },
  };
}
