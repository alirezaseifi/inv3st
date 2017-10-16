import React, { Component } from 'react';
import { reduxForm, Field, change } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';

const renderField = ({ input, className, type, placeholder, meta: { touched, error } }) => {
  return (
    <div className={className}>
      <input
        className={`input signup-input ${(touched && error) ? 'has-error' : ''}`}
        type={type}
        placeholder={(touched && error) ? error : placeholder}
        {...input}
      />
    </div>
  )
}

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentWillUnmount() {
    if (this.props.errorMessage) {
      this.props.errorMessage.signup = null;
    }
  }

  handleFormSubmit(props) {
    this.props.signupUser(props);
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="signup-container">
        <h1 className="hdr">Sign Up</h1>
        <form onSubmit={handleSubmit(this.handleFormSubmit)}>
          <Field name="first" component={renderField} className="form-field field-first" type="text" placeholder="First" />
          <Field name="last" component={renderField} className="form-field field-last" type="text" placeholder="Last" />
          <Field name="email" component={renderField} className="form-field" type="text" placeholder="Email" />
          <Field name="password" component={renderField} className="form-field" type="password" placeholder="Password" />
          <Field name="confirmpassword" component={renderField} className="form-field" type="password" placeholder="Confirm Password" />
          { this.props.errorMessage && this.props.errorMessage.signup &&
            <div className="error-container">{this.props.errorMessage.signup}</div>
          }
          <button type="submit" className="btn auth">Sign Up</button>
        </form>
      </div>
    )
  }
}

const validate = props => {
  const errors = {};
  const fields = [
    {
      name: 'first',
      title: 'First name'
    },
    {
      name: 'last',
      title: 'Last name'
    },
    {
      name: 'email',
      title: 'Email'
    },
    {
      name: 'password',
      title: 'Password'
    },
    {
      name: 'confirmpassword',
      title: 'Confirm password'
    }
  ];

  fields.forEach((f) => {
    if (!(f.name in props)) {
      errors[f.name] = `${f.title} is required.`;
    }
  });

  if (props.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(props.email)) {
    errors.email = "Please provide a valid email.";
  }

  if (props.password && props.password.length < 6) {
    errors.password = "Minimum 6 characters.";
  }

  if (props.password !== props.confirmpassword) {
    errors.confirmpassword = "Passwords don't match.";
  }

  return errors;
}

const onSubmitFail = (errors, dispatch) => {
  for (let field in errors) {
    dispatch(change('signup', `${field}`, ''));
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error
  };
}

SignUp = reduxForm({ form: 'signup', validate, onSubmitFail })(SignUp);

export default connect(mapStateToProps, actions)(SignUp);
