import { useRouter } from "next/router";
import { supabase } from "../../../api";
import styles from "./posts.module.scss";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { BlogWrapper } from "../../components/Layout/BlogWrapper";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import CustomImage from "../../components/Post/extensions/image";
import { TopBar } from "../../components/Layout/TopBar";

interface Item {
  post: {
    title: string;
    user_email: string;
    content: string;
    id: string;
  };
}

export default function Post({ post }: Item) {
  const editor = useEditor({
    editable: false,
    extensions: [
      StarterKit,
      Link,
      TextAlign.configure({ types: ["paragraph"] }),
      CustomImage.configure({
        HTMLAttributes: {
          class: "custom-image",
        },
      }),
    ],
    content: post.content,
  });

  if (!editor) null;

  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <TopBar>
        <h1 className={styles.title}></h1>
      </TopBar>
      <BlogWrapper>
        <div className={styles.container}>
          <h1>{post.title}</h1>
          <p> {post.user_email}</p>
          <div>
            <EditorContent editor={editor} />
          </div>
        </div>
      </BlogWrapper>
    </>
  );
}

// export async function getStaticPaths() {
//   const { data, error } = await supabase.from("posts").select("id");
//   const paths = data?.map((post) => ({
//     params: { id: JSON.stringify(post.id) },
//   }));
//   return {
//     paths,
//     fallback: true,
//   };
// }

type Params = {
  params: {
    id: string;
  };
};

export async function getServerSideProps({ params }: Params) {
  const { id } = params;
  const { data } = await supabase
    .from("posts")
    .select()
    .filter("id", "eq", id)
    .single();
  return {
    props: {
      post: data,
    },
  };
}
