import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
    <nav>
        <div className="nav-wrapper #212121 grey darken-4" style={{fontFamily: 'Times'}}>
            <Link to={'/'} className="brand-logo left">49-744 Design Smart Systems  <span style={{color: "red"}}> Demo</span> </Link>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li><Link to={'/'}>Demo Intro</Link></li>
                <li><Link to={'/shop'}>Search Food</Link></li>
                <li><Link to={'/about'}>About us</Link></li>
                <li><a href="https://github.com/xiaowenxseven?tab=repositories" target="_blank">Codes</a></li>
            </ul>
        </div>

    </nav>
);


export default Header;