import type { NextPage } from "next";
import { ChevronDownIcon } from "@heroicons/react/outline";
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
      </Main>

      <footer></footer>
    </div>
  );
};

export default Home;
