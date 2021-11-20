import ArticleItem from "../components/ClippedArticle/ArticleItem";
import ArticleType from "../components/ClippedArticle/ArticleType";
import Main from "../components/Layout/Main";
import LoginCard from "../components/Utility/LoginCard";
import TopBar from "../components/Utility/TopBar";
import styles from "../styles/note.module.scss";
import { useState, useEffect } from "react";
import { supabase } from "../api";

interface UserData {
  username: string;
  email: string;
  prevState: null;
}

function Note() {
  const [session, setSession] = useState<any | null>(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <div>
      <TopBar> </TopBar>
      <Main>
        {!session ? (
          <LoginCard />
        ) : (
          <div className={styles.wrapper}>
            <ArticleItem />
            <ArticleType />
          </div>
        )}
      </Main>
    </div>
  );
}

export default Note;
