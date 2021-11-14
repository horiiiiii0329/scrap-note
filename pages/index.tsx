import type { NextPage } from "next";
import { ChevronDownIcon } from "@heroicons/react/outline";
import Head from "next/head";
import Header from "../components/Header/Header";
import Main from "../components/Layout/Main";
import LoadingThreeDots from "../components/Utility/LoadingThreeDots";
import TopBar from "../components/Utility/TopBar";
import styles from "../styles/Home.module.scss";
import WeatherDate from "../components/HomePage/WeatherDate";

const Home: NextPage = ({ weatherNews }: any) => {
  return (
    <div>
      <Head>
        <title>ScrapppNoteee</title>
        <meta name="description" content="あなたのスクラップノート" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <TopBar>
        <div className={styles.topbar}>
          <p>
            <span>
              <ChevronDownIcon
                style={{ width: "15px", height: "15px", cursor: "pointer" }}
                onClick={() => {}}
              />
            </span>
            新聞紙を選ぶ
          </p>
          <p>
            <span>
              <ChevronDownIcon
                style={{ width: "15px", height: "15px", cursor: "pointer" }}
                onClick={() => {}}
              />
            </span>
            新聞紙を選ぶ
          </p>
        </div>
      </TopBar>
      <Main>
        <LoadingThreeDots />

        <WeatherDate weatherNews={weatherNews} />
      </Main>

      <footer></footer>
    </div>
  );
};

export async function getServerSideProps({ req }: any) {
  //setUserCookie
  // const { user } = await supabase.auth.api.getUserByCookie(req);

  //getWeatherData

  let lat = 35.4122;
  let long = 139.413;

  const exclude = "hourly,minutely";
  const weatherRes = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&lang=ja_JP&units=metric&exclude=${exclude}&appid=03b21e4bac7cd1542bebd0ccb127a6e5`
  );
  const weatherJson = await weatherRes.json();
  const weatherNews = weatherJson;

  return {
    props: {
      weatherNews,
    },
  };
}

export default Home;
