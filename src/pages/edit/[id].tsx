import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../../api";
import styles from "./edit.module.scss";
import { v4 as uuid } from "uuid";
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

const initialState = { title: "", content: "" };

function EditPost() {
  const [post, setPost] = useState(initialState);
  const [modalIsOpen, setIsOpen] = useState(false);
  const { title, content } = post;
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    fetchPost();
    async function fetchPost() {
      if (!id) return;
      const { data } = await supabase
        .from("posts")
        .select()
        .filter("id", "eq", id)
        .single();
      setPost(data);
    }
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
      const json = editor.getJSON();
      setPost({ ...post, content: json.stringify });
    },
  });

  if (!post) return null;

  async function updateCurrentPost() {
    if (!title || !content) return;
    await supabase.from("posts").update([{ title, content }]).match({ id });
    router.push("/profile");
  }

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPost({ ...post, [title]: e.target.value });
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
        <h1 className={styles.title}>みんなの記事</h1>
      </TopBar>
      <BlogWrapper>
        <div className={styles.container}>
          <input
            onChange={onChange}
            name="title"
            placeholder="タイトル"
            value={post.title}
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

export default EditPost;
