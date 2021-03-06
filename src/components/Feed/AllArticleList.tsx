import styles from "./AllArticleList.module.scss";
import { ScissorsIcon, ShareIcon } from "@heroicons/react/outline";

function AllArticleList({
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
  const count = posts?.reduce(
    (counter, post) => (post.headline === title ? (counter += 1) : counter),
    0
  );

  return (
    <div className={styles.wrapper}>
      <div>
        <a href={link} target="_blank" rel="noopener noreferrer">
          <p className={styles.title}>
            {title ? title : "null"}
            <span className={styles.company}>{company}</span>
          </p>

          <time className={styles.time}>発行日：{time}</time>
        </a>
      </div>
      <div className={styles.iconList}>
        <p className={styles.count}>
          <ScissorsIcon style={{ width: "13px", height: "13px" }} />
          <span>{count}</span>
        </p>
        <a
          className="twitter-share-button"
          href={`https://twitter.com/intent/tweet?text=${company}の「${title}」について興味がありました。&url=${link}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <p className={styles.share}>
            <ShareIcon
              style={{ width: "13px", height: "13px", cursor: "pointer" }}
            />
          </p>
        </a>
      </div>
    </div>
  );
}

export { AllArticleList };
