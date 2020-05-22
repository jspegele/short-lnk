import React from 'react'
import { Meteor } from 'meteor/meteor'
import { Tracker } from 'meteor/tracker'
import { Accounts } from 'meteor/accounts-base'
import { Link } from 'react-router-dom'
import Modal from 'react-modal'

import LoginForm from './LoginForm'

export default class PrivateHeader extends React.Component {
  state = {
    loggedIn: false,
    modal: false
  }
  componentDidMount() {
    Modal.setAppElement('#app')
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
  handleModalOpen = () => {
    this.setState({ modal: true })
  }
  handleModalClose = () => {
    this.setState({ modal: false })
  }
  render() {
    return (
      <div className="header">
        <div className="wrapper">
          <div className="header__content">
            <Link to="/"><h1 className="header__title">TnyLnk</h1></Link>
            {!this.props.hideActions && (
              this.state.loggedIn ? (
                <button
                  className="button button--link-text"
                  type="button"
                  onClick={() => Accounts.logout()}
                >
                  Logout
                </button>
              ) : (
                <a
                  className="button button--link-text"
                  onClick={this.handleModalOpen}
                >
                  Login / Register
                </a>
              )
            )}
            <Modal
              isOpen={this.state.modal}
              contentLabel="Add link"
              onRequestClose={this.handleModalClose}
              className="boxed-view__box"
              overlayClassName="boxed-view boxed-view--modal"
            >
              <LoginForm />
            </Modal>
          </div>
        </div>
      </div>
    )
  }
}
