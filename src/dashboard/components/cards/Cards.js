import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardActionArea, Typography, Grid} from '@material-ui/core';
import CountUp from 'react-countup';
import cx from 'classnames';
import styles from './Cards.module.css';
const Cards = (props) => {
    console.log(props.crimeCount);
    

    return(
        <div className={styles.container}>
            <Grid container spacing={3} justify='center'>
                <Grid item component={Card} xs={12} sm={6} md={4} 
                className={cx(styles.card,styles.crime)}>
                    <CardContent className='card-content'>
                        <Typography variant='h5' gutterBottom> Crime </Typography>
                        <Typography variant='h5' color="text.secondary">
                            <CountUp start={0} end={props.crimeCount} duration={2.5} separator="," />   
                        </Typography>
                        <Typography variant='body2' color="text.secondary">Number of Cases Report</Typography>
                    </CardContent>    
                </Grid>
                <Grid item component={Card} 
                xs={12} sm={6} md={4} className={cx(styles.card,styles.safeLife)}>
                    <CardContent className='card-content'>
                        <Typography variant='h5' gutterBottom> Save Life </Typography>
                        <Typography variant='h5'>
                            <CountUp start={0} end={props.saveLifeCount} duration={1} separator="," />
                        </Typography>
                        <Typography variant='body2'>Number of Cases Report</Typography>
                    </CardContent>
                    
                </Grid>
                <Grid item component={Card} 
                xs={12} sm={6} md={4} className={cx(styles.card,styles.lostFound)}>
                    <CardContent className='card-content'>
                        <Typography variant='h5' gutterBottom>Lost Item</Typography>
                        <Typography variant='h5'>
                            <CountUp start={0} end={props.lostCount} duration={1} separator="," />
                        </Typography>
                        <Typography variant='body2'>Number of Cases Report</Typography>
                    </CardContent>
                    
                </Grid>
                <Grid item component={Card} 
                xs={12} sm={6} md={4} className={cx(styles.card,styles.lostFound)}>
                    <CardContent className='card-content'>
                        <Typography variant='h5' gutterBottom> Found Item</Typography>
                        <Typography variant='h5'>
                            <CountUp start={0} end={props.foundCount} duration={1} separator="," />
                        </Typography>
                        <Typography variant='body2'>Number of Cases Report</Typography>
                    </CardContent>
                    
                </Grid>
                <Grid item component={Card} sm={6} xs={12} md={4} className={cx(styles.card,styles.certificatePermit)}>
                    <CardContent className='card-content'>
                        <Typography variant='h5' gutterBottom> Certificate And permits</Typography>
                        <Typography variant='h5'>
                            <CountUp start={0} end={props.certificateCount} duration={1} separator="," />
                        </Typography>
                        <Typography variant='body2'>Number of Cases Report</Typography>
                    </CardContent>
                    
                </Grid>
                <Grid item component={Card} sm={6} xs={12} md={4} className={cx(styles.card,styles.communityService)}>
                    <CardContent className='card-content'>
                        <Typography variant='h5' gutterBottom> Community Services </Typography>
                        <Typography variant='h5'>
                            <CountUp start={0} end={props.communityCount} duration={1} separator="," />
                        </Typography>
                        <Typography variant='body2'>Number of Cases Report</Typography>
                    </CardContent>
                </Grid>
            </Grid>
                </div>
    );

}
export default Cards;