import AllArticle from "../components/Feed/AllArticle";
import Main from "../components/Layout/Main";
import TopBar from "../components/Layout/TopBar";
import styles from "../styles/newspublic.module.scss";

function newspublic() {
  return (
    <div>
      <TopBar>
        <h1 className={styles.title}>みんなの記事</h1>
      </TopBar>
      <Main>
        <AllArticle />
      </Main>
    </div>
  );
}

export default newspublic;
