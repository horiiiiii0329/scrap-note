import AllArticle from "../components/Feed/AllArticle";
import Main from "../components/Layout/Main";
import TopBar from "../components/Utility/TopBar";

function newspublic() {
  return (
    <div>
      <TopBar> </TopBar>
      <Main>
        <AllArticle />
      </Main>
    </div>
  );
}

export default newspublic;
