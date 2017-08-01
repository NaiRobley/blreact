import React from 'react';
import { Link, Redirect } from 'react-router-dom';

var axios = require('axios');


export class Home extends React.Component {

    componentDidMount () {}

    componentWillMount () {}

    render() {
        let style1 = { 'color': '#777','backgroundColor':'white','textAlign':'center','padding':'50px 80px' };
        let style2 = { 'backgroundColor':'transparent', 'fontSize':'25px', 'color': '#f7f7f7' };
        let style4 = { 'textAlign': 'justify' };
        return (
            <div>
                {/* <button className="mui-btn mui-btn--primary" onClick={activateModal()}>Activate modal</button> */}

                <div className="bgimg-1">
                    <div className="caption">
                        <span className="border">WELCOME TO BKT!</span>
                    </div>
                    <span className="capt"> Have a goal you want to achieve before time runs out? </span>
                    <span className="caption2"> Login | Register </span>
                    {/* {(login_status) === 'true' )? (<span> <Link to='/' className="caption2"> Mine </Link> </span>) : (<span> <Link to='/login' className="caption2"> Login | Register </Link> </span>) } */}
                    <span> <Link to='/login' className="caption2"> Login | Register </Link> </span>
                </div>

                <div className="mui-container" style={style1}>
                    <div className="mui-row">
                        <div className="mui-col-xs-12 mui-col-md-4">
                            <div className="icon-block">
                            <h2 className="center brown-text"><i className="material-icons">event</i></h2>
                            <h3 className="center">Plan</h3>

                            <p className="light" style={style4}>
                                Make plans for your future endeavours and keep your plans in a safe, convenient and accessible place.
                                Manage your plans by updating them as time goes by or adding new ones.
                            </p>
                            </div>
                        </div>

                        <div className="mui-col-xs-12 mui-col-md-4">
                            <div className="icon-block">
                            <h2 className="center brown-text"><i className="material-icons">bubble_chart</i></h2>
                            <h3 className="center">Do</h3>

                            <p className="light" style={style4}>
                                When the sun is high and the time is right, follow your dreams and execute your plans.
                                Enjoy what life has to offer as per your plans. Experience each moment as it comes because time is too precious...and scarce.
                            </p>
                            </div>
                        </div>

                        <div className="mui-col-xs-12 mui-col-md-4">
                            <div className="icon-block">
                            <h2 className="center brown-text"><i className="material-icons">done_all</i></h2>
                            <h3 className="center">Check It Off</h3>

                            <p className="light" style={style4}>
                                The sky is the limit. Now that you have accomplished your dreams, check them out of your bucket list and dream some more.
                                Extend your adventure, extend your fun, live life!
                            </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bgimg-2">
                    <div className="caption">
                        <span className="border" style={style2}> All your bucket lists in one convenient place. </span>
                    </div>
                </div>

            </div>
        )
    }
}

export class App extends React.Component {
    constructor (props) {
        super(props);
        this.state = {};
    }

    render() {
      return (
         <div>
            <Home />
         </div>
      );
   }
}
