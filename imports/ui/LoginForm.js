import React from 'react'
import { Link } from 'react-router-dom'
import { Meteor } from 'meteor/meteor'
import { v4 as uuidv4 } from 'uuid';

import { browserhistory, browserHistory } from '../routes/routes'

export default class LoginForm extends React.Component {
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

    Meteor.loginWithPassword({ email }, password, err => {
      if (err) {
        this.setState({ error: 'Unable to login. Check email and password.' })
      } else {
        this.setState({ error: '' })
        browserHistory.push('/')
      }
    })
  }
  render() {
    return  (
      <>
        <h1>Login to TnyLnk</h1>
        <p>Gain insights into your shared links.</p>

        {this.state.error && <p className="error">{this.state.error}</p>}

        <form
          className="boxed-view__form"
          onSubmit={this.onSubmit}
          noValidate
        >
          <input type="email" ref="email" name="email" placeholder="Email" autoFocus />
          <input type="password" ref="password" name="password" placeholder="Password" />
          <button className="button">Login</button>
        </form>

        <Link to='/signup'>Need an account?</Link>
      </>
    )
  }
}
