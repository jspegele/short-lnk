import React from 'react'
import { Link } from 'react-router-dom'

import { Accounts } from 'meteor/accounts-base'
import Header from './Header'

export default class SignupPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: ''
    }
  }
  onSubmit = e => {
    e.preventDefault()

    let email = this.refs.email.value.trim()
    let password = this.refs.password.value.trim()
    let passwordConfirmation = this.refs.passwordConfirmation.value.trim()

    if (password !== passwordConfirmation) {
      return this.setState({ error: 'Passwords do not match' })
    } else if (password.length < 6 ) {
      return this.setState({ error: 'Password must be at least 6 characters' })
    }

    Accounts.createUser({ email, password }, err => {
      if (err) {
        const reason =
        this.setState({ error: err.reason })
      } else {
        this.setState({ error: '' })
      }
    })
  }
  render() {
    return (
      <div className="boxed-view">
        <Header hideActions={true} />
        <div className="boxed-view--content">
          <div className="boxed-view__box">
            <h1>Join TnyLnk</h1>

            {this.state.error && <p className="error">{this.state.error}</p>}

            <form
              className="boxed-view__form"
              onSubmit={this.onSubmit}
              noValidate
            >
              <input type="email" ref="email" name="email" placeholder="Email" />
              <input type="password" ref="password" name="password" placeholder="Password" />
              <input type="password" ref="passwordConfirmation" name="passwordConfirmation" placeholder="Confirm Password" />
              <button className="button">Create Account</button>
            </form>

            <Link to='/login'>Already have an account?</Link>
          </div>
        </div>
      </div>
    )
  }
}
