import React from 'react';
import {connect} from 'react-redux';
import './Header.scss';

@connect((store) => ({
    isLoggedIn: store.loginData.isLoggedIn
}))
export default class Header extends React.Component {
    render() {
        return (
            <div className={'header-wrapper'}>
                <div className={''}></div>
            </div>
        );
    }
}