import styles from "./AllArticleList.module.scss";
import { supabase } from "../../api";

function AllArticleLIst({
  title,
  time,
  company,
  link,
  posts,
}: {
  title: string;
  time: string;
  company: string;
  link: string;
  posts: [
    {
      headline: string;
    }
  ];
}) {
  const count = posts.reduce(
    (counter, post) => (post.headline === title ? (counter += 1) : counter),
    0
  );

  return (
    <div className={styles.wrapper}>
      <a href={link} target="_blank" rel="noopener noreferrer">
        <p className={styles.title}>
          {title ? title : "null"}
          <span className={styles.company}>{company}</span>
        </p>

        <time className={styles.time}>発行日：{time}</time>
      </a>
      <div>
        <p>{count}</p>
        <p></p>
      </div>
    </div>
  );
}

export default AllArticleLIst;
