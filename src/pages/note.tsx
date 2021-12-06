import ArticleItem from "../components/ClippedArticle/ArticleItem";
import ArticleType from "../components/ClippedArticle/ArticleType";
import Main from "../components/Layout/Main";
import LoginCard from "../components/Utility/LoginCard";
import TopBar from "../components/Layout/TopBar";
import styles from "../styles/note.module.scss";
import { useState, useEffect } from "react";
import { supabase } from "../../api";
import { Session } from "@supabase/gotrue-js";

function Note() {
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
        <h1 className={styles.title}>クリップした記事</h1>
      </TopBar>
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
