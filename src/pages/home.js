import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Scream from '../components/scream/Scream';
import Profile from '../components/profile/Profile';
import { connect } from 'react-redux';
import { getScreams } from '../redux/actions/dataActions';
import PropTypes from 'prop-types';
import ScreamSkeleton from '../util/ScreamSkeleton';
//import ProfileSkeleton from '../util/ProfileSkeleton';

class home extends Component {
  // state = {
  //   screams: null
  // }
  componentDidMount(){
    this.props.getScreams();
  }
  render(){
    console.log('----home:::render:::', 'this.props: ', this.props);
    const { 
      data: { 
          screams,
          loading
      }
    } = this.props;
    let recentScreamsMarkup = !loading ? (
       screams.map((scream) => <Scream key={scream.screamId} scream={scream} />)
    ) : (
      <ScreamSkeleton />
    );
    return (
      <Grid container spacing={2}>
        <Grid item sm={8} xs={12}>
          {recentScreamsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}

home.propTypes = {
  getScreams: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, {getScreams})(home);