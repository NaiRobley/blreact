import React from 'react';
import { Link, Redirect } from 'react-router-dom';

var axios = require('axios');

export class User extends React.Component {
    render() {
        return(
            <div>
                Edit a user details here
            </div>
        );
    }
}

export class Register extends React.Component {

    constructor () {
        super();
        this.state = {
            user: {}
        }
    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    // Register a new User
    handleRegister(e) {
        e.preventDefault();        
        axios.post('http://localhost:5000/auth/register/', 
                    JSON.stringify({'username': this.refs.username.value, 'password': this.refs.password.value, 'email': this.refs.email.value }), 
                    {headers: {'Content-Type': "application/json"}})
                    .then(function (response) {
                        console.log(response.json());
                        return response.json();
                    })
                    .catch(function (error) {
                        console.error(error);
                    });

        
    }
    render() {
        let s1 = {verticalAlign: 'middle'}
        let s2 = {textAlign: 'right'}
        return(
            <div>
                <div className="mui-appbar">
                    <table width='100%'>
                        <tbody>
                            <tr style={s1}>
                                <td className="mui--appbar-height"> <Link to="/"> BKT </Link> | Register</td>
                                <td className="mui--appbar-height" style={s2}> <Link to="/login"> Login </Link> </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="mui-container">
                    <form onSubmit={this.handleRegister.bind(this)} className="mui-form">
                    <legend> Login </legend>
                    <div className="mui-textfield">
                        <input type="email" ref='email' placeholder="email"/>
                    </div>                    
                    <div className="mui-textfield">
                        <input type="text" ref='username' placeholder="username"/>
                    </div>
                    <div className="mui-textfield">
                        <input type="password" ref='password' placeholder="password"/>
                    </div>
                    <button type="submit" className="mui-btn mui-btn--raised">Submit</button>
                    </form>
                </div>                
                
            </div>               
        );
    }
}

export class Login extends React.Component {
    constructor () {
        super();
        this.state = {
            user: {}
        }
    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    // Login a User
    handleLogin(e) {
        e.preventDefault();
        axios.post('http://localhost:5000/auth/login', 
                    {'username': this.refs.username.value, 'password': this.refs.password.value },
                    {headers: {'Content-Type': "application/json"}})
            .then((response) => {
                if (response.data['access_token']){
                    localStorage.setItem('access_token', response.data['access_token']);
                    localStorage.setItem('login_status', true);
                    localStorage.setItem('username', response.data['username']);
                    <Redirect to="/sbucketlists" /> 
                } else {
                    localStorage.setItem('access_token', '');
                    localStorage.setItem('login_status', false);
                    localStorage.setItem('username', '');                   
                }
                console.log(response.data);
                alert(response.data['message']);
            })
            .catch(function (error) {
                console.error(error);
            });
    }
    render() {
        let s1 = {verticalAlign: 'middle'}
        let s2 = {textAlign: 'right'}
        const login_status = localStorage.getItem('login_status');

        if (login_status === 'true') {
            return <Redirect to="/bucketlists" />
        }

        return(
            <div>
                <div className="mui-appbar">
                    <table width='100%'>
                        <tbody>
                            <tr style={s1}>
                                <td className="mui--appbar-height"> <Link to="/"> BKT </Link> | Login </td>
                                <td className="mui--appbar-height" style={s2}> <Link to="/register"> Sign Up </Link> </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="mui-container">
                    <form onSubmit={this.handleLogin.bind(this)} className="mui-form">
                    <legend> Login </legend>
                    <div className="mui-textfield">
                        <input type="text" ref='username' placeholder="username"/>
                    </div>
                    <div className="mui-textfield">
                        <input type="password" ref='password' placeholder="password"/>
                    </div>
                    <button type="submit" className="mui-btn mui-btn--raised">Submit</button>
                    </form>
                </div>
                
            </div>               
        );
    }
}

export class Logout extends React.Component {
    logoutUser() {
        localStorage.setItem('login_status', false);
        localStorage.setItem('access_token', '');
        localStorage.setItem('username', '');
        window.location.reload();
    }
    render () {
        return (
        <div>
            <button onClick={this.logoutUser} className="mui-btn mui-btn--raised"> Sign Out </button>
        </div>
    );
    }
}