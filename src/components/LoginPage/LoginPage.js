import React, { Component } from 'react';
import { connect } from 'react-redux';

// import './LoginPage.css';

class LoginPage extends Component {
  state = {
    username: '',
    password: '',
  };

  login = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'LOGIN',
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  } // end login

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    return (
      <div className="sankara">

        <div>
          <h2 className="logTitle">Sankara</h2>
          <form className="logForm" onSubmit={this.login}>
            <div>
              <label htmlFor="username">
                <input
                  className="user"
                  type="text"
                  name="username"
                  placeholder="USERNAME"
                  value={this.state.username}
                  onChange={this.handleInputChangeFor('username')}
                />
              </label>
            </div>
            <div>
              <label htmlFor="password">
                <input
                  className="user"
                  type="password"
                  name="password"
                  placeholder="PASSWORD"
                  value={this.state.password}
                  onChange={this.handleInputChangeFor('password')}
                />
              </label>
             <div>
             <div>
              <input
                className="log-in"
                type="submit"
                name="submit"
                value="LOGIN"
              />
            </div>
          {this.props.errors.loginMessage && (
            <h2
              className="alert"
              role="alert"
            >
              {this.props.errors.loginMessage}
            </h2>
          )}
        </div>
            </div>
          </form>
        </div>

        <center>
          <button
            type="button"
            className="link-button"
            onClick={() => { this.props.dispatch({ type: 'SET_TO_REGISTER_MODE' }) }}
          >
            Register
          </button>
        </center>
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(LoginPage);
