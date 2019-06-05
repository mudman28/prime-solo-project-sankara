import React, { Component } from 'react';
import { connect } from 'react-redux';



class Review extends Component {
    state = {}

    render() {
        let review;
        
            review =
                <div>
                    <p>Review Order</p>
                    <p>Date:</p>
                    <p>Name:</p>
                    <p>Address: </p>
                    <p>Candle: </p>
                    <p>Quantity: </p>
                </div>
        
        
        return (
            <div>
                {review}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    candles: state.candleReducer,
    order: state.addOrderReducer
});

export default connect(mapStateToProps)(Review);