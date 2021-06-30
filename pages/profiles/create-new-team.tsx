import { css } from '@emotion/react';
// import Image from 'next/image';
import router from 'next/router';
import { useState } from 'react';
import Layout from '../../components/Layout';
import { darkBlue, largeText, normalText } from '../../util/sharedStyles';
import { RegisterResponse } from '../api/register';

// TODO: Make page invisible for not logged in user

type Props = {
  username: String;
};

export const formContainer = css`
  padding-top: 230px;
  display: flex;
  justify-content: center;
  align-items: center;

  form {
    display: flex;
    flex-direction: column;
    border: 2px solid ${darkBlue};
    box-shadow: 10px 5px 5px ${darkBlue};
    border-radius: 20px;
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
      font-weight: 500;

      input {
        margin: 5px 0 20px 0;
        width: 100%;
        padding: 5px;
      }
    }

    button {
      background-image: url(/images/button_background_lightBlue.PNG);
      background-repeat: no-repeat;
      background-size: cover;
      color: white;
      font-weight: bold;
      border: none;
      padding: 10px 20px;
      width: 100%;
      margin-bottom: 20px;
      cursor: pointer;
    }
  }
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
            console.log('json', json);

            // Todo: Link to single user page
            router.push(`/`);
          }}
        >
          <h1>Your team</h1>
          <h2>
            Tell us your team name and what sport you are planning to play.
          </h2>

          {/* <Image src="/images/teamIcon.png" width="10%" height="10%" /> */}

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
            Date of establishment
            <input
              placeholder="mm/yyyy"
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
