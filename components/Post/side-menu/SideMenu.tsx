import {
  XIcon,
  PhotographIcon,
  MinusIcon,
  FilmIcon,
} from "@heroicons/react/outline";
import styles from "./SideMenu.module.css";
import { useState, useEffect } from "react";
import GiphyJS from "../blocks/giphy/GiphyJS";

const iconStyle = { width: "12px" };

function SideMenu({ editor, gifClickHandler }: any) {
  const [isModalopen, setIsModalOpen] = useState(false);
  const [isGiphyOpen, setIsGiphyOpen] = useState(false);

  useEffect(() => {
    setIsModalOpen(false);
    setIsGiphyOpen(false);
  }, [editor.state]);

  const setHorizontal = () => editor.chain().focus().setHorizontalRule().run();

  const addImage = () => {
    const url = window.prompt("画像リンクを入力してください。");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  if (editor.isActive("image")) return null;

  console.log(editor.state);

  const handleKeypress = (e: any) => {
    if (e.keyCode) {
      console.log(e.keycode);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.openIcon}
        onClick={() => setIsModalOpen(!isModalopen)}
        style={
          isModalopen
            ? { transform: "rotate(0deg)" }
            : { transform: "rotate(45deg)" }
        }
      >
        <XIcon style={iconStyle} />
      </div>
      <div
        className={styles.tooltip}
        style={isModalopen ? { opacity: 1 } : { opacity: 0, display: "none" }}
        onBlur={() => setIsModalOpen(false)}
      >
        <span className={styles.openIcon} onClick={addImage}>
          <PhotographIcon style={iconStyle} />
        </span>

        <span className={styles.openIcon} onClick={gifClickHandler}>
          <FilmIcon style={iconStyle} />
        </span>
        <span className={styles.openIcon} onClick={setHorizontal}>
          <MinusIcon style={iconStyle} />
        </span>
        <span
          className={styles.openIcon}
          onClick={() => editor.chain().focus().unsetTextAlign().run()}
        >
          <span>
            <i className="ri-align-left ri-xs"></i>
          </span>
        </span>
      </div>
    </div>
  );
}

export default SideMenu;
