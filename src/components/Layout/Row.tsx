import styles from "./Row.module.scss";

function Row({ companyname }: { companyname: string }) {
  const consolehandler = () => {
    console.log("aaaaaaaa");
  };

  return (
    <div className={styles.row}>
      <h3 onClick={consolehandler}>{companyname}</h3>
    </div>
  );
}

export { Row };
