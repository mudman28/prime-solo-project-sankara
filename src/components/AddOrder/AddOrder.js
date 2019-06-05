
import { connect } from 'react-redux';
import React, { Component } from 'react';


// import Review from '../Review/Review';
// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

class AddOrder extends Component {
  state = {
    line_items : []
  }
  
    handleChange = propertyName => (event) => {
    console.log('new', event.target.value);
    this.setState({
      [propertyName]: event.target.value
    });
  }

  handleCandleChange = property => (event) => {
    console.log('CANDLE INPUTS', property);
    property.quantity = event.target.value
    this.setState({
      line_items: {...this.state.line_items, [property.id] : property}
    });
  }

  // handleCandleListChange = () => {
  //   let candleList = []
  //   for(let i = 0; i < this.props.candles.length; i++){
  //     if(this.props.candles[i].id === Object.keys(this.state.line_items)){
  //       console.log('SEE THIS', this.state.line_items);
        
  //       candleList.push({})
  //     }
  //   }
  // }

  //submits order
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.dispatch({ type: 'SEND_CAND', payload: this.state})
    this.props.history.push('/review')
  }

  render() {
    // console.log(this.props.candles[0].id);
    return (
      <div className="form">
        <form onSubmit={this.handleSubmit}>
          <div>
            <div>
              <h2>Add Orders</h2>
            </div>
            <div className="custform">
              <div>
                <label>
                  Date Of The Order:
                        <input type="date"
                    onChange={this.handleChange('order_date')} />
                </label>
                <div>
                  <label>
                    Customer's Name:
                            <div>
                      <input placeholder="FIRST NAME"
                        onChange={this.handleChange('first_name')} />
                      <input placeholder="LAST NAME"
                        onChange={this.handleChange('last_name')} />
                    </div>
                  </label>
                </div>
                <label>
                  Address:
                        <div>
                    <input placeholder="STREET ADDRESS" className="longInput"
                      onChange={this.handleChange('street_address')} />
                    <div>
                      <input placeholder="CITY"
                        onChange={this.handleChange('city')} />
                    </div>
                    <div>
                      <input placeholder="STATE" className="shortInput"
                        onChange={this.handleChange('state')} />
                      <input placeholder="ZIP CODE" className="shortInput"
                        onChange={this.handleChange('zip')} />
                    </div>
                  </div>
                </label>
              </div>
            </div>
            <div>
              <h2>Choose The Candle:</h2>
              <table className="orderTable">
                <tbody className="tableBody">
                  {this.props.candles.map((title, i) => {
                    return (
                      <tr key={i} className="tableRow" data-id={title.id}>
                        <td>{title.name}<input className="shortInput"
                          type="number" onChange={this.handleCandleChange(title)}
                        /></td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            <div>
              <button type="submit" onSubmit={this.handleCancel}>CANCEL ORDER</button>
              <button type="submit"> REVIEW ORDER </button>
            </div>
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
