import styles from "./PostContent.module.scss";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../api";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { v4 as uuid } from "uuid";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});
const initialState = { title: "", content: "", id: "" };

function PostContent() {
  const [post, setPost] = useState(initialState);
  const { title, content } = post;
  const router = useRouter();
  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPost(() => ({ ...post, [e.target.name]: e.target.value }));
  }
  async function createNewPost() {
    if (!title || !content) return;
    const user = supabase.auth.user();
    const id = uuid();
    post.id = id;
    const { data } = await supabase
      .from("posts")
      .insert([{ title, content, user_id: user?.id, user_email: user?.email }])
      .single();
    router.push(`posts/${data.id}`);
  }

  return (
    <div>
      <input
        onChange={onChange}
        name="title"
        placeholder="タイトルを入力する"
        value={post.title}
        className={styles.input_title}
      />
      <SimpleMDE
        value={post.content}
        onChange={(value) => setPost({ ...post, content: value })}
      />
      <button
        type="button"
        className={styles.button__md}
        onClick={createNewPost}
      >
        投稿する
      </button>
    </div>
  );
}

export default PostContent;
