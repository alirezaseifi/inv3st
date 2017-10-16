import React, { Component } from 'react';
import { reduxForm, Field, change } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';

const renderField = ({ input, type, placeholder, meta: { touched, error } }) => (
  <div className="form-field">
    <input
      className={`input login-input ${(touched && error) ? 'has-error' : ''}`}
      type={type}
      placeholder={(touched && error) ? error : placeholder}
      {...input}
    />
  </div>
);

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentWillUnmount() {
    if (this.props.errorMessage) {
      this.props.errorMessage.login = null;
    }
  }

  handleFormSubmit(props) {
    this.props.loginUser(props);
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="container">
        <h1 className="hdr">Login</h1>
        <form onSubmit={handleSubmit(this.handleFormSubmit)}>
          <Field name="email" component={renderField} type="text" placeholder="Email" />
          <Field name="password" component={renderField} type="password" placeholder="Password" />
          { this.props.errorMessage && this.props.errorMessage.login &&
            <div className="error-container">{this.props.errorMessage.login}</div>
          }
          <button type="submit" className="btn auth">Login</button>
        </form>
      </div>
    )
  }
}

const validate = (props) => {
  const errors = {};

  if (!props.email) {
    errors.email = 'Email is required.';
  }

  if (!props.password) {
    errors.password = 'Password is required.';
  }

  if (props.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(props.email)) {
    errors.email = "Please provide a valid email.";
  }

  return errors;
}

const onSubmitFail = (errors, dispatch) => {
  for (let field in errors) {
    dispatch(change('login', `${field}`, ''));
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error
  };
}

Login = reduxForm({ form: 'login', validate, onSubmitFail })(Login);

export default connect(mapStateToProps, actions)(Login);
