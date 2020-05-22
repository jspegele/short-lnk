import React from 'react'
import { Meteor } from 'meteor/meteor'
import { Session } from 'meteor/session'
import Modal from 'react-modal'

export default class AddLink extends React.Component {
  state = {
    url: '',
    modal: false,
    error: ''
  }
  componentDidMount() {
    Modal.setAppElement('#app')
  }
  handleModalOpen = () => {
    this.setState({ modal: true })
  }
  handleModalClose = () => {
    this.setState({
      modal: false,
      url: '',
      error: ''
    })
  }
  onUrlChange = e => {
    this.setState({ url: e.target.value })
  }
  onSubmit = e => {
    e.preventDefault()
    const { url } = this.state

    Meteor.call('links.insert', url, Session.get('tnylnkAnonId'), (err, res) => {
      if (!err) {
        this.handleModalClose()
      } else {
        this.setState({ error: err.reason })
      }
    })
  }
  render() {
    return (
      <div>
        <button
          className="button button--link"
          onClick={this.handleModalOpen}
        >+ Add Link</button>
        <Modal
          isOpen={this.state.modal}
          contentLabel="Add link"
          onAfterOpen={() => this.refs.url.focus()}
          onRequestClose={this.handleModalClose}
          className="boxed-view__box"
          overlayClassName="boxed-view boxed-view--modal"
        >
          <h1>Add Link</h1>
          {this.state.error && <p className="error">{this.state.error}</p>}
          <form className="boxed-view__form" onSubmit={this.onSubmit}>
            <input
              type="text"
              placeholder="URL"
              ref="url"
              onChange={this.onUrlChange}
              value={this.state.url}
            />
            <button className="button">Add Link</button>
            <button
              className="button button--secondary"
              onClick={this.handleModalClose}
              type="button"
            >
              Cancel
            </button>
          </form>
        </Modal>
      </div>
    )
  }
}
