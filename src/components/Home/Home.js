import React from 'react';
import { connect } from 'react-redux';
import SweetAlert from 'sweetalert-react'; // eslint-disable-line import/no-extraneous-dependencies
import 'sweetalert/dist/sweetalert.css'
// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`class SecretsPage extends Component {
class UserPage extends React.Component {
  state = {}

  handleChange = property => (event) => {
    this.setState({
      order: property
    });
  }

  render() {
    console.log('new', this.state);
    return (
      <div>
        <h2>Today's Date</h2>
        <h2>Pending Orders</h2>
        <table className="orderTable">
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
              <th>Completed</th>
            </tr>
          </thead>
          <tbody className="tableBody">
            {this.props.orders.map((orderRow, i) => {
              return (
                <tr key={orderRow.id} className="tableRow">
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
                  <td className="bodyCol">
                    <input type="radio" key={orderRow.id} name="orderform"
                      onChange={this.handleChange(orderRow)} onClick={() => this.setState({ show: true })} />
                    <SweetAlert
                      show={this.state.show}
                      title="Confirm The Completion Of This Order?"
                      type="success"
                      text="REMINDER: A History Of Your Completed Orders Can Be Viewed On Your Transaction's Page!"
                      showCancelButton
                      onConfirm={() => {
                        console.log('confirm'); // eslint-disable-line no-console
                        this.setState({ show: false, order : {...this.state.order, isCompleted: true }});
                        this.props.dispatch({ type: 'UPDATE_COMPLETE', payload: this.state.order });
                      }}
                      onCancel={() => {
                        console.log('cancel'); // eslint-disable-line no-console
                        this.setState({ show: false });
                      }}
                      onEscapeKey={() => this.setState({ show: false })}
                      onOutsideClick={() => this.setState({ show: false })}
                    />
                  </td>
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
  orders: state.pendingReducer,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(UserPage);
