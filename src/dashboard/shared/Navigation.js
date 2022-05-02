import React from "react";
import { NavLink } from "react-router-dom";

import styles from "./Navigation.module.css";
// import logo from "../utils/logo.png";

const Navigation = () => {
  return (
    <div className={styles.container}>
      <aside>
        <div className={styles.top}>
          <div className={styles.logo}>
            <img src={logo} alt="logo" />
            <h3>Safe City Services</h3>
          </div>
          <div className={styles.close} id="close-btn">
            <span className="material-icons-sharp">close</span>
          </div>
        </div>
        <div className={styles.sidebar}>
          <NavLink activeClassName={styles.active} to="/">
            <span class="material-icons-sharp">home</span>
            <h4>Home</h4>
          </NavLink>

          <NavLink
            activeClassName={styles.active}
            to={`/crimereport`}
          >
            <span class="material-icons-sharp"> report </span>
            <h4>Crime Report</h4>
          </NavLink>

          <NavLink
            activeClassName={styles.active}
            to={`/safelifereport`}
          >
            <span class="material-icons-sharp"> health_and_safety </span>
            <h4> Safe Life Report</h4>
          </NavLink>

          <NavLink
            activeClassName={styles.active}
            to={`/lostfoundreport`}
          >
            <span class="material-icons-sharp"> category </span>
            <h4>Lost Item Report</h4>
          </NavLink>

          <NavLink
            activeClassName={styles.active}
            to={`/communityservices`}
          >
            <span class="material-icons-sharp"> miscellaneous_services </span>
            <h4>Request Community Services</h4>
          </NavLink>

          <NavLink
            activeClassName={styles.active}
            to={`/certificatepermits`}
          >
            <span class="material-icons-sharp"> miscellaneous_services </span>
            <h4> Request Certificate And Permits</h4>
          </NavLink>
          <div className="action">
            <button className={styles.button} >
              LogOut
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Navigation;