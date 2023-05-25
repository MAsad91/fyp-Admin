import React from "react";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import CountUp from "react-countup";
import cx from "classnames";
import styles from "./Cards.module.css";
const Cards = (props) => {
  
  return (
    <div className={styles.container}>
      <Grid container spacing={3} justifyContent="center">
        <Grid
          item
          component={Card}
          xs={12}
          sm={6}
          md={4}
          className={cx(styles.card, styles.crime)}
        >
          <CardContent className="card-content">
            <Typography variant="h5" gutterBottom>
              {" "}
              Total User{" "}
            </Typography>
            <Typography variant="h5">
              <CountUp
                start={0}
                end={props.userCount}
                duration={2.5}
                separator=","
              />
            </Typography>
          </CardContent>
        </Grid>
        <Grid
          item
          component={Card}
          xs={12}
          sm={6}
          md={4}
          className={cx(styles.card, styles.safeLife)}
        >
          <CardContent className="card-content">
            <Typography variant="h5" gutterBottom>
              {" "}
              Total Property{" "}
            </Typography>
            <Typography variant="h5">
              <CountUp
                start={0}
                end={props.propertyCount}
                duration={1}
                separator=","
              />
            </Typography>
          </CardContent>
        </Grid>
      </Grid>
    </div>
  );
};
export default Cards;
