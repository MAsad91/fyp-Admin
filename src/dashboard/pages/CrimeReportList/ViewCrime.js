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
import ImgCarousel from "../../shared/ImgCarousel";

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
      const result = await axios.get(
        `http://localhost:5000/crime-report/report/${id}`
      );
      setUserData(result.data.report);
      console.log(result.data.report);
      // setUser(data);
    };
    LoadUserData();
  }, []);
  console.log(userData?.images);
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
              Type: {userData?.crimetype}
            </Typography>
            <Typography variant="h5" color="text.secondary">
              Detail: {userData?.details}
            </Typography>
            <Typography variant="h5" color="text.secondary">
              Location: {userData?.location}
            </Typography>
          </CardContent>
          {/* <ImgCarousel
            image={userData.images?.map((img) => {
              return "http://localhost:5000/" + img;
            })}
          /> */}
          <CardMedia
            component="img"
            // height="194"
            image={userData.images?.map((img) => {
              return "http://localhost:5000/" + img;
            })}
            alt="Crime Images"
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default ViewUser;
