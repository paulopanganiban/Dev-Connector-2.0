import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
// PARA MAGAMIT NG COMPONENT YUNG REDUCER WE USE REDUX
import { setAlert } from '../../_actions/alert';
import { register } from '../../_actions/auth';
// now we can use props ng setalert dahil sa connect sa baba!
import PropTypes from 'prop-types'

// destrcutre para di na need ng props.setAlert
// pero gamitin natin props LOL
// pwedeng ({setAlert})
const Register = ({setAlert, register, isAuthenticated}) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });
    // short for: 
    // state = { formData: { ... } }

    // setFormData
    // this.setState({...})

    // ################################### LECTURE 34 ###############################
    const { name, email, password, password2 } = formData;
    // const onChange = () => setFormData({ ...formData, name: e.target.value })
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })
    const onSubmit = async e => {
        e.preventDefault();
        if (password !== password2) {
            setAlert('Passwords do not match', 'danger')
        } else {
            // const newUser = {
            //     name,
            //     email,
            //     password,
            //     password2
            // }
            // try {
            //     const config = {
            //         headers: {
            //             'Content-type': 'application/json'
            //         }
            //     }
            //     const body = JSON.stringify(newUser);
            //     // because of proxy sa package json
            //     const res = await axios.post('/api/users', body, config);
            //     console.log(res.data);
            // } catch (error) {
            //     console.error(error.message)
            // }
            register({ name, email, password });
        }
    }
    if( isAuthenticated ) {
        return <Redirect to="/dashboard" />
    }
    return (
        <Fragment>
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <input
                        onChange={e => onChange(e)}
                        value={name}
                        type="text"
                        placeholder="Name"
                        name="name"

                    />
                </div>
                <div className="form-group">
                    <input onChange={e => onChange(e)}
                        value={email}
                        type="email"
                        placeholder="Email Address"
                        name="email"

                    />
                    <small className="form-text">
                        This site uses Gravatar so if you want a profile image, use a
                        Gravatar email</small>
                </div>
                <div className="form-group">
                    <input
                        onChange={e => onChange(e)}
                        value={password}
                        type="password"
                        placeholder="Password"
                        name="password"
                    />
                </div>
                <div className="form-group">
                    <input
                        onChange={e => onChange(e)}
                        value={password2}
                        type="password"
                        placeholder="Confirm Password"
                        name="password2"
                        minLength="6"
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Register" />
            </form>
            <p className="my-1">
                Already have an account? <Link to="/login">Sign In</Link>
            </p>
        </Fragment>
    )
}
Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
};
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})
//Register is the name of the component
// bring the action via import
// CONNECT TAKES 2 PARAMETERS: THE STATE(1), OBJECT WE WANNA USE(2) STATE YOU WANNA MAP 
export default connect(mapStateToProps, { setAlert, register })(Register)
// we can access now using the 'props'
