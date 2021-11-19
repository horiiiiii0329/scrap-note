import Main from "../components/Layout/Main";
import MyPosts from "../components/Profile/MyPost";
import ProfileCard from "../components/Profile/ProfileCard";
import TopBar from "../components/Utility/TopBar";
import { useState, useEffect } from "react";
import { supabase } from "../api";
import { Session } from "inspector";

function Profile() {
  const [session, setSession] = useState<Session | any>(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <div>
      <TopBar>
        <ProfileCard session={session} />
      </TopBar>
      <Main>
        <MyPosts />
      </Main>
    </div>
  );
}

export default Profile;
