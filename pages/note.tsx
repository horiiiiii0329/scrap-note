import ArticleItem from "../components/ClippedArticle/ArticleItem";
import ArticleType from "../components/ClippedArticle/ArticleType";
import Main from "../components/Layout/Main";
import LoginCard from "../components/Utility/LoginCard";
import TopBar from "../components/Utility/TopBar";
import styles from "../styles/note.module.scss";

function note() {
  return (
    <div>
      <TopBar> </TopBar>
      <Main>
        <LoginCard />
        {/* <div className={styles.wrapper}>
          <ArticleItem />
          <ArticleType />
        </div> */}
      </Main>
    </div>
  );
}

export default note;
