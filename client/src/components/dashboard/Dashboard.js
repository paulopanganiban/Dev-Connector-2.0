import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../_actions/profile';
import Spinner from '../layout/Spinner';
import { Icon } from 'antd';
import { Button } from 'antd';
import {Panda} from './panda';

const PandaIcon = props => <Icon component={Panda} {...props} />;
const Dashboard = ({ getCurrentProfile, auth: { user }, profile: { profile, loading } }) => {
    useEffect(() => {
        getCurrentProfile();
    }, []); // run once empty set bracket boiler plate
    return loading && profile === null ? <Spinner /> : <Fragment>
        <h1 className="large text-primary">
            <p className="lead">
                <PandaIcon style={{ fontSize: '32px' }} />
                {' '}
                Welcome {user && user.name}
            </p>
        </h1>
        {profile !== null ? <Fragment>has</Fragment> : <Fragment><p>Setup your profile!</p>
            <Link to='/create-profile'><Button type="primary">Create profile </Button></Link></Fragment>}
            {/* end fragment */}
    </Fragment>
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired, // action
    auth: PropTypes.object.isRequired, // object
    profile: PropTypes.object.isRequired, // object
}
const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile,
})
export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
