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
import { useState } from "react";

const navBarIconStyle = { width: "30px", height: "30px", cursor: "pointer" };

function MobileHeader() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <header className={styles.wrapper}>
        <div>
          <Link href="/">
            <>
              <LightBulbIcon
                style={{ width: "50px", height: "50px", cursor: "pointer" }}
              />
            </>
          </Link>
        </div>
        <div onClick={() => setShowModal(!showModal)}>
          {showModal ? (
            <XIcon
              style={{ width: "30px", height: "30px", cursor: "pointer" }}
            />
          ) : (
            <MenuIcon
              style={{ width: "30px", height: "30px", cursor: "pointer" }}
            />
          )}
        </div>
      </header>
      {showModal && (
        <nav className={styles.menu}>
          <ul>
            <Link href="/">
              <li onClick={() => setShowModal(false)}>ホーム</li>
            </Link>
            <Link href="/note">
              <li onClick={() => setShowModal(false)}>クリップした記事</li>
            </Link>
            <Link href="/newspublic">
              <li onClick={() => setShowModal(false)}>みんなの記事</li>
            </Link>
            <Link href="/post">
              <li onClick={() => setShowModal(false)}>作成</li>
            </Link>
            <Link href="/profile">
              <li onClick={() => setShowModal(false)}>プロフィール</li>
            </Link>
          </ul>
        </nav>
      )}
    </>
  );
}

export { MobileHeader };
