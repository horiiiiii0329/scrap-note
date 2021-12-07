import styles from "./BlogWrapper.module.scss";
import { ReactElement } from "react";

function BlogWrapper({
  children,
}: {
  children: ReactElement | ReactElement[] | any;
}) {
  return <main className={styles.wrapper}>{children}</main>;
}

export { BlogWrapper };
