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

  // get a newsheadline

  let asahiData;
  let yomiuriData;
  let mainichiData;
  let nikkeiData;
  let sankeiData;

  // const yomiuri = await fetch(
  //   "https://erzss0zhpd.execute-api.us-east-1.amazonaws.com/default/fetchYomiuriData",
  //   {
  //     method: "GET",
  //     headers: {
  //       "Content-type": "application/json",
  //       "x-api-key": process.env.API_GATEWAY_APIKEY,
  //     },
  //   }
  // );
  // const ydata = await yomiuri.json();
  // yomiuriData = ydata.Items;

  // const asahi = await fetch(
  //   "https://lm8gbiweyk.execute-api.us-east-1.amazonaws.com/default/fetchAsahiData",
  //   {
  //     method: "GET",
  //     headers: {
  //       "Content-type": "application/json",
  //       "x-api-key": process.env.API_GATEWAY_APIKEY2,
  //     },
  //   }
  // );
  // const aData = await asahi.json();
  // asahiData = aData.Items;

  // const sankei = await fetch(
  //   "https://729w81osh5.execute-api.us-east-1.amazonaws.com/default/fetchSankei",
  //   {
  //     method: "GET",
  //     headers: {
  //       "Content-type": "application/json",
  //       "x-api-key": process.env.API_GATEWAY_APIKEY3,
  //     },
  //   }
  // );
  // const sData = await sankei.json();
  // sankeiData = sData.Items;

  // const mainichi = await fetch(
  //   "https://tyuz1jflm6.execute-api.us-east-1.amazonaws.com/default/fetchMainichi",
  //   {
  //     method: "GET",
  //     headers: {
  //       "Content-type": "application/json",
  //       "x-api-key": process.env.API_GATEWAY_APIKEY4,
  //     },
  //   }
  // );
  // const mData = await mainichi.json();
  // mainichiData = mData.Items;

  // const nikkei = await fetch(
  //   " https://ljmgodfzp8.execute-api.us-east-1.amazonaws.com/default/nikkeiData",
  //   {
  //     method: "GET",
  //     headers: {
  //       "Content-type": "application/json",
  //       "x-api-key": process.env.API_GATEWAY_APIKEY5,
  //     },
  //   }
  // );
  // const nData = await nikkei.json();
  // nikkeiData = nData.Items;

  // const asahi = await fetch("http://localhost:3000/api/getasahi");
  // asahiData = await asahi.json();
  // const yomiuri = await fetch("http://localhost:3000/api/getyomiuri");
  // yomiuriData = await yomiuri.json();
  // const mainichi = await fetch("http://localhost:3000/api/getmainichi");
  // mainichiData = await mainichi.json();
  // const nikkei = await fetch("http://localhost:3000/api/getnihonkeizai");
  // nikkeiData = await nikkei.json();
  // const sankei = await fetch("http://localhost:3000/api/getsankei");
  // sankeiData = await sankei.json();

  return {
    props: {
      weatherNews,
      // asahiData,
      // yomiuriData,
      // mainichiData,
      // nikkeiData,
      // sankeiData,
    },
  };
}

export default Home;
