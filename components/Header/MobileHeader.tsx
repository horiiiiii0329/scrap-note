import {
  LightBulbIcon,
  NewspaperIcon,
  ScissorsIcon,
  CloudIcon,
  PencilIcon,
  UserIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  MenuIcon,
  XIcon,
} from "@heroicons/react/outline";
import Link from "next/dist/client/link";
import styles from "./MobileHeader.module.scss";
import { useState, useEffect } from "react";

const navBarIconStyle = { width: "30px", height: "30px", cursor: "pointer" };

function MobileHeader() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <header className={styles.Header}>
        <div>
          <Link href="/">
            <LightBulbIcon
              style={{ width: "50px", height: "50px", cursor: "pointer" }}
              onClick={() => {}}
            />
          </Link>
        </div>
        <div onClick={() => setShowModal(!showModal)}>
          {showModal ? (
            <XIcon
              style={{ width: "40px", height: "40px", cursor: "pointer" }}
            />
          ) : (
            <MenuIcon
              style={{ width: "40px", height: "40px", cursor: "pointer" }}
            />
          )}
        </div>
      </header>
      {showModal && (
        <nav className={styles.menu}>
          <ul>
            <Link href="/">
              <li>ホーム</li>
            </Link>
            <Link href="/note">
              <li>クリップした記事</li>
            </Link>
            <Link href="/newsoublic">
              <li>みんなの記事</li>
            </Link>
            <Link href="/post">
              <li>作成</li>
            </Link>
            <Link href="/profile">
              <li>プロフィール</li>
            </Link>
          </ul>
        </nav>
      )}
    </>
  );
}

export default MobileHeader;
