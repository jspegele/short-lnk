import React from 'react'
import { Meteor } from 'meteor/meteor'
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

    Meteor.call('links.insert', url, (err, res) => {
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
        <button onClick={this.handleModalOpen}>+ Add Link</button>
        <Modal
          isOpen={this.state.modal}
          onRequestClose={this.handleModalClose}
          contentLabel="Add link"
          onAfterOpen={() => this.refs.url.focus()}
        >
          <h1>Add Link</h1>
          {this.state.error && <p>{this.state.error}</p>}
          <form onSubmit={this.onSubmit}>
            <input
              type="text"
              placeholder="URL"
              ref="url"
              onChange={this.onUrlChange}
              value={this.state.url}
            />
            <button>Add Link</button>
          </form>
          <button onClick={this.handleModalClose}>Cancel</button>
        </Modal>
      </div>
    )
  }
}
