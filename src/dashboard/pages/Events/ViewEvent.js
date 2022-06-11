import axios from "axios";
import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
} from "@material-ui/core";
import cx from "classnames";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "../../components/cards/Cards.module.css";

const ViewUser = () => {
  // <<<<<<< HEAD
  const [userData, setUserData] = useState({});
  const { id } = useParams();
  // alert(id);
  console.log(id);
  // const [userData, setUserData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const LoadUserData = async () => {
      const result = await axios.get(`http://localhost:5000/events/${id}`);
      setUserData(result.data.event);
      console.log(result.data.event);
      // setUser(data);
    };
    LoadUserData();
  }, []);
  console.log(userData);
  return (
    <div className={styles.container}>
      <Grid container spacing={10} justify="center">
        <Grid item component={Card} className={cx(styles.card, styles.crime)}>
          <CardContent className="card-content">
            <Typography variant="h4" gutterBottom>
              User Data
            </Typography>
            <Typography variant="h5" color="text.secondary">
              ID: {userData?._id}
            </Typography>
            <Typography variant="h5" color="text.secondary">
              Name: {userData?.name}
            </Typography>
            <Typography variant="h5" color="text.secondary">
              Type: {userData?.eventtype}
            </Typography>
            <Typography variant="h5" color="text.secondary">
              Detail: {userData?.details}
            </Typography>
            <Typography variant="h5" color="text.secondary">
              Location: {userData?.location}
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            height="194"
            image={userData.images[0]}
            alt="Event Images"
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default ViewUser;
