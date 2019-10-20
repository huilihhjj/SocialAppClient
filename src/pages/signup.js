import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import icon from '../images/icon.png';
import { Link } from 'react-router-dom';

//Material UI
import Grid from '@material-ui/core/Grid';
import { Typography, TextField, Button, CircularProgress } from '@material-ui/core';

//Redux
import { connect } from 'react-redux';
import { signupUser } from '../redux/actions/userActions';

const styles = (theme) => ({
  ...theme.styles
});

class signup extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      handle: '',
      loading: false,
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
    this.setState({
      loading: true
    })
    const newUserData = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      handle: this.state.handle
    };
    this.props.signupUser(newUserData, this.props.history);
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  render() {
    const { classes, UI: {loading}} = this.props;
    const { errors } = this.state;
    return ( 
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <img src={icon} alt='app-icon' className={classes.image} />
          <Typography variant='h4' className={classes.pageTitle}>
            Signup
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField id='email' name='email' type='email' label='email'
              className={classes.textField} 
              helperText={errors.email}
              error={errors.email ? true: false} 
              value={this.state.email} 
              onChange={this.handleChange} fullWidth />
            <TextField id='password' name='password' type='password' label='password'
              className={classes.textField} 
              helperText={errors.password}
              error={errors.password ? true : false}
              value={this.state.password} 
              onChange={this.handleChange} fullWidth />
            <TextField id='confirmPassword' name='confirmPassword' type='password' label='confirm Password'
              className={classes.textField} 
              helperText={errors.confirmPassword}
              error={errors.confirmPassword ? true : false}
              value={this.state.confirmPassword} 
              onChange={this.handleChange} fullWidth />
            <TextField id='handle' name='handle' type='text' label='handle'
              className={classes.textField} s
              helperText={errors.handle}
              error={errors.handle ? true : false}
              value={this.state.handle} 
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
              Signup
              {loading && (
                <CircularProgress size={30} className={classes.progress} />
              )}
            </Button>
            <br />
            <small>
              already have an account? login <Link to='/login'>here</Link>
            </small>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}

signup.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  signupUser: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI
});

const mapActionsToProps = {
  signupUser
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(signup)); 