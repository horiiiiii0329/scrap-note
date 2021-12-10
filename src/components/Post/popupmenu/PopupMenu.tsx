import "remixicon/fonts/remixicon.css";
import { useCallback } from "react";
import styles from "./PopupMenu.module.scss";

function PopupMenu({ editor }: any) {
  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    if (url === null) {
      return;
    }

    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  if (!editor) {
    return null;
  }

  if (!editor.isEditable) return null;

  if (editor.isActive("custom-image")) {
    return (
      <ul className={styles.wrapper}>
        <li>
          <span
            className={
              editor.isActive("custom-image", {
                size: "small",
              })
                ? styles.icon
                : styles.isActiveIcon
            }
            onClick={() =>
              editor.chain().focus().setImage({ size: "small" }).run()
            }
          >
            <i className="ri-image-line ri-1x"></i>
          </span>
        </li>
        <li>
          <span
            className={
              editor.isActive("custom-image", {
                size: "medium",
              })
                ? styles.icon
                : styles.isActiveIcon
            }
            onClick={() =>
              editor.chain().focus().setImage({ size: "medium" }).run()
            }
          >
            <i className="ri-image-line  ri-lg"></i>
          </span>
        </li>
        <li>
          <span
            className={
              editor.isActive("custom-image", {
                size: "large",
              })
                ? styles.icon
                : styles.isActiveIcon
            }
            onClick={() =>
              editor.chain().focus().setImage({ size: "large" }).run()
            }
          >
            <i className="ri-image-line ri-xl"></i>
          </span>
        </li>
        <li>
          <span
            className={
              editor.isActive("custom-image", {
                float: "left",
              })
                ? styles.icon
                : styles.isActiveIcon
            }
            onClick={() =>
              editor.chain().focus().setImage({ float: "left" }).run()
            }
          >
            <i className="ri-align-left ri-xl"></i>
          </span>
        </li>
        <li>
          <span
            className={
              editor.isActive("custom-image", {
                float: "none",
              })
                ? styles.icon
                : styles.isActiveIcon
            }
            onClick={() =>
              editor.chain().focus().setImage({ float: "none" }).run()
            }
          >
            <i className="ri-align-center ri-xl"></i>
          </span>
        </li>
        <li>
          <span
            className={
              editor.isActive("custom-image", {
                float: "right",
              })
                ? styles.icon
                : styles.isActiveIcon
            }
            onClick={() =>
              editor.chain().focus().setImage({ float: "right" }).run()
            }
          >
            <i className="ri-align-right ri-xl"></i>
          </span>
        </li>
      </ul>
    );
  }

  return (
    <ul className={styles.wrapper}>
      <li>
        <span
          className={
            editor.isActive("link") ? styles.icon : styles.isActiveIcon
          }
          onClick={setLink}
        >
          <i className="ri-links-line ri-xl"></i>
        </span>
      </li>

      <li
        onClick={() => {
          editor.chain().focus().toggleBold().run();
          console.log(editor.isActive("bold"));
        }}
        className={editor.isActive("bold") ? styles.icon : styles.isActiveIcon}
      >
        <span className={styles.icon}>
          <i className="ri-bold ri-xl"></i>
        </span>
      </li>
      <li
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={
          editor.isActive("italic") ? styles.icon : styles.isActiveIcon
        }
      >
        <span className={styles.icon}>
          <i className="ri-italic ri-xl"></i>
        </span>
      </li>

      <li
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      >
        <span
          className={
            editor.isActive({ level: 1 }) ? styles.icon : styles.isActiveIcon
          }
        >
          <i className="ri-h-1 ri-xl"></i>
        </span>
      </li>
      <li
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        <span
          className={
            editor.isActive({ level: 2 }) ? styles.icon : styles.isActiveIcon
          }
        >
          <i className="ri-h-2 ri-xl"></i>
        </span>
      </li>
      <li
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
      >
        <span
          className={
            editor.isActive({ level: 3 }) ? styles.icon : styles.isActiveIcon
          }
        >
          <i className="ri-h-3 ri-xl"></i>
        </span>
      </li>
      <li
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={
          editor.isActive("bulletList") ? styles.icon : styles.isActiveIcon
        }
      >
        <span className={styles.icon}>
          <i className="ri-list-unordered ri-xl"></i>
        </span>
      </li>
      <li
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={
          editor.isActive("orderedList") ? styles.icon : styles.isActiveIcon
        }
      >
        <span className={styles.icon}>
          <i className="ri-list-ordered ri-xl"></i>
        </span>
      </li>
      <li
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={
          editor.isActive("codeBlock") ? styles.icon : styles.isActiveIcon
        }
      >
        <span className={styles.icon}>
          <i className="ri-code-line ri-xl"></i>
        </span>
      </li>
      <li
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={
          editor.isActive("blockQuote") ? styles.icon : styles.isActiveIcon
        }
      >
        <span className={styles.icon}>
          <i className="ri-double-quotes-r ri-xl"></i>
        </span>
      </li>
    </ul>
  );
}

export { PopupMenu };
