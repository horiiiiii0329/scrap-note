import "remixicon/fonts/remixicon.css";
import { useCallback } from "react";
import styles from "./PopupMenu.module.css";

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
            <i className="ri-image-line ri-xs"></i>
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
            <i className="ri-image-line ri-sm"></i>
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
            <i className="ri-image-line"></i>
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
            <i className="ri-align-left"></i>
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
            <i className="ri-align-center"></i>
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
            <i className="ri-align-right"></i>
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
          <i className="ri-links-line"></i>
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
          <i className="ri-bold"></i>
        </span>
      </li>
      <li
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={
          editor.isActive("italic") ? styles.icon : styles.isActiveIcon
        }
      >
        <span className={styles.icon}>
          <i className="ri-italic"></i>
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
          <i className="ri-h-1"></i>
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
          <i className="ri-h-2"></i>
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
          <i className="ri-h-3"></i>
        </span>
      </li>
      <li
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={
          editor.isActive("bulletList") ? styles.icon : styles.isActiveIcon
        }
      >
        <span className={styles.icon}>
          <i className="ri-list-unordered"></i>
        </span>
      </li>
      <li
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={
          editor.isActive("orderedList") ? styles.icon : styles.isActiveIcon
        }
      >
        <span className={styles.icon}>
          <i className="ri-list-ordered"></i>
        </span>
      </li>
      <li
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={
          editor.isActive("codeBlock") ? styles.icon : styles.isActiveIcon
        }
      >
        <span className={styles.icon}>
          <i className="ri-code-line"></i>
        </span>
      </li>
      <li
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={
          editor.isActive("blockQuote") ? styles.icon : styles.isActiveIcon
        }
      >
        <span className={styles.icon}>
          <i className="ri-double-quotes-r"></i>
        </span>
      </li>
    </ul>
  );
}

export default PopupMenu;
