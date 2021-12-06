import styles from "./ArticleItem.module.scss";
import { useEffect, useContext, useState } from "react";
import { supabase } from "../../../api";
import AppWrapper from "../../lib/state";
import ArticleItemCard from "./ArticleItemCard";
import { NewsList } from "../../../type";

function ArticleItem() {
  const [loading, setisLoading] = useState(true);
  const appCtx = useContext(AppWrapper);

  async function deletePost(id: string) {
    await supabase.from("save").delete().match({ id });
    appCtx.fetchSelectedTitle();
  }

  useEffect(() => {
    appCtx.fetchPosts();
    setisLoading(false);
  }, []);

  return (
    <div className={styles.content_wrapper}>
      {appCtx.posts.map((item: NewsList, index: number) => {
        return (
          <ArticleItemCard
            item={item}
            key={index}
            onDeleteHandler={deletePost}
          />
        );
      })}

      {appCtx.posts.length === 0 && (
        <div className={styles.articlecontent}>
          <p>見出しを追加してください</p>
        </div>
      )}
    </div>
  );
}

export default ArticleItem;
