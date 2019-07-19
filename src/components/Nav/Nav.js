import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';


const Nav = (props) => (
  <div className="nav">
    <div className="container">
      <div className="head">
          <h2 className="nav-title">Sankara</h2>
          <div className="nav-right">
            <Link className="nav-link" to="/home">
              {props.user.id ? 'Home' : 'Login / Register'}
            </Link>
            {props.user.id && (
              <div>
                <Link className="nav-link" to="/addOrder">
                  ADD ORDER
                </Link>
                <Link className="nav-link" to="/candles">
                  CANDLES
                </Link>
                {/* <Link className="nav-link" to="/transactions">
                  Supplies
                </Link> */}
                <Link className="nav-link" to="/transactions">
                  TRANSACTIONS
                </Link>
                <LogOutButton className="logOutBtn"/>
              </div>
            )}
          </div>
      </div>
    </div>
  </div>
);

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(Nav);
