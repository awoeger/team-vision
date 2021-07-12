import 'bootstrap/dist/css/bootstrap.min.css';
import { css } from '@emotion/react';
import Image from 'next/image';
import router from 'next/router';
import { useState } from 'react';
import Layout from '../../components/Layout';
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
};

export const formContainer = css`
  display: flex;
  align-items: center;
  padding-left: 100px;

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

      input {
        margin: 5px 0 20px 0;
        width: 100%;
        padding: 5px;
        font-size: ${normalText};
      }
    }
  }
`;

const imageContainer = css`
  display: flex;
  justify-content: center;
  padding-left: 50px;
`;

export default function CreateNewTeamForm(props: Props) {
  const [teamName, setTeamName] = useState('');
  const [sportType, setSportType] = useState('');
  const [foundedAt, setFoundedAt] = useState('');

  return (
    <>
      <Layout username={props.username} />
      <div css={formContainer}>
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            const response = await fetch(
              `/api/users-by-username/create-new-team`,
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

            router.push(`/profiles/${props.username}`);
          }}
        >
          <h1>Your team</h1>
          <h2>
            Tell us your team name and what sport you are planning to play.
          </h2>

          <label htmlFor="Team name">
            Team name
            <input
              required
              minLength={3}
              maxLength={50}
              name="Team name"
              placeholder="Chicago Bulls"
              value={teamName}
              onChange={(event) => {
                setTeamName(event.currentTarget.value);
              }}
            />
          </label>

          <label htmlFor="Sport type">
            Sport type
            <input
              required
              minLength={3}
              maxLength={50}
              name="Sport type"
              placeholder="Basketball"
              value={sportType}
              onChange={(event) => {
                setSportType(event.currentTarget.value);
              }}
            />
          </label>

          <label htmlFor="Date of establishment">
            Date of establishment
            <input
              required
              minLength={7}
              maxLength={7}
              name="Date of establishment"
              placeholder="mm/yyyy"
              value={foundedAt}
              onChange={(event) => {
                setFoundedAt(event.currentTarget.value);
              }}
            />
          </label>

          <button css={button} type="submit">
            CREATE NEW TEAM
          </button>
        </form>
        <div css={imageContainer}>
          <Image
            alt="Logo Icon"
            src="/images/rugby-players.png"
            width="750px"
            height="750px"
          />
        </div>
      </div>
    </>
  );
}
