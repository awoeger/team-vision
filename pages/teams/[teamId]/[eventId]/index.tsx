import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Layout from '../../../../components/Layout';
import SubMenu from '../../../../components/SubMenu';
import { getEventByEventId } from '../../../../util/database';
import { darkBlue, lightGrey } from '../../../../util/sharedStyles';

type Props = {
  username: String;
  teamId: Number;
};

const mainContainer = css`
  width: 100%;
  display: flex;
`;

const subMenu = css`
  width: 25%;
  position: static;
  display: flex;
  justify-content: flex-start;
  background: ${lightGrey};
  padding: 20px;
  border-right: 2px solid ${darkBlue};
`;

const eventContainer = css``;

export default function SingleEventPage(props: Props) {
  return (
    <>
      <Head>
        <title>Team Vision</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout username={props.username} />
      <div css={mainContainer}>
        <div css={subMenu}>
          <SubMenu teamId={props.teamId} />
        </div>
        <div css={eventContainer}></div>
      </div>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const teamIdString = context.query.teamId;
  const teamId = Number(teamIdString);
  const eventIdString = context.query.eventId;
  const eventId = Number(eventIdString);

  const event = await getEventByEventId(eventId);

  return {
    props: {
      event: event,
      teamId: teamId,
    },
  };
}
