import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Logout } from './auth.js';

var axios = require('axios');

export class BucketLists extends React.Component {
    constructor () {
        super();
        this.state = {
            user: {},
            bucketlists: [],
            next_page: '',
            previous_page: ''
        }
    }

    componentWillMount() {
        let access_token = 'Bearer ' + localStorage.getItem('access_token');
        axios.get('http://localhost:5000/api/v1/bucketlists', 
                    {headers: {'Content-Type': "application/json", 'Authorization': access_token}})
            .then((response) => {
                console.log(response.data['message']);
                this.setState({
                    bucketlists: response.data['bucketlists'],
                    next_page: response.data['next_page'],
                    previous_page: response.data['previous+page']
                });
            })
            .catch((error) => {
                console.error(error);
                return <Redirect to="/login" />
            }); 
    }

    componentDidMount() {

    }

    // Create a Bucket List
    handleNewBucketList(e) {
        e.preventDefault();
        let access_token = 'Bearer ' + localStorage.getItem('access_token');
        axios.post('http://localhost:5000/api/v1/bucketlists', JSON.stringify({'name': this.refs.name.value}),
                    {headers: {'Authorization': access_token, 'Content-Type': "application/json"}}
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

    // Edit a Bucket List
    handleEditBucketList(e) {
        e.preventDefault();
        let access_token = 'Bearer ' + localStorage.getItem('access_token');
        axios.put('http://localhost:5000/api/v1/bucketlists', JSON.stringify({'name': this.refs.name.value}),
                    {headers: {'Authorization': access_token, 'Content-Type': "application/json"}}
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

    // Delete a Bucket List

    // Create an ITEM
    handleNewItem(e) {
        e.preventDefault();
        let access_token = 'Bearer ' + localStorage.getItem('access_token');
        axios.delete('http://localhost:5000/api/v1/bucketlists/', JSON.stringify({'name': this.refs.name.value}),
                    {headers: {'Authorization': access_token, 'Content-Type': "application/json"}}
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

    // Edit an Item

    // Delete an Item

    render () {
        if (localStorage.getItem('login_status') !== 'true') {
            return <Redirect to="/login" />
        }
        return (
        <div>
            <Logout />
            <div>
                <form onSubmit={this.handleNewBucketList.bind(this)} className="mui-form">
                    <input type="text" ref="name" placeholder="Enter new bucketlist name"/>
                    <button type="submit" className="mui-btn mui-btn--raised">Submit</button>
                </form>
            </div>
            <ul> 
                {this.state.bucketlists.map(bucketlist => <li key={bucketlist.id}> 
                    {/* Bucket List Name */}
                    {bucketlist.name} 
                    {/* Bucket List Items */}
                            <ul>
                                {bucketlist.items.map(item => <li key={item.id}> 
                                    {/* Item Name*/}
                                    {item.name} 
                                    {/* Item Status */}
                                    {item.done} </li>)} 
                            </ul> 
                        </li>)} 
            </ul>
            {this.state.bucketlists.length}

        </div>
        );
    }
}

export class Items extends React.Component {

}