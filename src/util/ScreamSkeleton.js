import React, { Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import NoImage from '../images/no-img.png';
// MUI
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

const styles = {
    SkeletonCard: {
        display: 'flex',
        marginBottom: 20,
    },
    SkeletonImage: {
        minWidth: 200,
    },
    SkeletonContent: {
        padding: 25,
        objectFit: 'cover',
        width: '100%',
    },
    handle:{
        height: 25,
        backgroundColor: '#00bcd4',
        width: '15%',
        marginBottom: 10
    },
    date: {
        height: 15,
        backgroundColor: 'rgba(0,0,0,0.3)',
        width: '25%',
        marginBottom: 10
    },
    fullLine: {
        height: 15,
        backgroundColor: 'rgba(0,0,0,0.6)',
        width: '90%',
        marginBottom: 10
    },
    halfLine: {
        height: 15,
        backgroundColor: 'rgba(0,0,0,0.6)',
        width: '50%',
        marginBottom: 10
    }
};

const ScreamSkeleton = (props) => {
    console.log('----ScreamSkeleton:::', 'loading...');
    const { classes } = props;

    const content = Array.from({ length: 5 }).map((item, index) => (
        <Card className={classes.SkeletonCard} key={index}>
            <CardMedia className={classes.SkeletonImage} image={NoImage}/>
            <CardContent className={classes.SkeletonContent}>
                <div className={classes.handle}/>
                <div className={classes.date}/>
                <div className={classes.fullLine}/>
                <div className={classes.fullLine}/>
                <div className={classes.halfLine}/>
            </CardContent>
        </Card>
    ))

    return <Fragment>{content}</Fragment>
}

export default withStyles(styles)(ScreamSkeleton);