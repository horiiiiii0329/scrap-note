import styles from "./NewsListItem.module.scss";
import { useState, useContext, useEffect } from "react";
import { supabase } from "../../api";
import AppWrapper from "../../lib/state";
import { CheckIcon, ScissorsIcon } from "@heroicons/react/outline";

interface Item {
  item: {
    company: string;
    title: string;
    href: string;
    time: string;
    id: string;
  };
}

function NewsListItem({ item }: Item) {
  const [status, setStatus] = useState(false);

  const appCtx = useContext(AppWrapper);
  const user = supabase.auth.user();

  async function savePost({
    company,
    headline,
    link,
    time,
  }: {
    company: string;
    headline: string;
    link: string;
    time: string;
  }) {
    try {
      setStatus(false);
      const user = supabase.auth.user();

      const { data, error } = await supabase
        .from("save")
        .insert([{ company, headline, user_id: user?.id, link, time }]);
    } catch {
      alert(Error);
    } finally {
      setStatus(true);
      appCtx.fetchSelectedTitle();
    }
  }

  const scissors = (
    <ScissorsIcon
      style={{ width: "30px", height: "30px", cursor: "pointer" }}
    />
  );

  const done = (
    <CheckIcon style={{ width: "30px", height: "30px", cursor: "pointer" }} />
  );

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {mounted && (
        <div className={styles.item__item}>
          <a href={item.href} target="_blank" rel="noopener noreferrer">
            <p>{item.title}</p>
          </a>
          {user && (
            <div
              onClick={() => {
                savePost({
                  company: item.company,
                  headline: item.title,
                  link: item.href,
                  time: item.time,
                });
              }}
            >
              {status ? done : scissors}
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default NewsListItem;
