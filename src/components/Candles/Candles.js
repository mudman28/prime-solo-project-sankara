import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import { thisTypeAnnotation } from '@babel/types';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

class Candles extends Component {

  state = {
    candle_item: {
      id: '',
      name: '',
      description: '',
      preparation: '',
      note: '',
      amount_in_stock: '',
      needEdit: false
    }
  }


  handleChange = property => (event) => {
    console.log('new', event.target.value);
    this.setState({
      candle_item: property
    });
  }

  handleEditChange = propertyName => (event) => {
    console.log('Edit', event.target.value);
    this.setState({
      candle_item: {...this.state.candle_item, [propertyName]: event.target.value}
    });
  }

  handleEdit = (event) => {
    event.preventDefault();
    console.log('final', this.state);
    this.props.dispatch({ type: 'UPDATE_CANDLE', payload: this.state.candle_item })
  }

  handleDelete = (event) => {
    event.preventDefault();
    console.log('final', this.state);
    this.props.dispatch({ type: 'DELETE_CANDLE', payload: this.state.candle_item });
    this.setState({
      candle_item: ''
    });
  }

  render() {
    console.log('CANDLE INFO', this.state);
    let candleInfo;
    if (this.state.candle_item.needEdit === false) {
      candleInfo = <div>
        <h3>Candle Name: {this.state.candle_item.name}</h3>
        <h3>Description: {this.state.candle_item.description}</h3>
        <h3>Preparation: {this.state.candle_item.preparation}</h3>
        <h3>Note: {this.state.candle_item.note}</h3>
        <h3># In Stock: {this.state.candle_item.amount_in_stock}</h3>
      </div>
    } else {
      candleInfo = <div>
        <h3>Candle Name: <input placeholder="CANDLE NAME"
          onChange={this.handleEditChange('name')} /></h3>
        <h3>Description: <input placeholder="DESCRIPTION"
          onChange={this.handleEditChange('description')} /></h3>
        <h3>Preparation: <input placeholder="PREPARATION"
          onChange={this.handleEditChange('preparation')} /></h3>
        <h3>Note: <input placeholder="NOTES"
          onChange={this.handleEditChange('note')} /></h3>
        <h3># In Stock: <input placeholder="# IN STOCK"
          onChange={this.handleEditChange('amount_in_stock')} /></h3>
      </div>
    }
    return (
      <div className="candleView left">
        <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="flex-center"
        >
          <Grid item xs={2}>
            <h2>Candles</h2>
            <table className="orderTable">
              <tbody className="tableBody">
                {this.props.candles.map((title, i) => {
                  return (
                    <tr key={i} className="tableRow">
                      <td>{title.name}<input type="radio"
                        key={title.id} name="candle"
                        onChange={this.handleChange(title)} /></td>
                    </tr>
                  )
                })}

              </tbody>
            </table>

          </Grid>
          <Grid item xs={5}>
            <Card className="candleView right">
              <CardActionArea>
                <CardMedia>
                  <Card className="candleCard fade">
                    <CardActionArea>
                      <CardMedia>
                        <img src="https://images.unsplash.com/photo-1528351655744-27cc30462816?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80" alt="candle pic" />
                      </CardMedia>
                    </CardActionArea>
                  </Card>
                  <div>
                    {candleInfo}
                  </div>
                </CardMedia>
              </CardActionArea>
            </Card>
            <button onClick={this.handleEdit}>edit</button>
            <button onClick={this.handleDelete}>delete</button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  candles: state.candleReducer,
});

export default connect(mapStateToProps)(Candles);
