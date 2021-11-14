import styles from "./Main.module.scss";
import { ReactChild } from "react";

function Main({ children }: { children: ReactChild }) {
  return <main className={styles.main}>{children}</main>;
}

export default Main;
