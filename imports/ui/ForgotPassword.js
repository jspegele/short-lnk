import React from 'react'
import { Link } from 'react-router-dom'
import { Accounts } from 'meteor/accounts-base'

import Header from './Header'

export default class ForgotPassword extends React.Component {
  state = {
    error: ''
  }
  onSubmit = (e) => {
    e.preventDefault()
    const email = e.target.email.value
    Accounts.forgotPassword({ email }, () => {
      console.log('reset link sent')
    })
  }
  render() {
    return (
      <div className="boxed-view">
        <Header hideActions={true} />
        <div className="boxed-view--content">
          <div className="boxed-view__box">
            <h1>Forgot Your Password?</h1>
            <p>Enter the email you signed up with below and we'll send you alink to reset your password.</p>
  
            {this.state.error && <p className="error">{this.state.error}</p>}
  
            <form
              className="boxed-view__form"
              onSubmit={this.onSubmit}
              noValidate
            >
              <input type="email" name="email" placeholder="Email Address" autoFocus />
              <button className="button">Send Reset Email</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
