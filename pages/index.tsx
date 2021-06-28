/** @css css */
import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import ContactForm from '../components/ContactForm';
import Layout from '../components/Layout';
import { normalText } from '../util/sharedStyles';

// Todo: Video as background
// Todo: About Section Design
// Todo: Contact Section Design
// Todo: Update Header for login logout and your profile username is undefined

const heroDiv = css`
  display: flex;
  justify-content: center;
  align-items: flex-start;

  Image {
    margin-right: 10px;
  }
`;

const sections = css`
  height: 100vh;
  width: 100%;
`;

const firstSection = css`
  background-image: url(/images/background_blue_smoke.PNG);
  background-size: cover;
  background-repeat: no-repeat;
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  h1 {
    color: white;
  }
`;

const aboutSubSection = css`
  background-image: url('/images/button_background_lightBlue.PNG');
  background-size: cover;
  background-repeat: no-repeat;

  h3 {
    text-transform: uppercase;
    font-size: 2em;
    color: white;
    padding: 20px 0 20px 20px;
    margin-left: 20px;
  }

  > div {
    width: 100%;
    display: flex;

    div {
      width: 45%;
      color: white;
      font-size: ${normalText};
      margin: 10px 40px 40px 40px;
      text-align: justify;

      a {
        color: white;
      }
    }
  }
`;

const mainContainer = css`
  width: 100%;
`;

type Props = {
  username: String;
};

export default function Home(props: Props) {
  return (
    <div>
      <Head>
        <title>Team Vision</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout username={props.username} />
      <div css={mainContainer}>
        <section css={firstSection}>
          <div css={heroDiv}>
            <Image
              alt="Logo Icon"
              src="/images/logo_white/teamvision_icon.png"
              width="110px"
              height="100px"
            />
            <div>
              <h1>Team Vision</h1>
              <h2>Plan smarter, not harder</h2>
            </div>
          </div>
        </section>

        <section css={sections} id="about">
          <div css={aboutSubSection}>
            <h3>About</h3>
            <div>
              <div>
                <p>
                  Team Vision is a project, that was created for educational
                  purposes, by Andrea Wöger during the Upleveld Fullstack
                  Developer Bootcamp in June 2021.
                </p>
                <p>
                  "I love trying out new sports and getting to know different
                  teams. However, I found that many coaches still use Doodle
                  polls or WhatsApp messages to see which people will show up
                  for upcoming events. Especially in marginal sports, the club's
                  budget often has to be spent sparingly, which means coaches
                  don't want to spend a monthly amount on event planning
                  applications.
                </p>
              </div>
              <div>
                <p>
                  Therefore I wanted to create a free to use application.
                  Coaches and players should get a quick overview about all
                  upcoming trainings, tournaments and socials. Additionally I
                  want to provide a collection of exercises, that players can
                  use for their home workout, to stay fit throughout the
                  season."
                </p>
                <p>
                  Additional functionalities are already in planning and will be
                  implemented as soon as possible. If you have any ideas on new
                  functionalities, please feel free to contact me through our{' '}
                  <Link href="/#contact">
                    <a>contact form</a>
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 id="guide">GUIDE</h3>
            <div>
              <div>
                <p>Icon</p>
                <h4>CREATE TEAMS</h4>
              </div>
              <div>
                <p>Ability to create a team and let your players sign-up.</p>
              </div>
            </div>

            <div>
              <div>
                <p>Icon</p>
                <h4>CREATE EVENTS</h4>
              </div>
              <div>
                <p>Ability to see all upcoming team events.</p>
              </div>
            </div>

            <div>
              <div>
                <p>Icon</p>
                <h4>WORKOUTS</h4>
              </div>
              <div>
                <p>Having a collection of exercises for your team.</p>
              </div>
            </div>
          </div>
        </section>

        <section css={sections} id="contact">
          <div>
            <ContactForm />
          </div>
          <div>
            <h3>Contact information</h3>
            <div>
              <p>Icon</p>
              <p>Adress</p>
              <p>Team Vision GmbH</p>
              <p>Schönerweg 45</p>
              <p>1020 Vienna</p>
              <p>Austria</p>
            </div>
            <div>
              <p>Icon</p>
              <p>Email</p>
              <p>team@vision.com</p>
            </div>
            <div>
              <p>Icon</p>
              <p>Phone</p>
              <p>0664/ 555 55 44 33</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
