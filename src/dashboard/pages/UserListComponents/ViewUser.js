import axios from "axios";
import React from "react";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import cx from "classnames";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "../../shared/MediaCards.module.css";

const ViewUser = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    contactno: "",
    address: "",
  });
  const { id } = useParams();
  useEffect(() => {
    const LoadUserData = async () => {
      const result = await axios.get(`http://localhost:5000/userlist/${id}`);
      setUserData(result.data[0]);
      console.log(result);
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
              Name: {userData.name}
            </Typography>
            <Typography variant="h5" color="text.secondary">
              Email: {userData.email}
            </Typography>
            <Typography variant="h5" color="text.secondary">
              Contact No: {"0" + userData.contactno}
            </Typography>
            <Typography variant="h5" color="text.secondary">
              Address: {userData.address}
            </Typography>
            <Typography variant="h5" color="text.secondary">
              Crime Reports: {userData.crimereports?.length}
            </Typography>
            <Typography variant="h5" color="text.secondary">
              safe life Reports: {userData.safelifereports?.length}
            </Typography>
            <Typography variant="h5" color="text.secondary">
              Lost Reports: {userData.lostitemsreports?.length}
            </Typography>
            <Typography variant="h5" color="text.secondary">
              Found Reports: {userData.founditemsreports?.length}
            </Typography>
            <Typography variant="h5" color="text.secondary">
              Certificates & Permits:{" "}
              {userData.certificatespermitsrequests?.length}
            </Typography>
            <Typography variant="h5" color="text.secondary">
              Community Services: {userData.communityservicesrequests?.length}
            </Typography>
          </CardContent>
        </Grid>
      </Grid>
    </div>
  );
};

export default ViewUser;
