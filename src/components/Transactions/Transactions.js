import React from 'react';
import { connect } from 'react-redux';

// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`class SecretsPage extends Component {
class Transactions extends React.Component {
  componentDidMount() {
    this.props.dispatch({type: 'FETCH_PENDING'});
  }

  render() {
    return (
      <div className="grid-container">
       <div></div>
       <div><h2>Transactions</h2></div>
       <div></div>
      </div>
    );
  }
}


// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(Transactions);