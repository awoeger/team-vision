import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import * as AiIcons from 'react-icons/ai';
import * as BiIcons from 'react-icons/bi';
import * as BsIcons from 'react-icons/bs';
import * as FaIcons from 'react-icons/fa';
import * as GiIcons from 'react-icons/gi';
import * as GrIcons from 'react-icons/gr';
import Layout from '../../../components/Layout';
import SubMenu from '../../../components/SubMenu';
import {
  getEvents,
  getTeamNameById,
  getUserByValidSessionToken,
} from '../../../util/database';
import {
  darkBlue,
  largeText,
  lightBlue,
  link,
  orange,
} from '../../../util/sharedStyles';

type Props = {
  username: String;
  teamName: TeamName[];
  teamId: Number;
  events: Event[];
  userRoleId: Number;
};

type Event = {
  id: number;
  eventType: string;
  teamId: number;
  formattedStartDay: string;
  formattedEndDay: string;
  startTime: string;
  endTime: string;
  meetingTime: string;
  eventLocation: string;
  eventDescription: string;
};

type TeamName = {
  teamName: string;
};

type DeleteEventRequest = {
  id: Number;
};

const heading = css`
  text-align: center;
  margin-top: 40px;
  font-size: 2em;
`;

const mainContainer = css`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const eventsMainContainer = css`
  display: flex;
  justify-content: flex-end;
  margin-top: 70px;
  margin-bottom: 50px;
  margin-left: 80px;
  width: 70%;
`;

const eventsContainer = css`
  width: 60%;

  h1 {
    text-align: center;
    margin-bottom: 30px;
    font-size: ${largeText};
    text-transform: uppercase;
    font-weight: 600;
    margin-bottom: 30px;
    word-spacing: 2px;
  }

  > div {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    gap: 50px 100px;
    justify-items: stretch;
  }
`;

const eventHeader = css`
  display: flex;
  align-items: center;
  background-image: url('/images/button_background_lightBlue.PNG');
  background-size: cover;
  background-repeat: no-repeat;
  justify-content: space-between;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 15px 20px;

  div {
    display: flex;
    align-items: center;
    color: white;

    h2 {
      color: white;
      font-size: ${largeText};
      margin-left: 10px;
      text-transform: uppercase;
      margin: 0 0 0 20px;
    }
  }

  button {
    padding: 10px;
    color: ${orange};
    background: rgba(255, 255, 255, 0.7);
    border-radius: 90%;
    border: none;
    cursor: pointer;
  }
`;

const eventBody = css`
  border-left: 2px solid ${lightBlue};
  border-right: 2px solid ${lightBlue};
  display: flex;
  justify-content: space-evenly;

  padding: 20px;
`;

const eventDate = css`
  display: flex;
  align-items: center;

  h3 {
    padding-left: 10px;
  }
`;

const eventSubBody = css`
  display: flex;
  align-items: center;
  padding-right: 20px;

  p {
    margin-left: 10px;

    span {
      font-weight: 500;
      margin-right: 5px;
    }
  }
`;

const eventInfos = css`
  max-width: 50%;
`;

const eventMessage = css`
  max-width: 50%;
  border-left: 2px solid ${lightBlue};
  padding-left: 20px;

  div {
    display: flex;
    align-items: center;
  }

  h3 {
    padding-left: 10px;
  }
`;

const noEventsContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  h2 {
    font-size: ${largeText};
    font-weight: 600;
  }
`;

const eventFooter = css`
  border: 2px solid ${lightBlue};
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 10px 30px;
`;

const filterContainer = css`
  display: flex;
  flex-direction: column;
  margin: 100px 0 0 100px;
  position: fixed;
  left: 150px;
  top: 210px;

  button {
    width: 100%;
    margin: 30px 0px;
    padding: 15px;
    text-transform: uppercase;
    font-size: 20px;
    font-weight: 500;
    color: ${darkBlue};
    background: white;
    border: ${lightBlue} 3px solid;
    border-radius: 10px;
    cursor: pointer;

    :hover {
      background: rgb(28 154 150 / 50%);
    }
  }
`;

