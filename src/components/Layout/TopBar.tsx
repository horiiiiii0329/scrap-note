import { ReactChild } from "react";
import styles from "./TopBar.module.scss";

function TopBar({ children }: { children: ReactChild }) {
  return <div className={styles.topbar}>{children}</div>;
}

export { TopBar };
