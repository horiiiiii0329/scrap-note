import styles from "./WeatherDate.module.scss";
import Weather from "../Layout/Weather";
import { useState, useEffect } from "react";
import moment from "moment";
import "moment/locale/ja";
import { IWeatherCard } from "../../type";

moment.locale("ja");

function WeatherDate({ weatherNews }: IWeatherCard | any) {
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
      <div className={styles.bottom_left}>
        <Weather weatherNews={weatherNews} />
      </div>
      <div className={styles.bottom_right}>
        <p>{dateState}</p>
      </div>
    </div>
  );
}

export default WeatherDate;
