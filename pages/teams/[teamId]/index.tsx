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
  checkIfCoachInTeam,
  checkIfPlayerInTeam,
  getEvents,
  getTeamNameById,
  getUserByValidSessionToken,
} from '../../../util/database';
import {
  filterContainer,
  heading,
  largeText,
  lightBlue,
  link,
  trashButton,
} from '../../../util/sharedStyles';
import { Event, TeamName } from '../../../util/types';

type Props = {
  username: String;
  teamName: TeamName[];
  teamId: number;
  events: Event[];
  userRoleId: number;
  userErrors: { message: string };
};

const mainContainer = css`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-left: 30px;
  padding-right: 30px;

  @media (max-width: 899px) {
    flex-direction: column;
  }
`;

const eventsMainContainer = css`
  display: flex;
  justify-content: space-evenly;
  margin-top: 70px;
  margin-bottom: 50px;
  width: 50%;

  @media (max-width: 899px) {
    width: 100%;
    justify-content: center;
  }

  @media (max-width: 899px) {
    margin-top: 30px;
  }
`;

const eventsContainer = css`
  width: 100%;

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

  .icon {
    min-width: 30px;
    height: 30px;
  }
`;

const eventBody = css`
  border-left: 2px solid ${lightBlue};
  border-right: 2px solid ${lightBlue};
  display: flex;
  justify-content: space-evenly;
  padding: 20px 20px 0 20px;

  @media (max-width: 453px) {
    flex-direction: column;
    align-items: center;
  }
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

  @media (max-width: 768px) {
    .icon {
      min-width: 20px;
      height: 20px;
    }
  }
`;

const eventInfos = css`
  max-width: 50%;

  .icon {
    min-width: 30px;
    height: 30px;
  }

  @media (max-width: 768px) {
    .icon {
      min-width: 20px;
      height: 20px;
    }
  }

  @media (max-width: 768px) {
    max-width: 100%;
  }
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

  .icon {
    min-width: 30px;
    height: 30px;
  }

  @media (max-width: 768px) {
    .icon {
      min-width: 20px;
      height: 20px;
    }
  }

  @media (max-width: 453px) {
    padding: 0;
    border-top: ${lightBlue} solid 2px;
    border-left: none;
    max-width: 100%;
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
  border-top: none;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 50px 10px 30px;
`;

