import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import 'sweetalert/dist/sweetalert.css'
// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`class SecretsPage extends Component {

class Review extends React.Component {

    handleCancel = (event) => {
        event.preventDefault();
        this.props.dispatch({ type: 'SEND_CUST', payload: '' })
        this.props.dispatch({ type: 'SEND_CAND', payload: '' })
        this.props.history.push('/addOrder')
    }
    //submits the order info to the sagas and from there to the database
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.dispatch({ type: 'ADD_ORDER', payload: { orders: this.props.order, candles: this.props.candles } })
        // needs an candle update dispatch
        this.props.history.push('/')
    }

    render() {
        return (
            <div>
                {/* creates a conditional situation based on the length of the "arrays" in the reducer and
                Object.keys function makes the order info into a an array */}
                {(this.props.candles.length && Object.keys(this.props.order).length)
                    ? <div className="reviewPage">
                        <h1 className="pageHeader">Review The Order</h1>
                        <br />
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <h3 className="reviewHeader">Customer Information</h3>
                                <div className="reviewOutline">
                                    <p className="label">Date:</p>
                                    <p className="reviewText">{this.props.order.order_date}</p>
                                </div>
                                <div className="reviewOutline">
                                    <p className="label">Name:</p>
                                    <p className="reviewText">{this.props.order.first_name + ' ' + this.props.order.last_name}</p>
                                </div>
                                <div className="reviewOutline">
                                    <p className="label">Address:</p>
                                    <p className="reviewText">{this.props.order.street_address + ', ' + this.props.order.city + ', ' + this.props.order.state + ', ' + this.props.order.zip}</p>
                                </div>
                                <Button variant="contained" type="submit" onClick={this.handleCancel} style={{  width: 150, marginRight: 20 }}>CANCEL</Button>
                                <Button variant="contained" onClick={this.handleSubmit} style={{  width: 150 }}>SUBMIT</Button>
                            </Grid>
                            <Grid item xs={6}>
                                <div className="reviewCandlesContainer">   
                                <h3 className="reviewHeader2">Candle Information</h3>
                                <div className="reviewCandles" >
                                    {this.props.candles.map((title, i) => {
                                        return (
                                            <div className="reviewOutline2" style={{ marginRight: 10 }}>
                                                <p className="label">Candle:</p> <p className="reviewText">{title.name}</p>
                                                <p className="label">Quantity:</p> <p className="reviewText">{title.quantity}</p>
                                            </div>
                                        )
                                    })}
                                </div>
                                </div>
                            </Grid>
                            <Grid item xs={2}>
                            </Grid>
                            </Grid>
                        </div>
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