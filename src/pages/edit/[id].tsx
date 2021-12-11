import { useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../../api";
import styles from "./edit.module.scss";
import {
  useEditor,
  EditorContent,
  BubbleMenu,
  FloatingMenu,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { SideMenu } from "../../components/Post/side-menu/SideMenu";
import { PopupMenu } from "../../components/Post/popupmenu/PopupMenu";
import Link from "@tiptap/extension-link";
import "remixicon/fonts/remixicon.css";
import TextAlign from "@tiptap/extension-text-align";
import { Giphy } from "../../components/Post/giphy/Giphy";
import Modal from "react-modal";
import CustomImage from "../../components/Post/extensions/image";
import { BlogWrapper } from "../../components/Layout/BlogWrapper";
import { TopBar } from "../../components/Layout/TopBar";
import { useEffect } from "react";

//////////////////edit is not rendering

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "none",
    backgroundColor: "transparent",
    padding: "0px",
  },
};

interface Item {
  post: {
    title: string;
    user_email: string;
    content: string;
    id: string;
  };
}

function EditPost({ post }: Item) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    async function fetchPost() {
      if (!id) return;
      const { data } = await supabase
        .from("posts")
        .select()
        .filter("id", "eq", id)
        .single();
      setTitle(data.title);
      setContent(data.content);
    }

    fetchPost();
  }, [id]);

  const editor = useEditor({
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
    content: content,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setContent(html);
    },
  });

  async function updateCurrentPost() {
    if (!title || !content) return;
    await supabase.from("posts").update([{ title, content }]).match({ id });
    router.push("/profile");
  }

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value);
  }

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <TopBar>
        <h1 className={styles.title}>編集</h1>
      </TopBar>
      <BlogWrapper>
        <div className={styles.container}>
          <input
            onChange={onChange}
            name="title"
            placeholder="タイトル"
            value={title}
          />
          <EditorContent editor={editor} />
          {editor && (
            <BubbleMenu
              className="bubble-menu"
              tippyOptions={{ duration: 100 }}
              editor={editor}
            >
              <PopupMenu editor={editor} />
            </BubbleMenu>
          )}

          {editor && (
            <FloatingMenu editor={editor} tippyOptions={{ duration: 100 }}>
              <div style={{ position: "absolute", top: -15, left: -55 }}>
                <SideMenu
                  position={{}}
                  editor={editor}
                  display={true || "displaySidebar"}
                  gifClickHandler={openModal}
                />
              </div>
            </FloatingMenu>
          )}
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
          >
            <Giphy editor={editor} closeModalHandler={() => setIsOpen(false)} />
          </Modal>
          <button className={styles.button} onClick={updateCurrentPost}>
            更新
          </button>
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

// type Params = {
//   params: {
//     id: string;
//   };
// };

// export async function getStaticProps({ params }: Params) {
//   const { id } = params;
//   const { data } = await supabase
//     .from("posts")
//     .select()
//     .filter("id", "eq", id)
//     .single();
//   return {
//     props: {
//       post: data,
//     },
//   };
// }

export default EditPost;
