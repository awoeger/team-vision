import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import * as BiIcons from 'react-icons/bi';
import * as FaIcons from 'react-icons/fa';
import * as GiIcons from 'react-icons/gi';
import Layout from '../../../components/Layout';
import SubMenu from '../../../components/SubMenu';
import {
  checkIfCoachInTeam,
  checkIfPlayerInTeam,
  getAllExercises,
  getUserByValidSessionToken,
} from '../../../util/database';
import {
  darkBlue,
  heading,
  largeText,
  lightBlue,
  normalText,
} from '../../../util/sharedStyles';
import { Exercise } from '../../../util/types';
import { mainContainer } from './';

type Props = {
  username: String;
  teamId: Number;
  userRoleId: Number;
  allExercises: Exercise[];
  userErrors: { message: string };
};

const exerciseMainContainer = css`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 50px 100px;
  justify-items: center;
  margin-top: 50px;
`;

const exerciseSubContainer = css`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 90%;
  color: white;
  margin-top: 20px;

  h2 {
    margin-left: 20px;
    text-transform: uppercase;
    color: white;
  }
`;

const exerciseHeader = css`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-image: url('/images/button_background_lightBlue.PNG');
  background-size: cover;
  background-repeat: no-repeat;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 15px 20px;
  width: 100%;

  .icon {
    width: 30px;
    height: 30px;
  }
`;

const exerciseBody = css`
  display: flex;
  align-items: center;
  color: ${darkBlue};
  font-size: ${largeText};
  width: 100%;
  padding: 20px;
  border: 2px solid ${lightBlue};
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;

  div {
    width: 50%;
  }

  .videoDiv {
    background: #cefffd80;
    padding: 100px;
    text-align: center;
    border: 1px solid ${darkBlue};
  }

  h3 {
    margin: 0;
  }

  p {
    margin-left: 10px;
    margin-right: 20px;
    display: flex;
    align-items: center;
  }

  span {
    font-weight: 500;
    margin-left: 10px;
  }

  .icon {
    width: 25px;
    height: 25px;
  }

  @media (max-width: 1024px) {
    font-size: ${normalText};

    .videoDiv {
      padding: 40px;
    }

    .icon {
      display: none;
    }
  }

  @media (max-width: 768px) {
    p,
    span {
      font-size: 16px;
      margin: 2px;
    }

    div {
      margin: 10px;
    }
  }

  @media (max-width: 635px) {
    flex-direction: column;

    div {
      width: 100%;
    }
  }
`;

// Container for filter functionality
export const filterContainer = css`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  margin-right: 30px;

  .button-active {
    background: rgb(28 154 150);
    color: white;
  }

  .button-inactive {
    background: white;
  }

  button {
    width: 100%;
    margin: 30px 0px;
    padding: 15px;
    text-transform: uppercase;
    font-size: 18px;
    font-weight: 600;
    color: ${darkBlue};
    border: ${lightBlue} 3px solid;
    border-radius: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;

    span {
      margin-left: 20px;
    }

    :hover {
      background: rgb(28 154 150);
      color: white;
    }

    :active {
      transform: translate(0, 3px);
      background: rgb(28 154 150);
      color: white;
    }

    button {
      font-size: ${normalText};
    }
  }

  @media (max-width: 899px) {
    flex-direction: row;
    margin-top: 30px;
    justify-content: space-between;

    div {
      display: flex;
    }

    button {
      width: 22%;
      margin: 10px;
      font-size: 16px;
      text-align: center;

      span {
        margin: 0;
      }

      .icon {
        display: none;
      }
    }
  }

  @media (max-width: 777px) {
    button {
      font-size: 0.8em;
    }

    @media (max-width: 644px) {
      flex-wrap: wrap;
    }
  }

  @media (max-width: 621px) {
    button {
      width: 40%;
      margin: 10px;
      text-align: center;
    }
  }

  @media (max-width: 390px) {
    button {
      padding: 10px 5px;
    }

    span {
      font-size: 0.9em;
    }
  }
`;

