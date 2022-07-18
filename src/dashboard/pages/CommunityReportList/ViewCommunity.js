import axios from "axios";
import React from "react";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import cx from "classnames";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "../../shared/MediaCards.module.css";

const ViewUser = () => {
  const [userData, setUserData] = useState({});
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    const LoadUserData = async () => {
      const result = await axios.get(
        `http://localhost:5000/request-communityservices/report/${id}`
      );
      setUserData(result.data.report);
      console.log(result.data.report);
    };
    LoadUserData();
  }, []);
  console.log(userData);
  return (
    <div className={styles.container}>
      <Grid container spacing={10} justify="center">
        <Grid
          item
          component={Card}
          className={cx(styles.card, styles.bottomcolor)}
        >
          <CardContent className="card-content">
            <Typography variant="h4" gutterBottom>
              {" "}
              User Data{" "}
            </Typography>
            <Typography variant="h5" color="text.secondary">
              ID: {userData?._id}
            </Typography>
            <Typography variant="h5" color="text.secondary">
              Name: {userData?.name}
            </Typography>
            <Typography variant="h5" color="text.secondary">
              Type: {userData?.servicetype}
            </Typography>
            <Typography variant="h5" color="text.secondary">
              Detail: {userData?.details}
            </Typography>
          </CardContent>
        </Grid>
      </Grid>
    </div>
  );
};

export default ViewUser;
