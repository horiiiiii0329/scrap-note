import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/Header/Header";
import Main from "../components/Layout/Main";
import LoadingThreeDots from "../components/Utility/LoadingThreeDots";
import TopBar from "../components/Utility/TopBar";
import styles from "../styles/Home.module.scss";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>ScrapppNoteee</title>
        <meta name="description" content="あなたのスクラップノート" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <TopBar></TopBar>
      <Main>
        <LoadingThreeDots />
      </Main>

      <footer></footer>
    </div>
  );
};

export default Home;
