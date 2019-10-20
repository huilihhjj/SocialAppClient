import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import NoImage from '../images/no-img.png';
// MUI
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
    ...theme.styles,
    handle: {
        height:25,
        backgroundColor: '#00bcd4',
        width: 60,
        margin: '0 auto 10px auto'
    },
    fullLine: {
        height: 20,
        backgroundColor: 'rgba(0,0,0,0.6)',
        width: '90%',
        marginBottom: 10
    },
    halfLine: {
        height: 20,
        backgroundColor: 'rgba(0,0,0,0.6)',
        width: '50%',
        marginBottom: 10
    }
})

const ProfileSkeleton = (props) => {
    const { classes } = props;
    return (
        <Paper className={classes.paper}>
            <div className={classes.profile}>
                <div className="image-wrapper">
                    <img src={NoImage} alt="profile" className="profile-image" />
                </div>
                <hr />
                <div className="profile-details">
                    <div className={classes.handle}/>
                    <hr />
                    <div className={classes.fullLine}/>
                    <div className={classes.halfLine}/>
                    <hr />
                </div>
            </div>
        </Paper>
    )
}

export default withStyles(styles)(ProfileSkeleton);
