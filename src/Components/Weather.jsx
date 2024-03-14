import React, { useState } from "react";
import styles from "./Weather.module.css";
import Cellular from "../Assets/Cellular.svg";
import Wifi1 from "../Assets/Wifi1.svg";
import Battery1 from "../Assets/Battery1.svg";
import bg from "../Assets/Bg.svg";
import { Link } from "react-router-dom";

const Weather = ({ data, fetchData }) => {
  const [search, setsearch] = useState("");
  const [showSearchTab, setShowSearchTab] = useState(false);
  const toggleSearchTab = () => {
    if (search) {
      fetchData(search);
    } else {
      setShowSearchTab(!showSearchTab);
    }
  };

  const handleSearchChange = (e) => {
    setsearch(e.target.value);
  };

  const lastUpdatedTime = data?.current?.last_updated;

  const getNextFourHours = (time) => {
    const nextFourHours = [];
    const currentTime = new Date(time);
    for (let i = 1; i <= 4; i++) {
      const nextHour = new Date(currentTime.getTime() + i * 60 * 60 * 1000);
      nextFourHours.push(nextHour);
    }
    return nextFourHours;
  };

  const nextFourHours = getNextFourHours(lastUpdatedTime);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  console.log(data);
  return (
    <div className={styles.container}>
      {/* Status Bar */}
      <div className={styles.statusbar}>
        <div>
          <p>9:41</p>
        </div>
        <div>
          <img src={Cellular} alt="Cellular" />
          <img src={Wifi1} alt="Wifi" />
          <img src={Battery1} alt="Battery" />
        </div>
      </div>

      {/* Search Section */}
      <div className={styles.topBar}>
        <div className={styles.menuIcon}>
          <Link to="/">
            <div className={styles.bar1}></div>
            <div className={styles.bar2}></div>
          </Link>
        </div>
        <div className={styles.searchContainer}>
          <button className={styles.searchIcon} onClick={toggleSearchTab}>
            <i className="fa fa-search"></i>
          </button>
          {showSearchTab && (
            <input
              type="text"
              value={search}
              onChange={handleSearchChange}
              placeholder="Enter location"
            />
          )}
        </div>
      </div>

      {/* City Details */}
      <div className={styles.cityDetails}>
        <div className={styles.cityInfo}>
          <div className={styles.cityName}>
            {data?.location.name},<br></br>
            {data?.location.country}
          </div>
          <div className={styles.date}>
            {data &&
              data.current.last_updated.split(" ")[0] &&
              formatDate(data.current.last_updated.split(" ")[0])}
          </div>
          <div className={styles.weatherIcon}>
            <img
              src={`https:${data?.current?.condition.icon}`}
              alt="Weather Icon"
              className="icon-img"
            />
            <span>{data?.current?.condition.text}</span>
          </div>
        </div>
        <div>
          <img className={styles.cityImage} src={bg} alt="city" />
        </div>
      </div>

      {/* Weather Data */}
      <div className={styles.weatherPredictor}>
        <div className={styles.currentWeather}>
          <div>{data?.current?.last_updated.split(" ")[1]}</div>
          <div>
            <img
              className={styles.currentWeatherIcon}
              src={`https:${data?.current?.condition.icon}`}
              alt="weather-icon"
            />
          </div>
          <div>{data?.current?.temp_c}℃</div>
        </div>
        <hr></hr>
        {nextFourHours.map((hour, index) => {
          const nextHourData =
            data &&
            data.forecast &&
            data.forecast.forecastday[0].hour.find((hourData) => {
              const hourStr = hour.getHours().toString().padStart(2, "0");
              return hourData.time.split(" ")[1].startsWith(hourStr);
            });
          return (
            <div className={styles.weatherHour} key={index}>
              <div>{hour.getHours().toString().padStart(2, "0")}:00</div>
              <img
                src={`https:${nextHourData && nextHourData.condition.icon}`}
                alt="weather-icon"
              />
              <div>{nextHourData && nextHourData.temp_c}℃</div>
            </div>
          );
        })}
      </div>
      <hr></hr>

      {/* Additional Info */}
      <div className={styles.additionalInfo}>
        <h2>Additional Info</h2>
        <div className={styles.additionalInfoItem}>
          <div className={styles.precipitationData}>
            <p className={styles.precipitation}>Precipitation</p>
            <div>{data?.current?.uv}%</div>
          </div>
          <div className={styles.humidityData}>
            <p className={styles.humidity}>Humidity</p>
            <div>{data?.current?.humidity}</div>
          </div>
          <div className={styles.windyData}>
            <p className={styles.windy}>Windy</p>
            <div>{data?.current?.wind_kph}km/h</div>
          </div>
        </div>
      </div>
      <hr></hr>

      {/* Temperature Section */}
      <div className={styles.tempratureDetails}>
        <div className={styles.tempHead}>Temprature</div>
        <div className={styles.monthSelector}>
          <select id="mySelect" className={styles.monthSelector}>
            <option value="option1">Last Month</option>
            <option value="option2">Yesterday</option>
            <option value="option3">Today</option>
          </select>
        </div>
      </div>

      <div className={styles.waves}></div>
    </div>
  );
};

export default Weather;
