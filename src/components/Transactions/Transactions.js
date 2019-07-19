import React from 'react';
import { connect } from 'react-redux';
// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`class SecretsPage extends Component {
class Transactions extends React.Component {


  render() {
    return (
      <div className="transaction">
      {/* lists a history of transactions */}
            <h1 className="pageHeader">Transactions</h1>
            <p>*Below is a list of all the completed orders</p>
            <table className="mainTable">
              <thead>
                <tr>
                  <th className="dateRecord">Date Of Order</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Street Address</th>
                  <th>City</th>
                  <th>State</th>
                  <th>Zip</th>
                  <th>Candle Order</th>
                  <th className="dateRecord">Date Of Completion</th>
                </tr>
              </thead>
              {/* creates each row for the completed orders */}
              <tbody className="tableBody">
                {this.props.orders.map(orderRow => {
                  return (
                    <tr key={orderRow.id} className="moreRow">
                      <td className="bodyCol">{orderRow.order_date}</td>
                      <td className="bodyCol">{orderRow.first_name}</td>
                      <td className="bodyCol">{orderRow.last_name}</td>
                      <td className="bodyCol">{orderRow.street_address}</td>
                      <td className="bodyCol">{orderRow.city}</td>
                      <td className="bodyCol">{orderRow.state}</td>
                      <td className="bodyCol">{orderRow.zip}</td>
                      <td className="bodyCol">
                        {orderRow.candles.map((candle, index) => {
                          return (
                            <li className="canList">{orderRow.quantities[index]} - {candle}</li>
                          )
                        })}
                      </td>
                      <td className="bodyCol">{orderRow.completion_date}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
      </div>
    );
  }
}


// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = state => ({
  orders: state.completeReducer,
});


// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(Transactions);