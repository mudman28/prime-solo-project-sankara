import React from 'react';
import { connect } from 'react-redux';

// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`class SecretsPage extends Component {
class UserPage extends React.Component {
  componentDidMount() {
    this.props.dispatch({type: 'FETCH_PENDING'});
  }

  render() {
    return (
      <div className="grid-container">
       <div></div>
       <div>
          <h2>Pending Orders</h2>
          <table className="table table-dark table-striped">
            <thead>
              <tr>
                <th className="dateRecord">Date Of Order</th>
                <th>Customer Name</th>
                <th>Address</th>
                <th>Candle Order</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {/* {this.props.orders.map(orderRow =>{
                  return(
                    <td key={orderRow.id}>{orderRow}</td>
                    )
                })}    */}
              </tr>
            </tbody>
        </table>
       </div>
       <div></div>
      </div>
    );
  }
}


// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = state => ({
  orders: state.pendingReducer,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(UserPage);
