import {
  LightBulbIcon,
  NewspaperIcon,
  ScissorsIcon,
  CloudIcon,
  PencilIcon,
  UserIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/dist/client/link";

import styles from "./Header.module.scss";

const navBarIconStyle = { width: "30px", height: "30px", cursor: "pointer" };

function Header() {
  const [isExpand, setIsExpand] = useState(false);
  const router = useRouter();

  return (
    <header
      className={styles.header}
      style={{ width: isExpand ? "200px" : "80px" }}
    >
      <div className={styles.Icon}>
        <Link href="/">
          <LightBulbIcon
            style={{ width: "50px", height: "50px", cursor: "pointer" }}
            onClick={() => {
              router.push("/");
              router.reload();
            }}
          />
        </Link>
      </div>
      <nav>
        <ul>
          <Link href="/">
            <li>
              <span>
                <NewspaperIcon style={navBarIconStyle} />
              </span>
              <span
                style={{
                  opacity: isExpand ? "1" : "0",
                }}
              >
                ホーム
              </span>
            </li>
          </Link>
          <Link href="/note">
            <li>
              <span>
                <ScissorsIcon style={navBarIconStyle} />
              </span>
              <span
                style={{
                  opacity: isExpand ? "1" : "0",
                }}
              >
                クリップした記事
              </span>
            </li>
          </Link>
          <Link href="/newspublic">
            <li>
              <span>
                <CloudIcon style={navBarIconStyle} />
              </span>
              <span
                style={{
                  opacity: isExpand ? "1" : "0",
                }}
              >
                みんなの記事
              </span>
            </li>
          </Link>
          <Link href="/post">
            <li>
              <span>
                <PencilIcon style={navBarIconStyle} />
              </span>
              <span
                style={{
                  opacity: isExpand ? "1" : "0",
                }}
              >
                記事の作成
              </span>
            </li>
          </Link>
          <Link href="/profile">
            <li>
              <span>
                <UserIcon style={navBarIconStyle} />
              </span>
              <span
                style={{
                  opacity: isExpand ? "1" : "0",
                }}
              >
                プロフィール
              </span>
            </li>
          </Link>
        </ul>
      </nav>
      <div>
        {!isExpand ? (
          <ChevronRightIcon
            style={{ width: "20px", height: "20px", cursor: "pointer" }}
            onClick={() => {
              setIsExpand(!isExpand);
            }}
          />
        ) : (
          <ChevronLeftIcon
            style={{ width: "20px", height: "20px", cursor: "pointer" }}
            onClick={() => {
              setIsExpand(!isExpand);
            }}
          />
        )}
      </div>
    </header>
  );
}

export default Header;
