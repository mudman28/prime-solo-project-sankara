import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

class Candles extends Component {

  render() {
    return (
      <div>
        <div>
          <h2>Candles</h2>
        </div>
        <Card className="candleCard fade">
          <CardActionArea>
            <CardMedia>
              {/* <img src={this.props.imagePath} alt={this.props.imageTitle}/> */}
            </CardMedia>
          </CardActionArea>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  orders: state.pendingReducer,
});

export default connect(mapStateToProps)(Candles);
