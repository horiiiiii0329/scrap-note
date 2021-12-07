import { Main } from "../components/Layout/Main";
import MyPosts from "../components/Profile/MyPost";
import ProfileCard from "../components/Profile/ProfileCard";
import { TopBar } from "../components/Layout/TopBar";
import { useState, useEffect } from "react";
import { supabase } from "../../api";
import { Session } from "inspector";
import { LoginCard } from "../components/Utility/LoginCard";

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
      <TopBar>{session && <ProfileCard session={session} />}</TopBar>
      <Main>{session ? <MyPosts /> : <LoginCard />}</Main>
    </div>
  );
}

export default Profile;
