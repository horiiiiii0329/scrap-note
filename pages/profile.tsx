import Main from "../components/Layout/Main";
import MyPosts from "../components/Profile/MyPost";
import ProfileCard from "../components/Profile/ProfileCard";
import TopBar from "../components/Utility/TopBar";

function profile() {
  return (
    <div>
      <TopBar>
        <ProfileCard />
      </TopBar>
      <Main>
        <MyPosts />
      </Main>
    </div>
  );
}

export default profile;
