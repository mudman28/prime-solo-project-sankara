import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { connect } from 'react-redux';
import Nav from '../Nav/Nav';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'
import Home from '../Home/Home';
import AddOrder from '../AddOrder/AddOrder';
import Candles from '../Candles/Candles';
import Transactions from '../Transactions/Transactions';
import Review from '../Review/Review';
import ScrollToTop from '../ScrollToTop/ScrollToTop'
import './App.css';

class App extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_USER' });
    this.props.dispatch({ type: 'FETCH_CANDLE' });
    this.props.dispatch({ type: 'FETCH_COMPLETE' });
    this.props.dispatch({ type: 'FETCH_PENDING' });
  }

  render() {
    let navOrNot;

    if (this.props.user.id) {
      navOrNot =
        <div>
          <Nav />
          <div>
            <Switch>
              {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
              <Redirect exact from="/" to="/home" />
              {/* For protected routes, the view could show one of several things on the same route.
        Visiting localhost:3000/home will show the UserPage if the user is logged in.
        If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
        Even though it seems like they are different pages, the user is always on localhost:3000/home */}
              <ProtectedRoute
                exact
                path="/home"
                component={Home}
              />
              {/* This works the same as the other protected route, except that if the user is logged in,
        they will see the secrets page instead. */}
              <ProtectedRoute
                exact
                path="/AddOrder"
                component={AddOrder}
              />
              <ProtectedRoute
                exact
                path="/Review"
                component={Review}
              />
              <ProtectedRoute
                exact
                path="/Candles"
                component={Candles}
              />
              {/* <ProtectedRoute
                exact
                path="/Supplies"
                component={Supplies}
              /> */}
              <ProtectedRoute
                exact
                path="/Transactions"
                component={Transactions}
              />
              {/* If none of the other routes matched, we will show a 404. */}
              <Route render={() => <h1>404</h1>} />
            </Switch>
          </div>
        </div>
    } else {
      navOrNot =
        <div>
          <div>
            <Switch>
              {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
              <Redirect exact from="/" to="/home" />
              {/* For protected routes, the view could show one of several things on the same route.
        Visiting localhost:3000/home will show the UserPage if the user is logged in.
        If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
        Even though it seems like they are different pages, the user is always on localhost:3000/home */}
              <ProtectedRoute
                exact
                path="/home"
                component={Home}
              />
              {/* This works the same as the other protected route, except that if the user is logged in,
        they will see the secrets page instead. */}
              <ProtectedRoute
                exact
                path="/AddOrder"
                component={AddOrder}
              />
              <ProtectedRoute
                exact
                path="/Candles"
                component={Candles}
              />
              {/* <ProtectedRoute
                exact
                path="/Supplies"
                component={Supplies}
              /> */}
              <ProtectedRoute
                exact
                path="/Transactions"
                component={Transactions}
              />
              {/* If none of the other routes matched, we will show a 404. */}
              <Route render={() => <h1>404</h1>} />
            </Switch>
          </div>
        </div>
    }
    return (
      <Router>
        <ScrollToTop>
        <div>
          {navOrNot}
        </div>
        </ScrollToTop>
      </Router>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(App);
