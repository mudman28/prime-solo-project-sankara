import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import 'sweetalert/dist/sweetalert.css'
// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`class SecretsPage extends Component {

class Review extends React.Component {

    state = {}


    handleSubmit = (event) => {
        event.preventDefault();
        this.props.dispatch({ type: 'ADD_ORDER', payload: { orders: this.props.order, candles: this.props.candles } })

        this.props.history.push('/')
    }

    render() {
        return (
            <div>
                {(this.props.candles.length && Object.keys(this.props.order).length)
                    ? <div className="dashboard">
                        <h1 className="pageHeader">Review The Order</h1>
                        <br />
                        <h3 className="pageHeader">Customer Information</h3>
                        <hr className="breakLine" />
                        <p className="label">Date:</p> <p className="reviewText">{this.props.order.order_date}</p>
                        <p className="label">Name:</p> <p className="reviewText">{this.props.order.first_name + ' ' + this.props.order.last_name}</p>
                        <p className="label">Address:</p> <p className="reviewText">{this.props.order.street_address + ', ' + this.props.order.city + ', ' + this.props.order.state + ', ' + this.props.order.zip}</p>
                        <br />
                        <br />
                        <h3 className="pageHeader">Candle Information</h3>
                        {this.props.candles.map((title, i) => {
                            return (

                                <div>
                                    <hr className="breakLine" />
                                    <p className="label">Candle:</p> <p className="reviewText">{title.name}</p>
                                    <p className="label">Quantity:</p> <p className="reviewText">{title.quantity}</p></div>
                            )
                        })}
                        <br />
                        <Button variant="contained" onClick={this.handleSubmit}>Submit</Button></div>
                    : this.props.history.push('/addOrder')}
            </div>
        )
    }
}
const mapStateToProps = state => ({
    candles: state.addOrderCandleReducer,
    order: state.addOrderReducer

});

export default connect(mapStateToProps)(Review);