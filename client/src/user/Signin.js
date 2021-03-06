import React, { useState } from 'react';
import {Link, Redirect} from 'react-router-dom';
import Base from '../core/Base';
import { signin, isAutheticated, authenticate } from '../auth/helper';


const Signin = () => {

    const [values, setValues] = useState({
        email: "",
        password: "",
        error: "",
        loading: false,
        didRedirect: false
    });

    const {email, password, error, loading, didRedirect} = values
    const {user} = isAutheticated();

    const handleChange = name => event => {
        setValues({...values, error:false, [name]: event.target.value})
    } 
    
    const onSubmit = event => {
        event.preventDefault();
        setValues({...values, error: false, loading: true})
        signin({email, password})
        .then(data => {
            if (data.error) {
                setValues({...values, error:data.error, loading: false})
            } else {
                authenticate(data, () => {
                    setValues({
                        ...values,
                        didRedirect: true
                    })
                })
            }
        })
        .catch(console.log("Login Failed"));
    }

    const performRedirect = () => {
        if (didRedirect) {
            if ( user && user.role == 1) {
                return <Redirect to="/admin/dashboard"/>
            } else {
                return <Redirect to="/user/dashboard"/>
                
            }
        }
        if (isAutheticated()) {
            return <Redirect to="/"/>
        }
    }

    const loadingMessage = () => {
        return(
            loading && (
                <div className="alert alert-info">
                <h2>loading...</h2>
                </div>
            )
        )
    }

    const errorMessage = () => {
        return(
        <div className="row">
            <div className="col-md-4 offset-sm-4 text-left">
            <div>
            <div className="alert alert-danger" style={{display: error ? "" : "none"}}>
            {error}
            </div>
            </div>
            </div>
        </div>
        );
    }

    const signInForm = () => {
        return(
        <div className="row">
            <div className="col-md-4 offset-sm-4 text-left">
                <form >
                    <div className="form-group">
                        <label className="text-light">Email</label>
                        <input onChange={handleChange("email")} className="form-control" type="email" value={email}/>
                    </div>
                    <div className="form-group">
                        <label className="text-light">Password</label>
                        <input onChange={handleChange("password")} className="form-control" type="password" value={password}/>
                    </div>
                    <div className="col-md-3">
                    <button onClick={onSubmit} className="btn btn-success btn-block">Submit</button>
                    </div>
                </form>
            </div>
        </div>
        );
    }
    return(
        <Base title="Sign In Page" description="Input SignIn Details">
        {errorMessage()}
        {loadingMessage()}
        {signInForm()}
        {performRedirect()}
        </Base>
    );
}
export default Signin;
