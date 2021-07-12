import { css } from '@emotion/react';
import Image from 'next/image';
import router from 'next/router';
import { useState } from 'react';
import Layout from '../../components/Layout';
import { getAllTeamNamesandId } from '../../util/database';
import {
  button,
  darkBlue,
  largeText,
  normalText,
} from '../../util/sharedStyles';
import { RegisterResponse } from '../api/register';

// TODO: Make page invisible for not logged in user

type Props = {
  username: String;
  allTeamNamesandIdforCoach: TeamNameandIdforCoach[];
};

type TeamNameandIdforCoach = {
  id: Number;
  teamName: String;
};

export const formContainer = css`
  display: flex;
  align-items: center;
  margin-top: 30px;
  margin-bottom: 30px;

  form {
    display: flex;
    flex-direction: column;
    border: 2px solid ${darkBlue};
    box-shadow: 10px 5px 5px ${darkBlue};
    border-radius: 15px;
    padding: 30px;
    width: 40%;

    h1 {
      color: ${darkBlue};
      font-size: ${largeText};
      text-align: center;
      padding-bottom: 20px;
    }

    h2 {
      color: ${darkBlue};
      font-size: ${normalText};
      font-weight: 400;
      text-align: center;
      padding-bottom: 30px;
    }

    label {
      display: flex;
      flex-direction: column;
      text-align: left;
      color: ${darkBlue};
      font-weight: 600;

      input,
      select {
        margin: 5px 0 20px 0;
        width: 100%;
        padding: 5px;
        font-size: ${normalText};
      }
    }
  }
`;

const textarea = css`
  margin: 5px 0 20px 0;
  width: 100%;
  padding-left: 10px;
  font-size: ${normalText};
  text-align: left;
  line-height: 40px;
`;

const imageContainer = css`
  display: flex;
  justify-content: center;
  padding-left: 50px;
`;

export default function PlayerRequest(props: Props) {
  const [teamChoice, setTeamChoice] = useState('');
  const [positionOnTeam, setPositionOnTeam] = useState('');
  const [playingSince, setPlayingSince] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [message, setMessage] = useState('');

  return (
    <>
      <Layout username={props.username} />
      <div css={formContainer}>
        <div css={imageContainer}>
          <Image
            alt="Logo Icon"
            src="/images/baseball-player.jpg"
            width="750px"
            height="750px"
          />
        </div>
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            const response = await fetch(
              `/api/users-by-username/player-request`,
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  teamChoice: teamChoice,
                  positionOnTeam: positionOnTeam,
                  playingSince: playingSince,
                  experienceLevel: experienceLevel,
                  message: message,
                }),
              },
            );

            const json = (await response.json()) as RegisterResponse;

            // Todo: Link to single user page
            router.push(`/profiles/${props.username}`);
          }}
        >
          <h1>Player request</h1>
          <h2>
            You want to be part of a team? Send a request to the coach!
            <br /> As soon as you get accepted,
            <br /> your team will be displayed on your profile page.
          </h2>

          <label>
            Which team would you like to apply for?
            <select
              id="teamChoice"
              value={teamChoice}
              onChange={(event) => {
                setTeamChoice(event.currentTarget.value);
              }}
            >
              <option>Please select</option>
              {props.allTeamNamesandIdforCoach.map((team) => {
                return (
                  <option key={team.id} value={team.id}>
                    {team.teamName}
                  </option>
                );
              })}
            </select>
          </label>

          <label>
            What position do you plan on playing?
            <input
              required
              minLength={3}
              maxLength={50}
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
              required
              minLength={7}
              maxLength={7}
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
              required
              id="experienceLevel"
              value={experienceLevel}
              onChange={(event) => {
                setExperienceLevel(event.currentTarget.value);
              }}
            >
              <option>Please select</option>
              <option value="Beginner">Beginner</option>
              <option value="Advanced">Advanced</option>
              <option value="Professional">Professional</option>
            </select>
          </label>

          <label>
            Send your message to the coach.
            <textarea
              required
              minLength={5}
              maxLength={100}
              css={textarea}
              placeholder="Why do you want to join this team?"
              value={message}
              onChange={(event) => {
                setMessage(event.currentTarget.value);
              }}
            />
          </label>

          <button css={button} type="submit">
            SEND REQUEST
          </button>
        </form>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const allTeamNamesandIdforCoach = await getAllTeamNamesandId();

  return {
    props: {
      allTeamNamesandIdforCoach,
    },
  };
}
