import { Main } from "../components/Layout/Main";
import PostContent from "../components/Post/PostContent";
import { TopBar } from "../components/Layout/TopBar";
import { supabase } from "../../api";
import { useEffect, useState } from "react";
import { LoginCard } from "../components/Utility/LoginCard";
import { Session } from "@supabase/gotrue-js";
import styles from "../styles/post.module.scss";

function Post() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <div>
      <TopBar>
        <h1 className={styles.title}>記事を作成する</h1>
      </TopBar>
      <Main>{!session ? <LoginCard /> : <PostContent />}</Main>
    </div>
  );
}

export default Post;
