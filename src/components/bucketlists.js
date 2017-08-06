import React from 'react';
import { Link, Redirect } from 'react-router-dom';

var axios = require('axios');

export class BucketLists extends React.Component {
    constructor () {
        super();
        this.state = {
            user: {},
            bucketlists: [],
            next_page: '',
            previous_page: '',
            showEditForm: false,
            showNewItemForm: false
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
                    previous_page: response.data['previous_page']
                });
            })
            .catch((error) => {
                console.error(error);
                return <Redirect to="/login" />
            }); 
    }

    componentDidMount() {

    }

    // show new item form
    showAddForm(){
        this.setState({showNewItemForm: !this.state.showNewItemForm});
    }

    // show edit bucket list name form
    showEditForm(){
        this.setState({showEditForm: !this.state.showEditForm});
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
    handleEditBucketList(bucketlist, e) {
        e.preventDefault();
        let access_token = 'Bearer ' + localStorage.getItem('access_token');
        axios.put('http://localhost:5000/api/v1/bucketlists/'+bucketlist.id, JSON.stringify({'name': this.refs.newName.value}),
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
    handleDeleteBucketList(bucketlist, e) {
        let access_token = 'Bearer ' + localStorage.getItem('access_token');
        axios.delete('http://localhost:5000/api/v1/bucketlists/'+bucketlist.id,
                    {headers: {'Authorization': access_token, 'Content-Type': "application/json"}}
            )
            .then((response) => {
                this.state.bucketlists.splice(this.state.bucketlists.indexOf(bucketlist), 1);
                window.location.reload();
                console.log(response);
            })
            .catch((error) => {
                console.error(error);
                return <Redirect to="/login" />
            });
        e.preventDefault();
    }    

    // Create an ITEM
    handleNewItem(bucketlist, e) {
        e.preventDefault();
        let access_token = 'Bearer ' + localStorage.getItem('access_token');
        axios.post('http://localhost:5000/api/v1/bucketlists/'+bucketlist.id+'/items/', JSON.stringify({'name': this.refs.newItemName.value}),
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

    // Perform search functionality
    handleSearch(e) {
        e.preventDefault();
        let access_token = 'Bearer ' + localStorage.getItem('access_token');
        axios.get('http://localhost:5000/api/v1/bucketlists/?q='+this.refs.query.value+'&limit='+this.refs.limit.value,
                    {headers: {'Authorization': access_token, 'Content-Type': "application/json"}}
            )
            .then((response) => {
                console.log(response);
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

    // Handle next page
    handleNextPage(next_page, e) {
        e.preventDefault();
        let access_token = 'Bearer ' + localStorage.getItem('access_token');
        axios.get('http://localhost:5000/api/v1/'+next_page,
                    {headers: {'Authorization': access_token, 'Content-Type': "application/json"}}
            )
            .then((response) => {
                console.log(response);
                this.setState({
                    bucketlists: response.data['bucketlists'],
                    next_page: response.data['next_page'],
                    previous_page: response.data['previous_page']
                });                
            })
            .catch((error) => {
                console.error(error);
                return <Redirect to="/login" />
            });  
    }

    // Handle previous page
    handlePreviousPage(previous_page, e) {
        e.preventDefault();
        let access_token = 'Bearer ' + localStorage.getItem('access_token');
        axios.get('http://localhost:5000/api/v1/'+previous_page,
                    {headers: {'Authorization': access_token, 'Content-Type': "application/json"}}
            )
            .then((response) => {
                console.log(response);
                this.setState({
                    bucketlists: response.data['bucketlists'],
                    next_page: response.data['next_page'],
                    previous_page: response.data['previous_page']
                });                
            })
            .catch((error) => {
                console.error(error);
                return <Redirect to="/login" />
            });  
    }

    logoutUser() {
        localStorage.setItem('login_status', false);
        localStorage.setItem('access_token', '');
        localStorage.setItem('username', '');
        localStorage.setItem('email', '');
        window.location.reload();
    }    

    render () {
        if (localStorage.getItem('login_status') !== 'true') {
            return <Redirect to="/login" />
        }
        let s1 = {verticalAlign: 'middle'};
        let s2 = {textAlign: 'right', float: 'right'};
        let styleNext = {float: 'right'};
        let stylePrevious = {float: 'left'};
        let styleText = {align: 'center'};
        return (
        <div>
            <div className="mui-appbar">
                <table width='100%'>
                    <tbody>
                        <tr style={s1}>
                            <td className="mui--appbar-height"> <Link to="/"> BKT </Link> </td>
                            <td className="mui--appbar-height" style={s2}> <Link to="/profile"> &nbsp; Profile &nbsp; </Link> </td>
                            <td className="mui--appbar-height" style={s2}> <a onClick={this.logoutUser}> &nbsp; Logout &nbsp; </a> </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="mui-container">
                <div className="mui-row">
                    {/* New Bucket List*/}
                    <div>
                        <form onSubmit={this.handleNewBucketList.bind(this)} className="mui-form">
                            <div className="mui-textfield mui-col-lg-4 mui-col-md-4">
                                <input type="text" ref="name" placeholder="Enter new bucketlist name"/>
                            </div>
                            <button type="submit" className="mui-btn mui-btn--raised">Submit</button>
                        </form>
                    </div>

                    {/* Search for bucket lists*/}
                    <div>
                        <form onSubmit={this.handleSearch.bind(this)} className="mui-form">
                            <div className="mui-textfield mui-col-lg-4 mui-col-md-4">
                                <input type="text" ref="query" placeholder="Enter new bucketlist name" />
                            </div>
                            <div className="mui-textfield mui-col-lg-1 mui-col-md-1">
                                <input type="text" ref="limit" placeholder="Limit" />
                            </div>
                            <button type="submit" className="mui-btn mui-btn--raised">Submit</button>
                        </form>
                    </div>
                </div>   
                             
                <div className="mui-row">
                    <ul> 
                        {this.state.bucketlists.map(bucketlist => <li key={bucketlist.id}> 

                            <SingleBucketList bucketlist={bucketlist}/>
                            
                                </li>)} 
                    </ul>

                </div>

                    <div className="mui-row">
                        {/* Show previous page button */}
                        {
                            this.state.previous_page ?
                                <button onClick={(e) => this.handlePreviousPage(this.state.previous_page, e)}  className="mui-btn mui-btn--raised" style={stylePrevious}> Previous </button>
                                : null
                        }
                        
                        {/* Show number of bucket lists */}
                        <span style={styleText}> {this.state.bucketlists.length} Bucket Lists </span>

                        {/* Show next page button */}
                        {
                            this.state.next_page ?
                                <button onClick={(e) => this.handleNextPage(this.state.next_page, e)} className="mui-btn mui-btn--raised" style={styleNext}> Next </button>
                                : null
                        }
                    </div>

            </div>
        </div>
        );
    }
}

// Component for a single bucket list
export class SingleBucketList extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            bucketlist: props.bucketlist,
            showEditForm: false,
            showNewItemForm: false
        }
    }

    // show new item form
    showAddForm(){
        this.setState({showNewItemForm: !this.state.showNewItemForm});
    }

    // show edit bucket list name form
    showEditForm(){
        this.setState({showEditForm: !this.state.showEditForm});
    }

    // Edit a Bucket List
    handleEditBucketList(bucketlist, e) {
        e.preventDefault();
        let access_token = 'Bearer ' + localStorage.getItem('access_token');
        axios.put('http://localhost:5000/api/v1/bucketlists/'+bucketlist.id, JSON.stringify({'name': this.refs.newName.value}),
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
    handleDeleteBucketList(bucketlist, e) {
        let access_token = 'Bearer ' + localStorage.getItem('access_token');
        axios.delete('http://localhost:5000/api/v1/bucketlists/'+bucketlist.id,
                    {headers: {'Authorization': access_token, 'Content-Type': "application/json"}}
            )
            .then((response) => {
                window.location.reload();
                console.log(response);
            })
            .catch((error) => {
                console.error(error);
                return <Redirect to="/login" />
            });
        e.preventDefault();
    }    

    // Create an ITEM
    handleNewItem(bucketlist, e) {
        e.preventDefault();
        let access_token = 'Bearer ' + localStorage.getItem('access_token');
        axios.post('http://localhost:5000/api/v1/bucketlists/'+bucketlist.id+'/items/', JSON.stringify({'name': this.refs.newItemName.value}),
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
    
    render () {
        return(
            <div>

                <div className="card mui-col-md-6 mui-col-lg-4">
                    {/* Bucket List Name */}
                    <h4><b> {this.state.bucketlist.name}  </b></h4> 
                    <hr />
                        {/* Bucket List Items */}
                        <ul>
                            {this.state.bucketlist.items.map(item => <li key={item.id}> 
                                
                                <Items item={item} bucketlist={this.state.bucketlist}/>
                                </li>)} 
                        </ul>
                    <hr/>

                    <i className="material-icons nI" onClick={() => this.showAddForm()}>add</i>
                    <i className="material-icons nI" onClick={() => this.showEditForm()}>edit</i>
                    <i className="material-icons nI" onClick={(e) => this.handleDeleteBucketList(this.state.bucketlist, e)}>delete</i>                    
                    
                    {/* <button className="mui-btn mui-btn--raised" onClick={() => this.showAddForm()}> Add </button>
                    <button className="mui-btn mui-btn--raised" onClick={() => this.showEditForm()}> Edit </button>
                    <button className="mui-btn mui-btn--raised" onClick={(e) => this.handleDeleteBucketList(this.state.bucketlist, e)}> Delete </button> */}

                    {
                        this.state.showNewItemForm ?

                                <div id="newForm">
                                    <form onSubmit={(e) => this.handleNewItem(this.state.bucketlist, e)} className="mui-form">
                                        <div className="mui-textfield">
                                            <input type="text" ref="newItemName" placeholder="Add a new item"/>
                                        </div>
                                        <button type="submit" className="mui-btn mui-btn--raised">Submit</button>
                                    </form> 
                                </div>

                            : null   
                    }

                    {
                        this.state.showEditForm ?

                                <div id="editForm">
                                    <form onSubmit={(e) => this.handleEditBucketList(this.state.bucketlist, e)} className="mui-form">
                                        <div className="mui-textfield">
                                            <input type="text" ref="newName" placeholder={this.state.bucketlist.name}/>
                                        </div>
                                        <button type="submit" className="mui-btn mui-btn--raised">Submit</button>
                                    </form> 
                                </div>

                            : null
                    }

                </div>   

            </div>
        );
    }
    
}

export class Items extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            item: props.item,
            bucketlist: props.bucketlist,
            showEditItemForm: false
        }
    }

    // show edit bucket list name form
    showEditItemForm(){
        this.setState({showEditItemForm: !this.state.showEditItemForm});
    }

    // Edit an item name
    handleEditItem(item, e) {

        let access_token = 'Bearer ' + localStorage.getItem('access_token');
        axios.put('http://localhost:5000/api/v1/bucketlists/'+this.state.bucketlist.id+'/items/'+item.id, JSON.stringify({'name': this.refs.newItemName.value}),
                    {headers: {'Authorization': access_token, 'Content-Type': "application/json"}}
            )
            .then((response) => {
                window.location.reload();
                console.log(response);
            })
            .catch((error) => {
                console.error(error);
                return <Redirect to="/login" />
            });
        e.preventDefault();

    }

    // Mark an item as done
    handleMarkItemDone(item, e) {

        let access_token = 'Bearer ' + localStorage.getItem('access_token');
        axios.put('http://localhost:5000/api/v1/bucketlists/'+this.state.bucketlist.id+'/items/'+item.id, JSON.stringify({'done': !this.state.item.done}),
                    {headers: {'Authorization': access_token, 'Content-Type': "application/json"}}
            )
            .then((response) => {
                window.location.reload();
                console.log(response);
            })
            .catch((error) => {
                console.error(error);
                return <Redirect to="/login" />
            });
        e.preventDefault();

    }

    // Delete an item
    handleDeleteItem(item, e) {
        let access_token = 'Bearer ' + localStorage.getItem('access_token');
        axios.delete('http://localhost:5000/api/v1/bucketlists/'+this.state.bucketlist.id+'/items/'+item.id,
                    {headers: {'Authorization': access_token, 'Content-Type': "application/json"}}
            )
            .then((response) => {
                window.location.reload();
                console.log(response);
            })
            .catch((error) => {
                console.error(error);
                return <Redirect to="/login" />
            });
        e.preventDefault();
    }

    render() {
        let newStyle = {'float': 'right'};
        return (
            <div>

                <div className="mui-checkbox">
                    <form className="mui-form">
                        <label>
                        <input type="checkbox" value="" checked={this.state.item.done} onChange={(e) => this.handleMarkItemDone(this.state.item, e)}/>
                        {/* Item Name*/}
                        &nbsp; &nbsp; {this.state.item.name} 
                        </label>
                         <i className="material-icons nI" style={newStyle} onClick={(e) => this.handleDeleteItem(this.state.item, e)}>delete</i>  
                        <i className="material-icons nI" style={newStyle} onClick={() => this.showEditItemForm()}>edit</i> 
                    </form>

                    {
                        this.state.showEditItemForm ?

                                <div id="editForm">
                                    <form onSubmit={(e) => this.handleEditItem(this.state.item, e)} className="mui-form">
                                        <div className="mui-textfield">
                                            <input type="text" ref="newItemName" placeholder={this.state.item.name}/>
                                        </div>
                                        <button type="submit" className="mui-btn mui-btn--raised">Submit</button>
                                    </form> 
                                </div>

                            : null
                    }                    

                </div>

            </div>
        );
    }

}