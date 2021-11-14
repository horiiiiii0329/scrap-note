import styles from "./Row.module.scss";

function Row({ companyname }: { companyname: string }) {
  return (
    <div className={styles.row}>
      <h3>{companyname}</h3>
    </div>
  );
}

export default Row;
