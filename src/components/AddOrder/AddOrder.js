import React from 'react';
import { connect } from 'react-redux';
// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

const AddOrder = () => (
  <div>
    <div><h2>Add Orders</h2></div>
    <div>
      <p>Date Of The Order</p>
      <input type="date"></input>
    </div>
    <div>
      <p>Customer's Name</p>
      <input placeholder="FIRST NAME"></input>
      <input placeholder="LAST NAME"></input>
    </div>
    <div>
      <p>Address</p>
      <input placeholder="STREET ADDRESS"></input>
    </div>
    <div>
      <input placeholder="CITY"></input> 
      <input placeholder="STATE"></input> 
      <input placeholder="ZIP CODE"></input>
    </div>
    <div>
      <p>Choose The Candle</p>
      <select className="candleSelect"
      // onChange={this.handleTagChange}
      >
                    <option value="" disabled defaultValue>Candle</option> 
                    {/* {this.props.tagList.map(tags =>{
                        return(
                            <option value={tags.id}>{tags.name}</option>
                        )
                    })}    */}
      </select>
      <select className="candleSelect"
      // onChange={this.handleTagChange}
      >
                    <option value="" disabled defaultValue>Quantity</option> 
                    {/* {this.props.tagList.map(tags =>{
                        return(
                            <option value={tags.id}>{tags.name}</option>
                        )
                    })}    */}
      </select>
      <button className="addTag" 
      // onClick={this.handleAddCandle}
      >Add Candle</button>
      <p>Candle and Quantity Append Here</p>
    </div>
    <div>
      <button>Submit Order</button>
    </div>
  </div>
);

export default connect()(AddOrder);
