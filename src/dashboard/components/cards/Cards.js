import React from 'react';
import { Card, CardContent, Typography, Grid} from '@material-ui/core';
import CountUp from 'react-countup';
import cx from 'classnames';
import styles from './Cards.module.css';
const Cards = () => {

    return(
        <div className={styles.container}>
            <Grid container spacing={3} justify='center'>
                <Grid item component={Card} xs={12} sm={6} md={4} 
                className={cx(styles.Card,styles.crime)}>
                    <CardContent className='card-content'>
                        <Typography variant='h5' gutterBottom> Crime </Typography>
                        <Typography variant='h5'>
                            <CountUp start={0} end={1000} duration={2.5} separator="," />   
                        </Typography>
                        <Typography variant='body2'>Number of Cases Report</Typography>
                    </CardContent>    
                </Grid>
                <Grid item component={Card} 
                xs={12} sm={6} md={4} className={cx(styles.Card,styles.safeLife)}>
                    <CardContent className='card-content'>
                        <Typography variant='h5' gutterBottom> Save Life </Typography>
                        <Typography variant='h5'>
                            <CountUp start={0} end={2000} duration={2.5} separator="," />
                        </Typography>
                        <Typography variant='body2'>Number of Cases Report</Typography>
                    </CardContent>
                    
                </Grid>
                <Grid item component={Card} 
                xs={12} sm={6} md={4} className={cx(styles.Card,styles.lostFound)}>
                    <CardContent className='card-content'>
                        <Typography variant='h5' gutterBottom>Lost Item</Typography>
                        <Typography variant='h5'>
                            <CountUp start={0} end={3000} duration={2.5} separator="," />
                        </Typography>
                        <Typography variant='body2'>Number of Cases Report</Typography>
                    </CardContent>
                    
                </Grid>
                <Grid item component={Card} 
                xs={12} sm={6} md={4} className={cx(styles.Card,styles.lostFound)}>
                    <CardContent className='card-content'>
                        <Typography variant='h5' gutterBottom> Found Item</Typography>
                        <Typography variant='h5'>
                            <CountUp start={0} end={3000} duration={2.5} separator="," />
                        </Typography>
                        <Typography variant='body2'>Number of Cases Report</Typography>
                    </CardContent>
                    
                </Grid>
                <Grid item component={Card} sm={6} xs={12} md={4} className={cx(styles.Card,styles.certificatePermit)}>
                    <CardContent className='card-content'>
                        <Typography variant='h5' gutterBottom> Certificate And permits</Typography>
                        <Typography variant='h5'>
                            <CountUp start={0} end={4000} duration={2.5} separator="," />
                        </Typography>
                        <Typography variant='body2'>Number of Cases Report</Typography>
                    </CardContent>
                    
                </Grid>
                <Grid item component={Card} sm={6} xs={12} md={4} className={cx(styles.Card,styles.communityService)}>
                    <CardContent className='card-content'>
                        <Typography variant='h5' gutterBottom> Community Services </Typography>
                        <Typography variant='h5'>
                            <CountUp start={0} end={5000} duration={2.5} separator="," />
                        </Typography>
                        <Typography variant='body2'>Number of Cases Report</Typography>
                    </CardContent>
                </Grid>
            </Grid>
                </div>
    );

}
export default Cards;