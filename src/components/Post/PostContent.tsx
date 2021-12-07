import styles from "./PostContent.module.scss";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../../api";
import "easymde/dist/easymde.min.css";
import { v4 as uuid } from "uuid";
import {
  useEditor,
  EditorContent,
  BubbleMenu,
  FloatingMenu,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { SideMenu } from "./side-menu/SideMenu";
import { PopupMenu } from "./popupmenu/PopupMenu";
import Link from "@tiptap/extension-link";
import "remixicon/fonts/remixicon.css";
import TextAlign from "@tiptap/extension-text-align";
import { Giphy } from "./giphy/Giphy";
import Modal from "react-modal";
import CustomImage from "./extensions/image";
import { BlogWrapper } from "../Layout/BlogWrapper";

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

const initialState = { title: "", content: "", id: "" };

function PostContent() {
  const [post, setPost] = useState<any>(initialState);
  const { title, content } = post;
  const router = useRouter();
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

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

    content: `<p>ご自由にお書きください。。。</p>`,
    // onUpdate: ({ editor }) => {},
  });

  async function createNewPost() {
    if (!title || !editor?.getJSON()) {
      console.log(title + editor);
    }
    const html = editor?.getHTML();

    setPost(() => ({ ...post, content: html }));
    const user = supabase.auth.user();
    const id = uuid();
    post.id = id;
    const { data } = await supabase
      .from("posts")
      .insert([{ title, content, user_id: user?.id, user_email: user?.email }])
      .single();
    router.push(`post/${data.id}`);
  }

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPost(() => ({ ...post, [e.target.name]: e.target.value }));
  }

  return (
    <BlogWrapper>
      <div>
        <input
          name="title"
          placeholder="タイトルを入力する"
          value={title}
          className={styles.input_title}
          onChange={onChange}
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
        <button
          type="button"
          className={styles.button__md}
          onClick={createNewPost}
        >
          投稿する
        </button>
      </div>
    </BlogWrapper>
  );
}

export default PostContent;
