import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../../components/Layout';
import SubMenu from '../../../components/SubMenu';
import { getEvents } from '../../../util/database';

type Props = {
  username: String;
  teamId: Number;
};

export default function SingleTeamPage(props: Props) {
  return (
    <>
      <Head>
        <title>Team Vision</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout username={props.username} />
      {/* <SubMenu teamId={props.teamId} /> */}
      <h1>Welcome to Team xy</h1>
      <Link href={`/teams/${props.teamId}/create-new-event`}>
        <a>Create Event</a>
      </Link>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const teamId = context.query.teamId;

  // const events = await getEvents();
  // console.log(events);

  return {
    props: {
      teamId,
    },
  };
}
