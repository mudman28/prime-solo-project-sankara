import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SweetAlert from 'sweetalert-react'; // eslint-disable-line import/no-extraneous-dependencies
import 'sweetalert/dist/sweetalert.css'

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
      path: '',
    },
    card: ''
  }


  handleChange = property => (event) => {
    console.log('new', event.target.value);
    this.setState({
      ...this.state,
      candle_item: property,
      card: 'info'
    });
  }

  handleEditChange = propertyName => (event) => {
    this.setState({
      candle_item: {
        ...this.state.candle_item,
        [propertyName]: event.target.value,
        card: 'edit'
      }
    });
  }

  handleReset = (event) => {
    this.setState({
      ...this.state,
      card: 'none'
    });
  }

  presentationInfo = (event) => {
    event.preventDefault();
    this.setState({
      ...this.state,
      candle_item: {
        name: 'Apple Cinnamon',
        description: '8 oz, double wicked, orange, coconut wax candle. The scent is apple cinnamon.',
        preparation: 'Glue the wicks into the heated candle jars. Melt the wax down. Mix the wax, red dye and one ounce of apple cinnamon fragrance oils. Pour mixture in the jars and let it sit overnight.',
        note: 'Apple Cinnamon',
        amount_in_stock: 10,
      }
    })
}

  handleEdit = (event) => {
    event.preventDefault();
    this.setState({
      ...this.state,
      card: 'edit'
    });
  }


  handleDelete = (event) => {
    if (this.state.card === 'info') {
      console.log('final', this.state);
      this.props.dispatch({ type: 'DELETE_CANDLE', payload: this.state.candle_item });
      this.setState({
        candle_item: 'none'
      });
    }
  }

  render() {
    console.log('CANDLE INFO', this.state);
    let candleInfo;

    let deleteIcon = <DeleteIcon />
    let editIcon = <EditIcon />

    if (this.state.card === 'info') {
      candleInfo =
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
                <div>
                  <p className="candleStock"># In Stock: {this.state.candle_item.amount_in_stock}</p>
                  <p className="candleHead">Candle Name:</p> 
                  <p className="candleBody">{this.state.candle_item.name}</p>
                  <p className="candleHead">Description:</p> 
                  <p className="candleBody">{this.state.candle_item.description}</p>
                  <p className="candleHead">Preparation:</p> 
                  <p className="candleBody">{this.state.candle_item.preparation}</p>
                  <p className="candleHead">Note:</p> 
                  <p className="candleBody">{this.state.candle_item.note}</p>
                </div>
              </div>
            </CardMedia>
          </CardActionArea>


        </Card>

    } else if (this.state.card === 'edit') {
      candleInfo =
        <Card className="candleView right fade">
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
                <div className="editInput">
                  <TextField
                    id="outlined-search"
                    label="CANDLE NAME"
                    type="search"
                    margin="normal"
                    variant="outlined"
                    className="candleNameInput"
                    value={this.state.candle_item.name}
                    onChange={this.handleEditChange('name')}
                  />
                  <br />
                  <TextField
                    id="standard-number"
                    label="# IN STOCK"
                    onChange={this.handleEditChange('amount_in_stock')} 
                    value={this.state.candle_item.amount_in_stock}
                    type="number"
                    className="shortInputStock"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    margin="normal"
                    variant="outlined"
                  />
                  {/* <h3>Candle Name: <input placeholder="CANDLE NAME"
                    onChange={this.handleEditChange('name')} /></h3> */}
                  <br />
                  <TextField
                    id="standard-textarea"
                    label="DESCRIPTION"
                    multiline
                    margin="normal"
                    value={this.state.candle_item.description}
                    onChange={this.handleEditChange('description')}
                  />
                  {/* <h3>Description: <input placeholder="DESCRIPTION"
                    onChange={this.handleEditChange('description')} /></h3> */}
                  <br />
                  <TextField
                    id="standard-textarea"
                    label="PREPARATION"
                    multiline
                    margin="normal"
                    value={this.state.candle_item.preparation}
                    onChange={this.handleEditChange('preparation')}
                  />
                  {/* <h3>Preparation: <input placeholder="PREPARATION"
                    onChange={this.handleEditChange('preparation')} /></h3> */}
                  <br />
                  <TextField
                    id="standard-textarea"
                    label="NOTES"
                    multiline
                    margin="normal"
                    value={this.state.candle_item.note}
                    onChange={this.handleEditChange('note')}
                  />
                  <br />
                </div>
              </div>
            </CardMedia>
          </CardActionArea>
          <Button color="primary" className="candleBut" onClick={() => this.setState({ show: true })}>  submit edit
      </Button>
          <SweetAlert
            show={this.state.show}
            title="Confirm The Edit Of This Candle's Information?"
            type="success"
            showCancelButton
            onConfirm={() => {
              console.log('confirm'); // eslint-disable-line no-console
              this.setState({ show: false });
              this.props.dispatch({ type: 'UPDATE_CANDLE', payload: this.state.candle_item })
              this.handleReset()
            }}
            onCancel={() => {
              console.log('cancel'); // eslint-disable-line no-console
              this.setState({ show: false });
            }}
            onEscapeKey={() => this.setState({ show: false })}
            onOutsideClick={() => this.setState({ show: false })}
          />
        </Card>

    }
    else {
      candleInfo =
        <Card className="candleView right fade">
          <CardActionArea>
            <CardMedia>
              <Card className="candleCard fade">
                <CardActionArea>
                  <CardMedia>
                    <img src="https://images.unsplash.com/photo-1528351655744-27cc30462816?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80" alt="candle pic" />
                  </CardMedia>
                </CardActionArea>
              </Card>
            </CardMedia>
          </CardActionArea>
        </Card>
    }
    return (
      <div className="candleView left">
        <h1 className="pageHeader">Candles</h1>
        <Grid container spacing={3}>
          {<Grid item xs>
            <h3 className="secondHeader" onClick={this.presentationInfo}>SELECT A SCENT</h3>
            {candleInfo}
          </Grid>}
          <Grid item xs>
            <table className="candleTable">
              <tbody className="tableBody">
                {this.props.candles.map((title, i) => {
                  return (
                    <tr key={i} className="tableRow">
                      <td>{title.name}</td>
                      <td className="smallCol"><input type="radio"
                        key={title.id} name="candle"
                        onChange={this.handleChange(title)} />
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </Grid>

          <Grid item xs>
            <Fab className="edit" onClick={this.handleEdit}>{editIcon}</Fab>
            <br></br>
            <br></br>
            <Fab className="delete" onClick={this.handleDelete}>{deleteIcon}</Fab>
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