export default function Exercises(props: Props) {
  const [allExercises, setAllExercises] = useState(props.allExercises);
  const [filteredExercises] = useState(allExercises);
  const [allActive, setAllActive] = useState(true);
  const [armsActive, setArmsActive] = useState(false);
  const [legsActive, setLegsActive] = useState(false);
  const [coreActive, setCoreActive] = useState(false);
  const [agilityActive, setAgilityActive] = useState(false);

  const handleAllExercisesClick = () => {
    return setAllExercises(filteredExercises);
  };

  const handleAllArmExercisesClick = () => {
    const allArms = filteredExercises.filter(
      (exercise) => exercise.bodypart === 'Arms',
    );

    return setAllExercises(allArms);
  };

  const handleAllLegsExercisesClick = () => {
    const allLegs = filteredExercises.filter(
      (exercise) => exercise.bodypart === 'Legs',
    );

    return setAllExercises(allLegs);
  };

  const handleAllCoreExercisesClick = () => {
    const allCore = filteredExercises.filter(
      (exercise) => exercise.bodypart === 'Core',
    );

    return setAllExercises(allCore);
  };

  const handleAllAgilityExercisesClick = () => {
    const allAgility = filteredExercises.filter(
      (exercise) => exercise.bodypart === 'Agility',
    );

    return setAllExercises(allAgility);
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
        <title>Team Vision - Exercises</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout username={props.username} />
      <SubMenu userRoleId={props.userRoleId} teamId={props.teamId} />
      <h1 css={heading}>Exercises</h1>
      <div css={mainContainer}>
        <div css={filterContainer}>
          <button
            className={allActive === true ? 'button-active' : 'button-inactive'}
            onClick={() => {
              handleAllExercisesClick();
              setAllActive(true);
              setArmsActive(false);
              setCoreActive(false);
              setLegsActive(false);
              setAgilityActive(false);
            }}
          >
            All Exercises
          </button>

          <button
            className={
              armsActive === true ? 'button-active' : 'button-inactive'
            }
            onClick={() => {
              handleAllArmExercisesClick();
              setAllActive(false);
              setArmsActive(true);
              setCoreActive(false);
              setLegsActive(false);
              setAgilityActive(false);
            }}
          >
            <GiIcons.GiBiceps className="icon" />
            <span>Arms</span>
          </button>

          <button
            className={
              coreActive === true ? 'button-active' : 'button-inactive'
            }
            onClick={() => {
              handleAllCoreExercisesClick();
              setAllActive(false);
              setArmsActive(false);
              setCoreActive(true);
              setLegsActive(false);
              setAgilityActive(false);
            }}
          >
            <BiIcons.BiBody className="icon" />
            <span>Core</span>
          </button>

          <button
            className={
              legsActive === true ? 'button-active' : 'button-inactive'
            }
            onClick={() => {
              handleAllLegsExercisesClick();
              setAllActive(false);
              setArmsActive(false);
              setCoreActive(false);
              setLegsActive(true);
              setAgilityActive(false);
            }}
          >
            <GiIcons.GiLeg className="icon" />
            <span>Legs</span>
          </button>

          <button
            className={
              agilityActive === true ? 'button-active' : 'button-inactive'
            }
            onClick={() => {
              handleAllAgilityExercisesClick();
              setAllActive(false);
              setArmsActive(false);
              setCoreActive(false);
              setLegsActive(false);
              setAgilityActive(true);
            }}
          >
            <FaIcons.FaRunning className="icon" />
            <span>Agility</span>
          </button>
        </div>
        <div css={exerciseMainContainer}>
          {allExercises.map((exercise) => {
            return (
              <div css={exerciseSubContainer} key={exercise.id}>
                <div css={exerciseHeader}>
                  {exercise.bodypart === 'Arms' ? (
                    <GiIcons.GiBiceps className="icon" />
                  ) : undefined}
                  {exercise.bodypart === 'Legs' ? (
                    <GiIcons.GiLeg className="icon" />
                  ) : undefined}
                  {exercise.bodypart === 'Core' ? (
                    <BiIcons.BiBody className="icon" />
                  ) : undefined}
                  {exercise.bodypart === 'Agility' ? (
                    <FaIcons.FaRunning className="icon" />
                  ) : undefined}
                  <h2>{exercise.bodypart}</h2>
                </div>

                <div css={exerciseBody}>
                  <div>
                    <h3>{exercise.title}</h3>

                    <p>
                      <BiIcons.BiDumbbell className="icon" />
                      <span>Equipment: </span> <span>{exercise.equipment}</span>
                    </p>
                  </div>
                  <div className="videoDiv">Video in the making</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const teamId = context.query.teamId;
  const sessionToken = context.req.cookies.sessionToken;
  const user = await getUserByValidSessionToken(sessionToken);
  const userRoleId = user?.userRoleId ?? null;

  const allExercises = await getAllExercises();

  let userErrors = null;

  if (!user) {
    userErrors = { message: 'Access denied' };
  } else {
    if (user.id && teamId) {
      const isPlayerInTeam = await checkIfPlayerInTeam(user.id, Number(teamId));
      const isCoachInTeam = await checkIfCoachInTeam(user.id, Number(teamId));
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
      userRoleId,
      teamId,
      allExercises,
      userErrors,
    },
  };
}
