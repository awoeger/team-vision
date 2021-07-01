import { css } from '@emotion/react';
import router from 'next/router';
import { useState } from 'react';
import Layout from '../../components/Layout';
import { RegisterResponse } from '../api/register';

type Props = {
  username: String;
};

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
      <Layout username={props.username} />
      <div>
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            const response = await fetch(
              `/api/teams-by-teamname/create-new-event`,
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  eventType: eventType,
                  startDate: startDate,
                  endDate: endDate,
                  meetingTime: meetingTime,
                  startTime: startTime,
                  endTime: endTime,
                  eventLocation: eventLocation,
                  eventDescription: eventDescription,
                }),
              },
            );

            const json = (await response.json()) as RegisterResponse;

            // Todo: Link to single team page
            router.push(`/`);
          }}
        >
          <h1>Create an event</h1>
          <h2>
            Tell your players all important infos for the upcoming events.
          </h2>

          <label>
            Event Type
            <select
              id="eventType"
              value={eventType}
              onChange={(event) => {
                setEventType(event.currentTarget.value);
              }}
            >
              <option>Please select</option>
              <option value="1"> Training</option>
              <option value="2">Tournament</option>
              <option value="3">Social</option>
            </select>
          </label>

          <label>
            Start Date
            <input
              type="date"
              placeholder="dd/mm/yyyy"
              value={startDate}
              onChange={(event) => {
                setStartDate(event.currentTarget.value);
              }}
            />
          </label>

          <label>
            End Date
            <input
              type="date"
              placeholder="dd/mm/yyyy"
              value={endDate}
              onChange={(event) => {
                setEndDate(event.currentTarget.value);
              }}
            />
          </label>

          <label>
            Meeting Time
            <input
              type="time"
              placeholder="xx:xx"
              value={meetingTime}
              onChange={(event) => {
                setMeetingTime(event.currentTarget.value);
              }}
            />
          </label>

          <label>
            Start Time
            <input
              type="time"
              placeholder="xx:xx"
              value={startTime}
              onChange={(event) => {
                setStartTime(event.currentTarget.value);
              }}
            />
          </label>

          <label>
            End Time
            <input
              type="time"
              placeholder="xx:xx"
              value={endTime}
              onChange={(event) => {
                setEndTime(event.currentTarget.value);
              }}
            />
          </label>

          <label>
            Event Location
            <input
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
              placeholder="Please bring cleats and a mouthguard"
              value={eventDescription}
              onChange={(event) => {
                setEventDescription(event.currentTarget.value);
              }}
            />
          </label>

          <button type="submit">CREATE EVENT</button>
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
