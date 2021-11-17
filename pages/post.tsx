import Main from "../components/Layout/Main";
import Post from "../components/Post/Post";
import TopBar from "../components/Utility/TopBar";

function post() {
  return (
    <div>
      <TopBar></TopBar>
      <Main>
        <Post />
      </Main>
    </div>
  );
}

export default post;
