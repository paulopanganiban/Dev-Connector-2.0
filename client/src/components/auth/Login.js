import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const { email, password } = formData;
    // const onChange = () => setFormData({ ...formData, name: e.target.value })
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })
    const onSubmit = async e => {
        e.preventDefault();
    }
    return (
        <Fragment>
            <h1 className="large text-primary">Sign In</h1>
            <p className="lead"><i className="fas fa-user"></i>Sign into your account</p>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <input onChange={e => onChange(e)}
                        value={email}
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        onChange={e => onChange(e)}
                        value={password}
                        type="password"
                        placeholder="Password"
                        name="password"
                        minLength="6"
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Login" />
            </form>
            <p className="my-1">
                Don't have an account? <Link to="/register">Sign Up</Link>
            </p>
        </Fragment>
    )
}
export default Login
