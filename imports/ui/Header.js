import React from 'react'
import { Meteor } from 'meteor/meteor'
import { Tracker } from 'meteor/tracker'
import { Accounts } from 'meteor/accounts-base'
import { Link } from 'react-router-dom'

export default class PrivateHeader extends React.Component {
  state = {
    loggedIn: false
  }
  componentDidMount() {
    this.loginTracker = Tracker.autorun(() => {
      if (Meteor.userId()) {
        // const email = Meteor.user().emails[0]
        this.setState({ loggedIn: true })
      } else {
        this.setState({ loggedIn: false })
      }
    })
  }
  componentWillUnmount() {
    this.loginTracker.stop()
  }
  render() {
    return (
      <div className="header">
        <div className="wrapper">
          <div className="header__content">
            <h1 className="header__title">TnyLnk</h1>
            {this.state.loggedIn ? (
              <button
                className="button button--link-text"
                type="button"
                onClick={() => Accounts.logout()}
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="button button--link-text"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    )
  }
}
