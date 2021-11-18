import type { NextPage } from "next";
import { ChevronDownIcon } from "@heroicons/react/outline";
import Head from "next/head";
import NewsListItem from "../components/HomePage/NewsListItem";
import Main from "../components/Layout/Main";
import LoadingThreeDots from "../components/Utility/LoadingThreeDots";
import TopBar from "../components/Utility/TopBar";
import styles from "../styles/Home.module.scss";
import WeatherDate from "../components/HomePage/WeatherDate";
import { useState, useEffect } from "react";
import Row from "../components/Utility/Row";
import NewsList from "../components/HomePage/NewsList";
import axios from "axios";
import {
  fetchAsahiData,
  fetchMainichiData,
  fetchNikkeiData,
  fetchSankeiData,
  fetchYomiuriData,
} from "../lib/fetchNewsData";
import { Item } from "framer-motion/types/components/Reorder/Item";

const leftNews = ["朝日新聞", "毎日新聞"];
const rightNews = ["読売新聞", "産経新聞", "日経新聞"];
const DUMMY_DATA = [
  {
    title: "wwwwwwwww",
    href: "33333333333",
    company: "浅子新聞",
    time: "222222222222",
    id: "111111111",
  },
];

const Home: NextPage = ({ weatherNews }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [leftIsOpen, setLeftIsOpen] = useState(true);
  const [rightIsOpen, setRightIsOpen] = useState(true);

  const [asahiData, setAsahiData] = useState(DUMMY_DATA);
  const [mainichiData, setMainichiData] = useState(DUMMY_DATA);
  const [nikkeiData, setNikkeiData] = useState(DUMMY_DATA);
  const [sankeiData, setSankeiData] = useState(DUMMY_DATA);
  const [yomiuriData, setYomiuriData] = useState(DUMMY_DATA);

  const [leftPickedNews, setLeftPickedNews] = useState([] as any);
  const [rightPickedNews, setRightPickedNews] = useState([] as any);

  const leftNewsData = [asahiData, mainichiData];
  const rightNewsData = [yomiuriData, sankeiData, nikkeiData];

  console.log(leftPickedNews);

  useEffect(() => {
    setIsLoading(true);
    // const mData = async () =>
    //   await axios
    //     .get(
    //       "https://10x4sx0ksf.execute-api.us-east-1.amazonaws.com/default/fetchMainichi"
    //     )
    //     .then((response) => setMainichiData(response.data.Items));
    // const yData = async () =>
    //   await axios
    //     .get(
    //       "https://dfidli0e6a.execute-api.us-east-1.amazonaws.com/default/fetchYomiuriData"
    //     )
    //     .then((response) => setYomiuriData(response.data.Items));
    // const aData = async () =>
    //   await axios
    //     .get(
    //       "https://364do95wh5.execute-api.us-east-1.amazonaws.com/default/fetchAsahiData"
    //     )
    //     .then((response) => setAsahiData(response.data.Items));

    // const sData = async () =>
    //   await axios
    //     .get(
    //       "https://69y7orpkvf.execute-api.us-east-1.amazonaws.com/default/fetchSankei"
    //     )
    //     .then((response) => setSankeiData(response.data.Items));

    // const nData = async () =>
    //   await axios
    //     .get(
    //       "https://oz0czga9rj.execute-api.us-east-1.amazonaws.com/default/nikkeiData"
    //     )
    //     .then((response) => setNikkeiData(response.data.Items));

    // mData();
    // yData();
    // nData();
    // aData();
    // sData();
    setIsLoading(false);
  }, []);

  return (
    <div>
      <Head>
        <title>ScrapppNoteee</title>
        <meta name="description" content="あなたのスクラップノート" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

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
            {leftIsOpen
              ? leftNews.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setLeftPickedNews(rightNewsData[index]);
                      setLeftIsOpen(false);
                    }}
                  >
                    <Row companyname={item} />
                  </div>
                ))
              : leftPickedNews.map((item: any, index: number) => {
                  return <NewsListItem item={item} key={index} />;
                })}
          </div>
          <div className={styles.main__right}>
            {rightIsOpen
              ? rightNews.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setRightPickedNews(rightNewsData[0]);
                      setRightIsOpen(false);
                      console.log(222);
                    }}
                  >
                    <Row companyname={item} />
                  </div>
                ))
              : rightPickedNews.map((item: any, index: number) => {
                  return <NewsListItem item={item} key={index} />;
                })}
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

  return {
    props: {
      weatherNews,
    },
  };
}

export default Home;
