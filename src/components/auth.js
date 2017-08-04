import React from 'react';
import { Link, Redirect } from 'react-router-dom';

var axios = require('axios');

export class Profile extends React.Component {
    constructor () {
        super();
        this.state = {
            user: {
                username: localStorage.getItem('username'),
                email: localStorage.getItem('email'),
                showNewUsernameForm: false,
                showNewEmailForm: false,
                showNewPasswordForm: false
            }
        }
    }

    // Show edit username form
    showEditUsernameForm() {
        this.setState({showNewUsernameForm: !this.state.showNewUsernameForm});
    }

    // Show edit username form
    showEditEmailForm() {
        this.setState({showNewEmailForm: !this.state.showNewEmailForm});
    }

    // Show edit password form
    showEditPasswordForm() {
        this.setState({showNewPasswordForm: !this.state.showNewPasswordForm})
    }

    // Set a new user name for the user
    handleNewUsername(e) {
        e.preventDefault();
        axios.put('http://localhost:5000/auth/user/', 
                    JSON.stringify({'username': this.state.user.username, 'password': this.refs.password.value, 'new_username': this.refs.newUsername.value}),
                    {headers: {'Content-Type': "application/json"}}
            )
            .then((response) => {
                window.location.reload();
                localStorage.setItem('username', response.data['username']);
                console.log(response.data);
            })
            .catch((error) => {
                console.error(error);
                return <Redirect to="/login" />
            });        
    }

    // Set a new email for the user
    handleNewEmail(e) {
        e.preventDefault();
        axios.put('http://localhost:5000/auth/user/', 
                    JSON.stringify({'username': this.state.user.username, 'password': this.refs.password.value, 'new_email': this.refs.newEmail.value}),
                    {headers: {'Content-Type': 'application/json'}}
            )
            .then((response) => {
                window.location.reload();
                localStorage.setItem('email', response.data['email']);
                console.log(response.data);
            })
            .catch((error) => {
                console.error(error);
                return <Redirect to="/login" />
            });
    }

    // Set a new password for the user
    handleNewPassword(e) {
        e.preventDefault();
        axios.put('http://localhost:5000/auth/user/',
                    JSON.stringify({'username': this.state.user.username, 'password': this.refs.oldPassword.value, 'new_password': this.refs.newPassword.value}),
                    {headers: {'Content-Type': "application/json"}}
            )
            .then((response) => {
                window.location.reload();
                console.log(response.data);
            })
            .catch((error) => {
                console.error(error);
                return <Redirect to="/login" />
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
                                <td className="mui--appbar-height"> <Link to="/"> BKT </Link> </td>
                                <td className="mui--appbar-height" style={s2}> <Link to="/bucketlists"> Bucketlists </Link> </td>
                                <td className="mui--appbar-height" style={s2}> <Link to="/logout"> Logout </Link> </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="card mui-col-md-4">
                    <h4><b> Your Details </b></h4>
                    <hr />
                    Username: {this.state.user.username} <br />
                    
                    Email: {this.state.user.email}

                    <hr />

                    <button className="mui-btn mui-btn--raised" onClick={() => this.showEditUsernameForm()}> Update Username </button>
                    <button className="mui-btn mui-btn--raised" onClick={() => this.showEditEmailForm()}> Update Email </button>
                    <button className="mui-btn mui-btn--raised" onClick={() => this.showEditPasswordForm()}> Update Password </button>


                    {
                        this.state.showNewUsernameForm ?

                                <div>
                                    <form onSubmit={this.handleNewUsername.bind(this)} className="mui-form">
                                        <input type="text" ref="newUsername" placeholder="Enter new username"/>
                                        <input type="password" ref="password" placeholder="Enter password" />
                                        <button type="submit" className="mui-btn mui-btn--raised">Submit</button>
                                    </form> 
                                </div>

                            : null   
                    }

                    {
                        this.state.showNewEmailForm ?

                                <div>
                                    <form onSubmit={this.handleNewEmail.bind(this)} className="mui-form">
                                        <input type="email" ref="newEmail" placeholder="Enter new email address"/>
                                        <input type="password" ref="password" placeholder="Enter password" />
                                        <button type="submit" className="mui-btn mui-btn--raised">Submit</button>
                                    </form> 
                                </div>

                            : null
                    }

                    {
                        this.state.showNewPasswordForm ?

                                <div>
                                    <form onSubmit={this.handleNewPassword.bind(this)} className="mui-form">
                                        <input type="password" ref="oldPassword" placeholder="Enter old password" />
                                        <input type="password" ref="newPassword" placeholder="Enter new password" />
                                        <button type="submit" className="mui-btn mui-btn--raised"> Submit </button>
                                    </form> 
                                </div>

                            : null
                    }                    

                </div>
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
                    localStorage.setItem('email', response.data['email']);
                    window.location.reload();
                } else {
                    localStorage.setItem('access_token', null);
                    localStorage.setItem('login_status', false);
                    localStorage.setItem('username', null);
                    localStorage.setItem('email', null);                 
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
    componentWillMount() {
    }

    logoutUser() {
        localStorage.setItem('login_status', false);
        localStorage.setItem('access_token', '');
        localStorage.setItem('username', '');
        localStorage.setItem('email', '');
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