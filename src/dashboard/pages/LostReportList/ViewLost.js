import axios from 'axios';
import React from 'react'
import { Card, CardContent, Typography, Grid} from '@material-ui/core';
import cx from 'classnames';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import styles from '../../components/cards/Cards.module.css';

const ViewUser = () => {
    const [userData, setUserData]= useState({});
    const {id} = useParams();
    // alert(id);
    console.log(id);
    // const [userData, setUserData] = useState([]);
    const navigate = useNavigate();
    
    useEffect(() =>{
        const LoadUserData = async() => {
          const result = await axios.get(`http://localhost:5000/lost-report/report/${id}`);
          setUserData(result.data.report);
          console.log(result.data.report);
          // setUser(data);
        }
        LoadUserData();
        
      },[])
      console.log(userData);
  return (
    <div className={styles.container}>
        <Grid container spacing={10} justify='center'>
            <Grid item component={Card}  
            className={cx(styles.card,styles.crime)}>
                        <CardContent className='card-content'>
                            <Typography variant='h4' gutterBottom> Lost Item Data </Typography>
                            <Typography variant='h5' color="text.secondary">ID:  {userData?._id}   
                            </Typography>
                            <Typography variant='h5' color="text.secondary">Name:  {userData?.name}   
                            </Typography>
                            <Typography variant='h5' color="text.secondary">Item Name:  {userData?.itemname}   
                            </Typography>
                            <Typography variant='h5' color="text.secondary">State:  {userData?.state}   
                            </Typography>
                            <Typography variant='h5' color="text.secondary">Item Type:  {userData?.lostitemtype}   
                            </Typography>
                            <Typography variant='h5' color="text.secondary">color: {userData?.color}   
                            </Typography>
                            <Typography variant='h5' color="text.secondary">Description: {userData?.description}   
                            </Typography>
                            <Typography variant='h5' color="text.secondary">Detail: {userData?.details}   
                            </Typography>
                            <Typography variant='h5' color="text.secondary">Location: {userData?.location}</Typography>
                            <Typography variant='h5' color="text.secondary">Images</Typography> 
                              
                            
                        </CardContent>    
            </Grid>
        </Grid>
    </div>
  )
}

export default ViewUser