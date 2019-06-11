
import { connect } from 'react-redux';
import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

// import Review from '../Review/Review';
// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

class AddOrder extends Component {
  state = {
    order: {},
    line_items: new Map(),
  }



  handleChange = propertyName => (event) => {
    console.log('new', event.target.value);
    this.setState({
      order: {
        ...this.state.order,
        [propertyName]: event.target.value
      }
    });
  }

  handleCandleChange = property => (event) => {
    console.log('CANDLE INPUTS', property);
    property.quantity = event.target.value
    const newSet = this.state.line_items.set(property.id, property)
    this.setState({
      line_items: newSet
    });
  }

  handleCancel = (event) => {
    this.setState({
        order: {},
        line_items: new Map(),
    });
  }
  //submits order
  handleSubmit = (event) => {
    event.preventDefault();
    //turn this.state.line_items into array
    console.log(this.state.line_items)
    let tempArray = Array.from(this.state.line_items.values())
    this.props.dispatch({ type: 'SEND_CUST', payload: this.state.order })
    this.props.dispatch({ type: 'SEND_CAND', payload: tempArray })
    this.props.history.push('/review')
  }

  presentationInfo = (event) => {
    event.preventDefault();
    this.setState({
      order: {
        first_name: 'Mr.',
        last_name: 'T',
        street_address: '1020 Pity Fool Ln',
        city: 'Minneapolis',
        state: 'MN',
        zip: '55404'
      }
    })
}

  render() {
    // console.log(this.props.candles[0].id);
    return (
      <div className="form">
        <form onSubmit={this.handleSubmit}>
          <div>
            <div>
              <h1 className="pageHeader">Add Orders</h1>
            </div>
            <Grid container spacing={2}>
              <Grid item s>
                <div className="custform">
                  <div>
                    <h2 className="secondHeader">Customer Information</h2>
                    <h3 className="label">Date Of The Order:</h3>
                      <input type="date" className="dateInput" 
                        onChange={this.handleChange('order_date')} />
                    <div>
                      <br />
                        <h3 className="label">Name:</h3>
                            <div className="orderBlock">
                          <TextField
                            id="standard-search"
                            label="First Name"
                            type="search"
                            margin="normal"
                            value={this.state.order.first_name}
                            onChange={this.handleChange('first_name')}
                          />
                          <br />
                          <TextField
                            id="standard-search"
                            label="Last Name"
                            type="search"
                            margin="normal"
                            value={this.state.order.last_name}
                            onChange={this.handleChange('last_name')}
                          />
                        </div>
                        <br />
                        <br />
                    </div>
                      <h3 className="label">Address:</h3>
                        <div className="orderBlock">
                        <TextField
                          id="standard-search"
                          label="Street Address"
                          type="search"
                          margin="normal"
                          className="longInput"
                          value={this.state.order.street_address}
                          onChange={this.handleChange('street_address')}
                        />
                        <br />
                        <TextField
                          id="standard-search"
                          label="City"
                          type="search"
                          margin="normal"
                          value={this.state.order.city}
                          onChange={this.handleChange('city')}
                        />
                        <br />
                        <TextField
                          id="standard-search"
                          label="State"
                          type="search"
                          margin="normal"
                          value={this.state.order.state}
                          onChange={this.handleChange('state')}
                          className="shortInput"
                        />
                        <br />
                        <TextField
                          id="standard-search"
                          label="Zip"
                          type="search"
                          margin="normal"
                          value={this.state.order.zip}
                          onChange={this.handleChange('zip')}
                          className="shortInput"
                        />
                      </div>
                  </div>
                  <div>

                  </div>
                </div>
              </Grid>
              <Grid item xs>
                <div className="candleSelect">
                  <p onClick={this.presentationInfo}>*Add the amount to the candle order</p>
                  <table className="orderTable">
                    <tbody className="tableBody">
                      {this.props.candles.map((title, i) => {
                        return (
                          <tr key={i} className="tableRow" data-id={title.id}>
                            <td>{title.name}</td>
                            <td className="smallerCol"><input className="shortInputQ"
                              type="number" onChange={this.handleCandleChange(title)}
                            /> Qty</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </Grid>

            </Grid>
            <br />
            <Button variant="contained" type="submit" onSubmit={this.handleCancel}>CANCEL ORDER</Button>
            <br />
            <br />
            <Button variant="contained" type="submit"> REVIEW ORDER </Button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  candles: state.candleReducer,
  order: state.addOrderReducer
});
export default connect(mapStateToProps)(AddOrder);
