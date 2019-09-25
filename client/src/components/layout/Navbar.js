import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { logout } from '../../_actions/auth';
const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
    const authLinks = (
        <ul>
            <li><Link to="/dashboard">
                <span className="hide-sm">Dashboard</span>
                <i className="fas fa-sign-out-alt"></i>{' '}</Link>
            </li>
            <li>
                <a onClick={logout} href='#!'>
                    <i className="fas fa-sign-out-alt"></i>{' '}
                    <span className="hide-sm">Logout</span></a>
            </li>
        </ul>
    );
    const guestLinks = (
        <ul>
            <li><Link to="#">Developers</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
        </ul>
    );
    return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to="/"><i className="fas fa-code"></i> DevConnector</Link>
            </h1>
            {!loading && (<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>)}
        </nav>
    )
}
// nabring na yung prop bigla O_O
Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
}

// map state to props yung mga kukunin nating DATOS KABERNICUS SA STORE. STORE IS A CLOUD. MAP STATE TO PROPS IS WATER -LEE
const mapStateToProps = state => ({
    // bring the entire auth state
    auth: state.auth
})
export default connect(mapStateToProps, { logout })(Navbar);
