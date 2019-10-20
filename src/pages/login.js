import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import icon from '../images/icon.png'
import { Link } from 'react-router-dom';

//Material UI
import Grid from '@material-ui/core/Grid';
import { Typography, TextField, Button, CircularProgress } from '@material-ui/core';

//Redux
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/userActions'

const styles = (theme) => ({
  ...theme.styles
})

class login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {}
    }
  }

  componentWillReceiveProps(nextProps){
    console.log('----componentWillReceiveProps----');
    console.log(nextProps)
    if(nextProps.UI.errors){
      this.setState({ errors: nextProps.UI.errors });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    }
    this.props.loginUser(userData, this.props.history);
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  render() {
    console.log('----login state----');
    console.log(this.state);
    const { classes, UI: { loading } } = this.props;
    const { errors } = this.state;
    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <img src={icon} alt='app-icon' className={classes.image} />
          <Typography variant='h4' className={classes.pageTitle}>
            Login
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField id='email' name='email' type='email' label='email'
              className={classes.textField}
              helperText={errors.email}
              error={errors.email ? true : false}
              value={this.state.email}
              onChange={this.handleChange} fullWidth />
            <TextField id='password' name='password' type='password' label='password'
              className={classes.textField}
              helperText={errors.password}
              error={errors.password ? true : false}
              value={this.state.password}
              onChange={this.handleChange} fullWidth />
            {errors.general && (
              <Typography variant='body2' className={classes.customError}>
                {errors.general}
              </Typography>
            )}
            <Button type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={loading}>
              Login
              {loading && (
                <CircularProgress size={30} className={classes.progress} />
              )}
            </Button>
            <br />
            <small>
              don't have an account? sign up <Link to='/sign up'>here</Link>
            </small>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}

login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI
});

const mapActionsToProps = {
  loginUser
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(login));