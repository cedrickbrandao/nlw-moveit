import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { ChallengeBox } from '../components/ChallengeBox';
import { CompletedChallenge } from '../components/CompletedChallenge';
import { Countdown } from '../components/Countdown';
import ExperienceBar from "../components/ExpirienceBar";
import { Profile } from '../components/Profile';
import { ChallengesProvider } from '../contexts/ChallengerContext';
import { CountDownContextProvider } from '../contexts/CountDownContext';
import style from '../styles/pages/Home.module.css';

interface HomePageProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export default function Home(props: HomePageProps) {
  return (
    <ChallengesProvider level={props.level} challengesCompleted={props.challengesCompleted} currentExperience={props.currentExperience} >
      <div className={style.container}>
        <Head>
          <title>Inicio | Movie.it</title>
        </Head>
        <ExperienceBar />
        <CountDownContextProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallenge />
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountDownContextProvider>
      </div>
    </ChallengesProvider>
  )
}


export const getServerSideProps: GetServerSideProps = async (context) => {

  const { level, currentExperience, challengesCompleted } = context.req.cookies;

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted)
    }
  }
}