export default function SingleTeamPage(props: Props) {
  const [allEvents, setAllEvents] = useState(props.events);
  const [filteredEvents] = useState(allEvents);

  // onClick functions for filters
  const handleAllEventsClick = () => {
    return setAllEvents(filteredEvents);
  };

  const handleAllTrainingsClick = () => {
    const allTrainings = filteredEvents.filter(
      (training) => training.eventType === 'Training',
    );

    return setAllEvents(allTrainings);
  };

  const handleAllTournamentsClick = () => {
    const allTournaments = filteredEvents.filter(
      (tournament) => tournament.eventType === 'Tournament',
    );

    return setAllEvents(allTournaments);
  };

  const handleAllSocialsClick = () => {
    const allSocials = filteredEvents.filter(
      (social) => social.eventType === 'Social',
    );

    return setAllEvents(allSocials);
  };

  return (
    <>
      <Head>
        <title>Team Vision</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout username={props.username} />
      <SubMenu userRoleId={props.userRoleId} teamId={props.teamId} />

      <h1 css={heading}>Welcome to the {props.teamName[0].teamName}</h1>
      <div css={mainContainer}>
        {/* Filter buttons start */}
        <div css={filterContainer}>
          <button onClick={handleAllEventsClick}>Show all events</button>
          <button onClick={handleAllTrainingsClick}>Show only trainings</button>
          <button onClick={handleAllTournamentsClick}>
            Show only tournaments
          </button>
          <button onClick={handleAllSocialsClick}>Show only socials</button>
        </div>
        {/* Filter buttons end */}

        {props.events.length === 0 ? (
          <div css={noEventsContainer}>
            <h2>There are no events scheduled for this team yet.</h2>
          </div>
        ) : (
          <div css={eventsMainContainer}>
            <div css={eventsContainer}>
              <div>
                {allEvents.map((event) => {
                  return (
                    <div key={event.id}>
                      <div css={eventHeader}>
                        <div>
                          {event.eventType === 'Training' ? (
                            <BiIcons.BiDumbbell size={30} />
                          ) : undefined}
                          {event.eventType === 'Tournament' ? (
                            <FaIcons.FaTrophy size={30} />
                          ) : undefined}
                          {event.eventType === 'Social' ? (
                            <GiIcons.GiPartyPopper size={30} />
                          ) : undefined}
                          <h2>{event.eventType}</h2>
                        </div>
                        {props.userRoleId === 1 ? (
                          <button
                            onClick={async (singleEvent) => {
                              singleEvent.preventDefault();

                              const response = await fetch(
                                `/api/teams-by-team-id/events`,
                                {
                                  method: 'DELETE',
                                  headers: {
                                    'Content-Type': 'application/json',
                                  },
                                  body: JSON.stringify({
                                    id: event.id,
                                  }),
                                },
                              );

                              const json =
                                (await response.json()) as DeleteEventRequest;

                              const deleteEvent = () => {
                                // create a copy of the allEvents array
                                const newEventArray = [...allEvents];
                                // find the event.id that has been clicked on
                                const deletedEvent = newEventArray.find(
                                  (e) => e.id === event.id,
                                );
                                // get the index of the event in the copy of the array
                                const deletedEventIndex =
                                  newEventArray.indexOf(deletedEvent);
                                // splice the index out of the array
                                if (deletedEvent) {
                                  newEventArray.splice(deletedEventIndex, 1);
                                }

                                return newEventArray;
                              };
                              // set the state to the result of the function
                              setAllEvents(deleteEvent());
                            }}
                          >
                            <BsIcons.BsTrashFill size={20} />
                          </button>
                        ) : undefined}
                      </div>

                      <div css={eventBody}>
                        <div css={eventInfos}>
                          <div css={eventDate}>
                            <AiIcons.AiOutlineCalendar size={30} />
                            {event.formattedStartDay ===
                            event.formattedEndDay ? (
                              <h3>{event.formattedStartDay}</h3>
                            ) : (
                              <h3>
                                {event.formattedStartDay} -{' '}
                                {event.formattedEndDay}
                              </h3>
                            )}
                          </div>

                          <div css={eventSubBody}>
                            <AiIcons.AiOutlineClockCircle size={30} />
                            <p>
                              <span>MEETING: </span>
                              {event.meetingTime}
                            </p>
                          </div>

                          <div css={eventSubBody}>
                            <AiIcons.AiOutlineClockCircle size={30} />
                            <p>
                              <span>START:</span>
                              {event.startTime}
                            </p>
                          </div>

                          <div css={eventSubBody}>
                            <AiIcons.AiOutlineClockCircle size={30} />
                            <p>
                              <span>END:</span>
                              {event.endTime}
                            </p>
                          </div>

                          <div css={eventSubBody}>
                            <GrIcons.GrLocation size={30} />
                            <p>
                              <span>LOCATION:</span>
                              {event.eventLocation}
                            </p>
                          </div>
                        </div>

                        <div css={eventMessage}>
                          <div>
                            <BiIcons.BiMessageDetail size={30} />
                            <h3>Message from your coach</h3>
                          </div>
                          <p>{event.eventDescription}</p>
                        </div>
                      </div>

                      {props.userRoleId === 2 ? (
                        <div css={eventFooter}>
                          <p>Total attendees: 18</p>

                          <Link href={`/teams/${props.teamId}/${event.id}`}>
                            <a css={link}>SEE EVENT DETAILS</a>
                          </Link>
                        </div>
                      ) : (
                        <div css={eventFooter}>
                          <p>Total attendees: 18</p>
                          <Link href={`/teams/${props.teamId}/${event.id}`}>
                            <a css={link}>See event details</a>
                          </Link>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const teamIdString = context.query.teamId;
  const teamId = Number(teamIdString);
  const events = await getEvents(teamId);
  const teamName = await getTeamNameById(teamId);

  const sessionToken = context.req.cookies.sessionToken;

  const user = await getUserByValidSessionToken(sessionToken);
  const userRoleId = user?.userRoleId;

  return {
    props: {
      teamId,
      teamName,
      events,
      userRoleId,
    },
  };
}
