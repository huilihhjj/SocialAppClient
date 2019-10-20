import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../../util/MyButton';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getScream, clearErrors } from '../../redux/actions/dataActions';
import LikeButton from './LikeButton';
import Comments from './Comments';
import CommentForm from './CommentForm';
// MUI
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
//icons
import CloseIcon from '@material-ui/icons/Close';
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
import ChatIcon from '@material-ui/icons/Chat';

const styles = theme => ({
    ...theme.styles,
    profileImage:{
        maxWidth: '100%',
        height: 200,
        borderRadius: '50%',
        objectFit: 'cover'
    },
    dialogContent:{
        padding: 20
    },
    closeButton: {
        position: 'absolute',
        left: '90%'
    },
    expandButton:{
        position: 'absolute',
        left: '90%'
    },
    spinnerDiv:{
        textAlign: 'center',
        marginTop: 50,
        marginBottom: 50
    }
})

class ScreamDialog extends Component {
    state = {
        open: false,
        oldPath: '',
        newPath: ''
    }
    componentDidMount(){
        if(this.props.openDialog){
            this.handleOpen();
        }
    }
    handleOpen = () => {
        let oldPath = window.location.pathname;
        const { userHandle, screamId } = this.props;
        const newPath = `/users/${userHandle}/scream/${screamId}`;
        if(oldPath === newPath) oldPath=`/users/${userHandle}`;
        window.history.pushState(null,null,newPath);
        this.setState({ open: true, oldPath, newPath });
        this.props.getScream(this.props.screamId);
    }
    handleClose = () => {
        window.history.pushState(null,null,this.state.oldPath);
        this.setState({ open: false });
        this.props.clearErrors();
    }
    render() {
        const {
            classes,
            scream: { screamId, body, createdAt, likeCount, commentCount, userImage, userHandle, comments },
            UI: { loading }
        } = this.props;
        console.log('----ScreamDialog:::render:::', 'this.props: ', this.props);
        const dialogMarkup = loading ? (
            <div className={classes.spinnerDiv}>
                <CircularProgress size={200} thickness={2}/>
            </div>
        ):(
            <Grid container spacing={2}>
                <Grid item sm={5}>
                    <img src={userImage} alt="profile" className={classes.profileImage}/>
                </Grid>
                <Grid item sm={7}>
                    <Typography component={Link} color='primary' variant='h5' to={`/users/${userHandle}`}>
                        @{userHandle}
                    </Typography>
                    <hr className={classes.invisibleSeparator}/>
                    <Typography color='textSecondary' variant='body2' to={`/users/${userHandle}`}>
                        {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                    </Typography>
                    <hr className={classes.invisibleSeparator}/>
                    <Typography variant='body1'>
                        {body}
                    </Typography>
                    <LikeButton screamId={screamId}/>
                    <span>{likeCount} likes</span>
                    <MyButton tip='comments'>
                        <ChatIcon color='primary' />
                    </MyButton>
                    <span>{commentCount} comments</span>
                </Grid>
                <CommentForm screamId={screamId} />
                <hr className={classes.visibleSeparator}/>
                <Comments comments={comments}/>
            </Grid>
        )
        return (
            <Fragment>
                <MyButton onClick={this.handleOpen} tip='Expand scream' tipClassName={classes.expandButton}>
                    <UnfoldMoreIcon color='primary' />
                </MyButton>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth='sm'>
                    <MyButton tip='Close' onClick={this.handleClose} tipClassName={classes.closeButton}>
                        <CloseIcon />
                    </MyButton>
                    <DialogContent className={classes.dialogContent}>
                        {dialogMarkup}
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}

ScreamDialog.propTypes = {
    screamId: PropTypes.string.isRequired,
    clearErrors: PropTypes.func.isRequired,
    getScream: PropTypes.func.isRequired,
    userHandle: PropTypes.string.isRequired,
    scream: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    scream: state.data.scream,
    UI: state.UI
});

export default connect(mapStateToProps, { getScream, clearErrors })(withStyles(styles)(ScreamDialog));
