import styles from "./Main.module.scss";
import { ReactElement } from "react";

function Main({ children }: { children: ReactElement | ReactElement[] }) {
  return <main className={styles.main}>{children}</main>;
}

export default Main;
