import type { NextPage } from "next";
import { ChevronDownIcon } from "@heroicons/react/outline";
import Head from "next/head";
import Header from "../components/Header/Header";
import Main from "../components/Layout/Main";
import LoadingThreeDots from "../components/Utility/LoadingThreeDots";
import TopBar from "../components/Utility/TopBar";
import styles from "../styles/Home.module.scss";
import WeatherDate from "../components/HomePage/WeatherDate";
import { useState, useEffect } from "react";
import Row from "../components/Utility/Row";
import NewsList from "../components/HomePage/NewsList";
import {
  fetchAsahiData,
  fetchMainichiData,
  fetchNikkeiData,
  fetchSankeiData,
  fetchYomiuriData,
} from "../lib/fetchNewsData";

const leftNews = ["朝日新聞", "毎日新聞"];
const rightNews = ["読売新聞", "産経新聞", "日経新聞"];

const Home: NextPage = ({
  weatherNews,
  mainichiData,
}: // yomiuriData,
// sankeiData,
// mainichiData,
// nikkeiData,
any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [leftIsOpen, setLeftIsOpen] = useState(true);
  const [rightIsOpen, setRightIsOpen] = useState(true);
  const [leftPickedNews, setLeftPickedNews] = useState([]);
  const [rightPickedNews, setRightPickedNews] = useState([]);

  // const [mainichiData, setMainichiData] = useState([]);
  // const [nikkeiData, setNikkeiData] = useState([]);
  // const [sankeiData, setSankeiData] = useState([]);
  // const [yomiuriData, setYomiuriData] = useState([]);

  // const leftNewsData = [asahiData, mainichiData];
  // const rightNewsData = [yomiuriData, sankeiData, nikkeiData];

  console.log(mainichiData);

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
                onClick={() => {
                  setLeftIsOpen(!leftIsOpen);
                }}
              />
            </span>
            新聞紙を選ぶ
          </p>
          <p>
            <span>
              <ChevronDownIcon
                style={{ width: "15px", height: "15px", cursor: "pointer" }}
                onClick={() => {
                  setRightIsOpen(!rightIsOpen);
                }}
              />
            </span>
            新聞紙を選ぶ
          </p>
        </div>
      </TopBar>
      <Main>
        <div className={styles.main}>
          {/* <LoadingThreeDots /> */}
          <div className={styles.main__left}>
            {leftIsOpen ? (
              leftNews.map((item, index) => (
                <div
                  key={index}
                  onClick={() => {
                    // setLeftPickedNews(leftNewsData[index]);
                  }}
                >
                  <Row companyname={item} />
                </div>
              ))
            ) : (
              <NewsList newsData={leftPickedNews} />
            )}
          </div>
          <div className={styles.main__right}>
            {rightNews.map((item, index) => (
              <Row companyname={item} key={index} />
            ))}
          </div>
        </div>

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

  //get news list

  // const asahi = await fetch(
  //   "https://lz16rqcbei.execute-api.us-east-1.amazonaws.com/default/fetchAsahiData",
  //   {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "x-api-key": process.env.API_GATEWAY_APIKEY2,
  //     },
  //   }
  // );
  // const aData = await asahi.json();
  // const asahiData = aData.Items;

  const yomiuri = await fetch(
    "https://8rvpib53gd.execute-api.us-east-1.amazonaws.com/default/fetchYomiuriData",
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "x-api-key": process.env.API_GATEWAY_APIKEY,
      },
    }
  );
  const mainichi = await fetch(
    "https://tyuz1jflm6.execute-api.us-east-1.amazonaws.com/default/fetchMainichi",
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "x-api-key": process.env.API_GATEWAY_APIKEY4,
      },
    }
  );
  const mData = await mainichi.json();
  const mainichiData = mData.Items;

  return {
    props: {
      weatherNews,
      mainichiData,
    },
  };
}

export default Home;
