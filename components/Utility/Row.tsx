import styles from "./Row.module.scss";

function Row({ companyname }: { companyname: string }) {
  return (
    <div
      className={styles.row}
      onClick={() => {
        console.log("aaaaaaa");
      }}
    >
      <h3>{companyname}</h3>
    </div>
  );
}

export default Row;
