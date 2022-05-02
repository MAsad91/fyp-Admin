import React from 'react';
import { Card, CardContent, Typography, Grid} from '@material-ui/core';
import CountUp from 'react-countup';
import cx from 'classnames';
import styles from './Cards.module.css';
const Cards = (props) => {

    return(
        // <div className='container'>
        //     <main>
        //        <h1>Dashboard</h1> 
        //        <div className='insights'>
        //            <div className='crime'>
        //                <div className='middle'>
        //                    <div className='left'>
        //                     <h3>
        //                         All Crime Report
        //                     </h3>
        //                     <h1>10,000</h1>
        //                    </div>
        //                    <div className='progress'>
        //                        <svg>
        //                            <circle cx ='38'  cy='38' r='36'></circle>
        //                        </svg>
        //                        <div className='number'>
        //                            <p>80%</p>
        //                        </div>
        //                    </div>
        //                </div>
        //                <small className='text-muted'>Last 24 Hours</small>
        //            </div>
        //            <div className='safe-life'>
        //                <div className='middle'>
        //                    <div className='left'>
        //                     <h3>
        //                         All Safe Life Report
        //                     </h3>
        //                     <h1>10,000</h1>
        //                    </div>
        //                    <div className='progress'>
        //                        <svg>
        //                            <circle cx ='38'  cy='38' r='36'></circle>
        //                        </svg>
        //                        <div className='number'>
        //                            <p>80%</p>
        //                        </div>
        //                    </div>
        //                </div>
        //                <small className='text-muted'>Last 24 Hours</small>
        //            </div>
        //            <div className='lost-found'>
        //                <div className='middle'>
        //                    <div className='left'>
        //                     <h3>
        //                         Lost And Found Items
        //                     </h3>
        //                     <h1>10,000</h1>
        //                    </div>
        //                    <div className='progress'>
        //                        <svg>
        //                            <circle cx ='38'  cy='38' r='36'></circle>
        //                        </svg>
        //                        <div className='number'>
        //                            <p>80%</p>
        //                        </div>
        //                    </div>
        //                </div>
        //                <small className='text-muted'>Last 24 Hours</small>
        //            </div>
        //            <div className='certificate-permit'>
        //                <div className='middle'>
        //                    <div className='left'>
        //                     <h3>
        //                         All Certificate And Permit Report
        //                     </h3>
        //                     <h1>10,000</h1>
        //                    </div>
        //                    <div className='progress'>
        //                        <svg>
        //                            <circle cx ='38'  cy='38' r='36'></circle>
        //                        </svg>
        //                        <div className='number'>
        //                            <p>80%</p>
        //                        </div>
        //                    </div>
        //                </div>
        //                <small className='text-muted'>Last 24 Hours</small>
        //            </div>
        //            <div className='community'>
        //                <div className='middle'>
        //                    <div className='left'>
        //                     <h3>
        //                         All Community Services Report
        //                     </h3>
        //                     <h1>10,000</h1>
        //                    </div>
        //                    <div className='progress'>
        //                        <svg>
        //                            <circle cx ='38'  cy='38' r='36'></circle>
        //                        </svg>
        //                        <div className='number'>
        //                            <p>80%</p>
        //                        </div>
        //                    </div>
        //                </div>
        //                <small className='text-muted'>Last 24 Hours</small>
        //            </div>



        //        </div>
        //     </main>
        // </div>
        <div className={styles.container}>
            <Grid container spacing={3} justify='center'>
                <Grid item component={Card}
                xs={12} md={3} className={cx(styles.Card,styles.crime)}>
                    <CardContent className='card-content'>
                        <Typography color='textSecondary' gutterBottom>All Crime Report</Typography>
                        <Typography variant='h5'>
                            <CountUp start={0} end={1000} duration={2.5} separator="," />   
                        </Typography>
                        <Typography variant='body2'>Number of Cases Report</Typography>
                    </CardContent>    
                </Grid>
                <Grid item component={Card} 
                xs={12} md={3} className={cx(styles.Card,styles.safeLife)}>
                    <CardContent className='card-content'>
                        <Typography color='textSecondary' gutterBottom>All Save Life Report</Typography>
                        <Typography variant='h5'>
                            <CountUp start={0} end={2000} duration={2.5} separator="," />
                        </Typography>
                        <Typography variant='body2'>Number of Cases Report</Typography>
                    </CardContent>
                    
                </Grid>
                <Grid item component={Card} 
                xs={12} md={3} className={cx(styles.Card,styles.lostFound)}>
                    <CardContent className='card-content'>
                        <Typography color='textSecondary' gutterBottom>Lost And Found Item</Typography>
                        <Typography variant='h5'>
                            <CountUp start={0} end={3000} duration={2.5} separator="," />
                        </Typography>
                        <Typography variant='body2'>Number of Cases Report</Typography>
                    </CardContent>
                    
                </Grid>
                <Grid item component={Card} xs={12} md={3} className={cx(styles.Card,styles.certificatePermit)}>
                    <CardContent className='card-content'>
                        <Typography color='textSecondary' gutterBottom>All Certificate And permits</Typography>
                        <Typography variant='h5'>
                            <CountUp start={0} end={4000} duration={2.5} separator="," />
                        </Typography>
                        <Typography variant='body2'>Number of Cases Report</Typography>
                    </CardContent>
                    
                </Grid>
                <Grid item component={Card} xs={12} md={3} className={cx(styles.Card,styles.communityService)}>
                    <CardContent className='card-content'>
                        <Typography color='textSecondary' gutterBottom>All Community Services Report</Typography>
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