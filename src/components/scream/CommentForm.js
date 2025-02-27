import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
// MUI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
// Redux
import { connect } from 'react-redux';
import { submitComment } from '../../redux/actions/dataActions';

const styles = theme => ({
    ...theme.styles
})

export class CommentForm extends Component {
    state = {
        body: '',
        errors:{}
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors){
            this.setState({errors: nextProps.UI.errors});
        }
    }

    handleChange = (event) => {
        this.setState({
          [event.target.name]: event.target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.submitComment(this.props.screamId, {body: this.state.body});
    }
    render() {
        const { classes, authenticated } = this.props;
        console.log('----CommentForm:::render:::', 'this.props: ', this.props);
        const errors = this.state.errors;
        console.log('----CommentForm:::render:::', 'errors: ', errors);
        const commentFormMarkup = authenticated ? (
            <Grid item sm={12} styles={{ textAlign: 'center' }}>
                <form onSubmit={this.handleSubmit}>
                    <TextField
                        name='body' type='text' label='comment on scream'
                        error={errors.error ? true : false} helperText={errors.error}
                        value={this.state.body} onChange={this.handleChange}
                        fullWidth className={classes.textField} />
                    <Button type='submit' variant='contained' color='primary' className={classes.button}>
                        Submit
                    </Button>
                </form>
            </Grid>
        ) : null;
        return commentFormMarkup;
    }
}

CommentForm.propTypes = {
    submitComment: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    screamId: PropTypes.string.isRequired,
    authenticated: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
    UI: state.UI,
    authenticated: state.user.authenticated
})

export default connect(mapStateToProps, { submitComment })(withStyles(styles)(CommentForm));