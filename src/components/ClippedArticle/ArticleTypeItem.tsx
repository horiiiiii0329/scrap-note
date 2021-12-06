import styles from "./ArticleTypeItem.module.scss";
import { PlusIcon } from "@heroicons/react/outline";
import { supabase } from "../../../api";
import { useState, useEffect, useContext } from "react";
import { AppWrapper, AppwrapperInnerContext } from "../../lib/state";

interface Title {
  title: string;
}

function ArticleTypeItem() {
  const [title, setTitle] = useState<Title>({ title: "" });
  const [posts, setPosts] = useState<string[] | any>([]);

  const appCtx = useContext(AppWrapper);
  const appInnerCtx = useContext(AppwrapperInnerContext);

  useEffect(() => {
    fetchList();
  }, []);

  async function fetchList() {
    const user = supabase.auth.user();
    const { data } = await supabase
      .from("save-scrap-title")
      .select("*")
      .filter("user_id", "eq", user?.id);
    setPosts(data);
  }

  async function createNewTitle() {
    if (!title.title) return;
    const user = supabase.auth.user();
    const { data } = await supabase
      .from("save-scrap-title")
      .insert([{ title: title.title, user_id: user?.id }])
      .single();
    setTitle({ title: "" });
    fetchList();
  }

  function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>): void {
    setTitle({ title: e.target.value });
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.scraplist}>
        <div className={styles.scrapelist__count}>
          <p>00</p>
        </div>
        <div
          className={styles.scraplist__title}
          onClick={() => {
            appInnerCtx.setSelectedTitle("全て");
            appInnerCtx.fetchSelectedTitle();
          }}
        >
          <p>未分類</p>
        </div>
      </div>
      <div className={styles.scraplist__wrapper}>
        {posts &&
          posts.map((post: Title, index: number) => {
            return (
              <div className={styles.scraplist} key={index}>
                <div className={styles.scrapelist__count}>
                  <p>{`0${index + 1}`}</p>
                </div>
                <div
                  className={styles.scraplist__title}
                  onClick={() => {
                    appInnerCtx.setSelectedTitle(post.title);
                    appInnerCtx.fetchSelectedTitle();
                  }}
                >
                  <p>{post.title}</p>
                </div>
              </div>
            );
          })}
      </div>

      <div className={styles.addscrap}>
        <div
          className={styles.addscrapicon}
          onClick={() => {
            createNewTitle();
            fetchList();
          }}
        >
          <PlusIcon
            style={{ width: "20px", height: "20px", cursor: "pointer" }}
          />
        </div>

        <input
          type="text"
          placeholder="タイトルを入力してください。。"
          onChange={onChangeHandler}
          name="title"
          value={title.title}
        />
      </div>
    </div>
  );
}

export { ArticleTypeItem };
