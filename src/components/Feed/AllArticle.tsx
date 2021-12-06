import { useState, useEffect } from "react";
import { supabase } from "../../../api";
import LoadingThreeDots from "../Utility/LoadingThreeDots";
import styles from "./AllArticle.module.scss";
import { AllArticleList } from "./AllArticleList";
import { AllArticleType } from "./AllArticleType";

interface NewsList {
  headline: string;
  time: string;
  company: string;
  link: string;
  title: string;
  user_name: string;
  inserted_at: string;
  id: string;
}

interface ScrapList {
  title: string;
}

function AllArticle() {
  const [posts, setPosts] = useState<NewsList[] | any>([]);
  const [filteredPosts, setFilteredPosts] = useState<NewsList[] | any>([]);
  const [titles, setTitle] = useState<ScrapList[]>([]);
  const [activeContent1, setActiveContent1] = useState(true);
  const [activeContent2, setActiveContent2] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const company = ["朝日新聞", "毎日新聞", "読売新聞", "産経新聞", "日経新聞"];

  useEffect(() => {
    fetchTitle();
    const mySubscription = supabase
      .from("save-scrap-title")
      .on("*", () => fetchTitle())
      .subscribe();
    return () => {
      supabase.removeSubscription(mySubscription);
    };
  }, []);

  useEffect(() => {
    fetchPosts();
    const mySubscription = supabase
      .from("save")
      .on("*", () => fetchPosts())
      .subscribe();
    return () => {
      supabase.removeSubscription(mySubscription);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchPosts() {
    setIsLoading(true);
    const { data } = await supabase.from("save").select("*");
    setPosts(data);
    filteredPostsFunction(data);
    setIsLoading(false);
  }

  async function fetchFilteredPosts() {
    setIsLoading(true);
    const { data } = await supabase.from("posts").select("*");

    setFilteredPosts(data);
    setIsLoading(false);
  }

  async function fetchFilteredTitlePosts(title: string) {
    setIsLoading(true);
    const { data } = await supabase
      .from("save")
      .select("*")
      .filter("title", "eq", title);

    filteredPostsFunction(data);
    setIsLoading(false);
  }

  async function fetchFilteredCompanyPosts(item: string) {
    setIsLoading(true);
    const { data } = await supabase
      .from("save")
      .select("*")
      .filter("company", "eq", item);

    filteredPostsFunction(data);
    setIsLoading(false);
  }

  async function fetchTitle() {
    const { data } = await supabase.from("save-scrap-title").select("*");

    setTitle(data || []);
  }

  function filteredPostsFunction(data: NewsList[] | null) {
    const uniqueArray = [
      ...new Map(
        data?.map((item: { [x: string]: any }) => [item["headline"], item])
      ).values(),
    ];

    setFilteredPosts(uniqueArray);
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.content_wrapper}>
        {isLoading ? (
          <div className={styles.loader}>
            <LoadingThreeDots />
          </div>
        ) : (
          filteredPosts.map((post: NewsList, index: number) => (
            <AllArticleList
              title={post.headline || post.title}
              time={post.time || post.inserted_at.slice(0, 10)}
              company={post.company}
              key={index}
              link={post.link || `/post/${post.id}`}
              posts={posts}
            />
          ))
        )}
      </div>
      <div className={styles.content_wrapper2}>
        <div className={styles.categories}>
          <h3
            onClick={() => {
              setActiveContent1(true);
              setActiveContent2(false);
            }}
            className={activeContent1 ? styles.activecontent : undefined}
            style={!activeContent1 ? { color: "#D3D3D3" } : {}}
          >
            媒体
          </h3>
          <h3
            onClick={() => {
              setActiveContent1(false);
              setActiveContent2(true);
            }}
            className={activeContent2 ? styles.activecontent2 : undefined}
            style={activeContent1 ? { color: "#D3D3D3" } : {}}
          >
            スクラップブック
          </h3>
        </div>

        {activeContent1 && (
          <>
            <div>
              <div className={styles.scraplist}>
                <div className={styles.scrapelist__count}>
                  <p>00</p>
                </div>
                <div
                  className={styles.scraplist__title}
                  onClick={() => fetchFilteredPosts()}
                >
                  <p>みんなの記事</p>
                </div>
              </div>
            </div>

            {company.map((item: string, index: number) => (
              <div onClick={() => fetchFilteredCompanyPosts(item)} key={index}>
                <AllArticleType title={item} index={index} />
              </div>
            ))}
          </>
        )}

        {activeContent2 &&
          titles.map((title: ScrapList, index: number) => (
            <div
              key={index}
              onClick={() => fetchFilteredTitlePosts(title.title)}
            >
              <AllArticleType title={title.title} index={index} />
            </div>
          ))}
      </div>
    </div>
  );
}

export { AllArticle };
