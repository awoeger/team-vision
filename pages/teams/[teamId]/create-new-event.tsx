import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import router from 'next/router';
import { useState } from 'react';
import Layout from '../../../components/Layout';
import SubMenu from '../../../components/SubMenu';
import { getUserByValidSessionToken } from '../../../util/database';
import {
  button,
  darkBlue,
  largeText,
  normalText,
} from '../../../util/sharedStyles';

type Props = {
  username: String;
  teamId: Number;
  userRoleId: Number;
};

const mainContainer = css`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const formContainer = css`
  display: flex;
  align-items: center;
  margin-left: 70px;

  form {
    display: flex;
    flex-direction: column;
    border: 2px solid ${darkBlue};
    box-shadow: 10px 5px 5px ${darkBlue};
    border-radius: 15px;
    padding: 30px;
    width: 50%;

    h1 {
      color: ${darkBlue};
      font-size: ${largeText};
      text-align: center;
      padding-bottom: 20px;
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

      textarea {
        margin: 5px 0 20px 0;
        width: 100%;
        padding: 5px;
        font-size: ${normalText};
        text-align: left;
        line-height: 40px;
      }
    }
  }

  @media (max-width: 1024px) {
    form {
      width: 60%;
      margin-right: 100px;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column-reverse;

    form {
      width: 70%;
      margin-top: 40px;
    }
  }
`;

const neighborInputs = css`
  display: flex;

  .start,
  .mtime {
    width: 90%;
    margin-right: 20px;
  }

  .end,
  .time {
    width: 100%;
  }
`;

const imageContainer = css`
  display: flex;
  justify-content: center;
  padding-left: 15px;
  margin-right: 50px;

  @media (max-width: 1024px) {
    width: 90%;
    padding: 0;
    margin: 0;
  }

  @media (max-width: 768px) {
    width: 40%;
    margin-top: 30px;
  }
`;

export default function CreateEvent(props: Props) {
  const [eventType, setEventType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [meetingTime, setMeetingTime] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventDescription, setEventDescription] = useState('');

  return (
    <>
      <Head>
        <title>Team Vision - Create new event</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout username={props.username} />
      <SubMenu userRoleId={props.userRoleId} teamId={props.teamId} />
      <div css={mainContainer}>
        <div css={formContainer}>
          <div css={imageContainer}>
            <Image
              alt="Logo Icon"
              src="/images/female-runner.png"
              width="400px"
              height="730px"
            />
          </div>
          <form
            onSubmit={async (event) => {
              event.preventDefault();
              await fetch(`/api/teams-by-team-id/create-new-event`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  eventType: eventType,
                  teamId: props.teamId,
                  startDate: startDate,
                  endDate: endDate,
                  meetingTime: meetingTime,
                  startTime: startTime,
                  endTime: endTime,
                  eventLocation: eventLocation,
                  eventDescription: eventDescription,
                }),
              });

              router.push(`/teams/${props.teamId}`);
            }}
          >
            <h1>Create an event</h1>

            <label>
              Event Type
              <select
                data-cy="event-eventtype"
                required
                id="eventType"
                value={eventType}
                onChange={(event) => {
                  setEventType(event.currentTarget.value);
                }}
              >
                <option>Please select</option>
                <option value="Training">Training</option>
                <option value="Tournament">Tournament</option>
                <option value="Social">Social</option>
              </select>
            </label>

            <div css={neighborInputs}>
              <label className="start">
                Start Date
                <input
                  data-cy="event-start-date"
                  required
                  type="date"
                  placeholder="dd/mm/yyyy"
                  value={startDate}
                  onChange={(event) => {
                    setStartDate(event.currentTarget.value);
                  }}
                />
              </label>

              <label className="end">
                End Date
                <input
                  data-cy="event-end-date"
                  required
                  type="date"
                  placeholder="dd/mm/yyyy"
                  value={endDate}
                  onChange={(event) => {
                    setEndDate(event.currentTarget.value);
                  }}
                />
              </label>
            </div>

            <div css={neighborInputs}>
              <label className="mtime">
                Meeting Time
                <input
                  data-cy="event-meeting-time"
                  required
                  placeholder="hh:mm"
                  value={meetingTime}
                  onChange={(event) => {
                    setMeetingTime(event.currentTarget.value);
                  }}
                />
              </label>

              <label className="mtime">
                Start Time
                <input
                  data-cy="event-start-time"
                  required
                  placeholder="hh:mm"
                  value={startTime}
                  onChange={(event) => {
                    setStartTime(event.currentTarget.value);
                  }}
                />
              </label>

              <label className="time">
                End Time
                <input
                  data-cy="event-end-time"
                  required
                  placeholder="hh:mm"
                  value={endTime}
                  onChange={(event) => {
                    setEndTime(event.currentTarget.value);
                  }}
                />
              </label>
            </div>

            <label>
              Event Location
              <input
                data-cy="event-location"
                required
                placeholder="ASKÖ Sportzentrum, 1020 Wien"
                value={eventLocation}
                onChange={(event) => {
                  setEventLocation(event.currentTarget.value);
                }}
              />
            </label>

            <label>
              Description
              <textarea
                data-cy="event-description"
                placeholder="Please bring cleats and a mouthguard"
                value={eventDescription}
                onChange={(event) => {
                  setEventDescription(event.currentTarget.value);
                }}
              />
            </label>

            <button css={button} type="submit">
              CREATE EVENT
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const teamId = context.query.teamId;

  const sessionToken = context.req.cookies.sessionToken;
  const user = await getUserByValidSessionToken(sessionToken);
  const userRoleId = user?.userRoleId;

  return {
    props: {
      teamId,
      userRoleId,
    },
  };
}
