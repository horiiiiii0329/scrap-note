import styles from "./WeatherDate.module.scss";
import Weather from "../Layout/Weather";
import { useState, useEffect } from "react";
import moment from "moment";
import "moment/locale/ja";
moment.locale("ja");

function WeatherDate({ weatherNews }: any) {
  const [dateState, setDateState] = useState(
    moment().format("MMMM Do YYYY, h:mm:ss a")
  );
  useEffect(() => {
    setInterval(
      () => setDateState(moment().format("MMMM Do YYYY, h:mm:ss a")),
      1000
    );
  }, []);
  return (
    <div className={styles.bottom}>
      <div className={styles.bottom_right}>
        <Weather weatherNews={weatherNews} />
      </div>
      <div className={styles.bottom_left}>
        <p>{dateState}</p>
      </div>
    </div>
  );
}

export default WeatherDate;
