import React from 'react';
import { connect } from 'react-redux';
import SweetAlert from 'sweetalert-react'; // eslint-disable-line import/no-extraneous-dependencies
import 'sweetalert/dist/sweetalert.css'
// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`class SecretsPage extends Component {
class UserPage extends React.Component {
  state = {
    today: new Date(Date.now()).toLocaleString()
  }

  componentDidMount(){
    this.clock = setInterval(
      () => this.setCurrentTime(),
      1000
    )
  }

  componentWillUnmount(){
    clearInterval(this.clock);
    clearInterval(this.interval);
  }

  setCurrentTime(){
    this.setState({
      currentTime: new Date().toLocaleTimeString('en-US', { hour12: false })
    });
  }
  //
  handleChange = property => (event) => {
    this.setState({
      order: property
    });
  }

  render() {
    let today = new Date(Date.now()).toLocaleString()

    return (
      <div className="dashboard">
        {/* Shows the date */}   
        <h3>Today's Date</h3>
        {today}
        <br />
        <br />
        {/* Shows inventory alert */}
        <div className="alertBox">
          <h4>Check Inventory Alert:</h4>
          <p className="alertNote">(any candle below 5 in stock)</p>
        {/* maps the candle reducer and shows any candles with less than 5 in stock */}
        {this.props.candles.map((title, i) => {
          if(title.amount_in_stock < 5){
                  return (
                    <ul className="alertList">
                      <li>{title.name} - Amount: {title.amount_in_stock}</li>
                    </ul>
                  )
                }
                })}
        </div>
        {/* Shows all pending orders */}
        <h1 className="pageHeader">Pending Orders</h1>
        <p>*Check The Box Once An Order Is Completed</p>
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
              <th>Completed</th>
            </tr>
          </thead>
          <tbody className="tableBody">
            {/* maps over the order reducer to show the date and customer info for each order on the dom */}
            {this.props.orders.map((orderRow, i) => {
              return (
                <tr key={orderRow.id} className="tableRow" >
                  <td className="bodyCol">{orderRow.order_date}</td>
                  <td className="bodyCol">{orderRow.first_name}</td>
                  <td className="bodyCol">{orderRow.last_name}</td>
                  <td className="bodyCol">{orderRow.street_address}</td>
                  <td className="bodyCol">{orderRow.city}</td>
                  <td className="bodyCol">{orderRow.state}</td>
                  <td className="bodyCol">{orderRow.zip}</td>
                  <td className="bodyCol">
                  {/* maps over the order reducer to show the quantities and candle info together
                  for each order in one column on the dom */}
                    {orderRow.candles.map((candle, index) => {
                      return (
                        <li className="canList">{orderRow.quantities[index]} - {candle}</li>
                      )
                    })}
                  </td>
                  <td className="bodyCol">

                    <input type="checkbox" className="check" key={orderRow.id} name="orderform"
                      onChange={this.handleChange(orderRow)} onClick={() => this.setState({ show: true })} />
                    <SweetAlert
                      show={this.state.show}
                      title="Confirm The Completion Of This Order?"
                      type="success"
                      text="REMINDER: A History Of Your Completed Orders Can Be Viewed On Your Transaction's Page!"
                      showCancelButton
                      onConfirm={() => {
                        console.log('confirm'); // eslint-disable-line no-console
                        this.setState({ show: false, order: { ...this.state.order, isCompleted: true, completion_date: this.state.today } });
                        this.props.dispatch({ type: 'UPDATE_COMPLETE', payload: this.state.order });
                        // this.props.dispatch({})
                        window.location.reload()
                        // this.props.history.push('/transactions')
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
  candles: state.candleReducer,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(UserPage);
