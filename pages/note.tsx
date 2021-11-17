import ArticleItem from "../components/ClippedArticle/ArticleItem";
import ArticleType from "../components/ClippedArticle/ArticleType";
import Main from "../components/Layout/Main";
import TopBar from "../components/Utility/TopBar";

function note() {
  return (
    <div>
      <TopBar> </TopBar>
      <Main>
        <ArticleItem />
        <ArticleType />
      </Main>
    </div>
  );
}

export default note;
