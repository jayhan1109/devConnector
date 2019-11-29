import React,{useEffect} from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../reducers/profile";

const Dashboard = ({getCurrentProfile,auth,profile}) => {
    useEffect(()=>{
        getCurrentProfile();
    },[getCurrentProfile]);
  return <div>Dashboard</div>;
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

export default connect(
  state => ({
    profile: state.profile,
    auth: state.auth
  }),
  {
    getCurrentProfile
  }
)(Dashboard);