export default function SingleTeamPage(props: Props) {
  console.log(props);

  const [allEvents, setAllEvents] = useState(props.events);
  const [filteredEvents] = useState(allEvents);
  const [allActive, setAllActive] = useState(true);
  const [tournamentsActive, setTournamentActive] = useState(false);
  const [trainingActive, setTrainingActive] = useState(false);
  const [socialActive, setSocialActive] = useState(false);

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

  const errors = props.userErrors;
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (errors) {
    return (
      <Layout>
        <Head>
          <title>Error</title>
        </Head>
        <div>Error: {errors.message}</div>
      </Layout>
    );
  }

  return (
    <>
      <Head>
        <title>Team Vision - Team Profile</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout username={props.username} />
      <SubMenu userRoleId={props.userRoleId} teamId={props.teamId} />

      <h1 css={heading}>Welcome to the {props.teamName[0].teamName}</h1>
      <div css={mainContainer}>
        <div css={filterContainer}>
          <button
            className={allActive === true ? 'button-active' : 'button-inactive'}
            onClick={() => {
              handleAllEventsClick();
              setAllActive(true);
              setTrainingActive(false);
              setTournamentActive(false);
              setSocialActive(false);
            }}
          >
            <span>All events</span>
          </button>
          <button
            className={
              trainingActive === true ? 'button-active' : 'button-inactive'
            }
            onClick={() => {
              handleAllTrainingsClick();
              setTrainingActive(true);
              setTournamentActive(false);
              setSocialActive(false);
              setAllActive(false);
            }}
          >
            <BiIcons.BiDumbbell className="icon" />
            <span>Trainings</span>
          </button>

          <button
            className={
              tournamentsActive === true ? 'button-active' : 'button-inactive'
            }
            onClick={() => {
              handleAllTournamentsClick();
              setTrainingActive(false);
              setTournamentActive(true);
              setSocialActive(false);
              setAllActive(false);
            }}
          >
            <FaIcons.FaTrophy className="icon" />
            <span>Tournaments</span>
          </button>
          <button
            className={
              socialActive === true ? 'button-active' : 'button-inactive'
            }
            onClick={() => {
              handleAllSocialsClick();
              setTrainingActive(false);
              setTournamentActive(false);
              setSocialActive(true);
              setAllActive(false);
            }}
          >
            <GiIcons.GiPartyPopper className="icon" />
            <span>Socials</span>
          </button>
        </div>

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
                            <BiIcons.BiDumbbell className="icon" />
                          ) : undefined}
                          {event.eventType === 'Tournament' ? (
                            <FaIcons.FaTrophy className="icon" />
                          ) : undefined}
                          {event.eventType === 'Social' ? (
                            <GiIcons.GiPartyPopper className="icon" />
                          ) : undefined}
                          <h2>{event.eventType}</h2>
                        </div>
                        {props.userRoleId === 1 ? (
                          <button
                            data-cy="delete-event"
                            css={trashButton}
                            onClick={async (singleEvent) => {
                              singleEvent.preventDefault();

                              if (
                                window.confirm(
                                  'Are you sure you want to delete this event?',
                                )
                              ) {
                                await fetch(`/api/teams-by-team-id/events`, {
                                  method: 'DELETE',
                                  headers: {
                                    'Content-Type': 'application/json',
                                  },
                                  body: JSON.stringify({
                                    id: event.id,
                                  }),
                                });

                                const deleteEvent = () => {
                                  // create a copy of the allEvents array
                                  const newEventArray = [...allEvents];
                                  // find the event.id that has been clicked on

                                  const deletedEvent = newEventArray.find(
                                    (e) => e.id === event.id,
                                  );
                                  // get the index of the event in the copy of the array
                                  if (deletedEvent) {
                                    const deletedEventIndex =
                                      newEventArray.indexOf(deletedEvent);
                                    // splice the index out of the array

                                    newEventArray.splice(deletedEventIndex, 1);
                                  }

                                  return newEventArray;
                                };
                                // set the state to the result of the function
                                setAllEvents(deleteEvent());
                              }
                            }}
                          >
                            <BsIcons.BsTrashFill className="btn" />
                          </button>
                        ) : undefined}
                      </div>

                      <div css={eventBody}>
                        <div css={eventInfos}>
                          <div css={eventDate}>
                            <AiIcons.AiOutlineCalendar className="icon" />
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
                            <AiIcons.AiOutlineClockCircle className="icon" />
                            <p>
                              <span>MEETING: </span>
                              {event.meetingTime}
                            </p>
                          </div>

                          <div css={eventSubBody}>
                            <AiIcons.AiOutlineClockCircle className="icon" />
                            <p>
                              <span>START:</span>
                              {event.startTime}
                            </p>
                          </div>

                          <div css={eventSubBody}>
                            <AiIcons.AiOutlineClockCircle className="icon" />
                            <p>
                              <span>END:</span>
                              {event.endTime}
                            </p>
                          </div>

                          <div css={eventSubBody}>
                            <GrIcons.GrLocation className="icon" />
                            <p>
                              <span>LOCATION:</span>
                              {event.eventLocation}
                            </p>
                          </div>
                        </div>

                        <div css={eventMessage}>
                          <div>
                            <BiIcons.BiMessageDetail className="icon" />
                            <h3>Message from your coach</h3>
                          </div>
                          <p>{event.eventDescription}</p>
                        </div>
                      </div>

                      <div css={eventFooter}>
                        <Link href={`/teams/${props.teamId}/${event.id}`}>
                          <a css={link}>SEE EVENT DETAILS</a>
                        </Link>
                      </div>
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

  const user = (await getUserByValidSessionToken(sessionToken)) ?? null;

  console.log('user', user);
  const userRoleId = user?.userRoleId ?? null;

  let userErrors = null;

  if (!user) {
    userErrors = { message: 'Access denied' };
  } else {
    if (user.id && teamId) {
      const isPlayerInTeam = await checkIfPlayerInTeam(user.id, teamId);
      const isCoachInTeam = await checkIfCoachInTeam(user.id, teamId);

      if (
        isPlayerInTeam &&
        isPlayerInTeam[0].count === '0' &&
        isCoachInTeam &&
        isCoachInTeam[0].count === '0'
      ) {
        userErrors = { message: 'You are not allowed to visit this team.' };
      }
    }
  }

  return {
    props: {
      teamId,
      teamName,
      events,
      userRoleId,
      userErrors,
    },
  };
}
