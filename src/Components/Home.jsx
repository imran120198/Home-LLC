import React from "react";
import styles from "./Home.module.css";
import Network from "../Assets/Network.svg";
import Wifi from "../Assets/Wifi.svg";
import Battery from "../Assets/Battery.svg";
import Cross from "../Assets/Cross.svg";
import locationIcon from "../Assets/locationIcon.svg";
import { Link } from "react-router-dom";

const Home = ({ data }) => {
  return (
    <div className={styles.container}>
      {/* Status Bar */}
      <div className={styles.statusbar}>
        <div>
          <p>9:41</p>
        </div>
        <div>
          <img src={Network} alt="Network" />
          <img src={Wifi} alt="Wifi" />
          <img src={Battery} alt="Battery" />
        </div>
      </div>

      {/* Location */}
      <div className={styles.location}>
        <div>
          <img className={styles.crossIcon} src={Cross} alt="Cross" />
        </div>
        <div>
          <Link to="/weather">
            <button className={styles.liveButton}>LIVE</button>
          </Link>
        </div>
      </div>

      {/* Current Location Section */}
      <div className={styles.currentLocation}>
        <img src={locationIcon} alt="locationIcon" />
        <p>CURRENT LOCATION</p>
      </div>

      {/* Location Name */}
      <div className={styles.locationName}>
        {data ? data.location.name : ""}, <br />
        {data ? data.location.country : ""}
      </div>
    </div>
  );
};

export default Home;
