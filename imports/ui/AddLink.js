import React from 'react'
import { Meteor } from 'meteor/meteor'

export default class AddLink extends React.Component {
  state = {
    url: ''
  }
  onUrlChange = e => {
    this.setState({ url: e.target.value })
  }
  onSubmit = e => {
    e.preventDefault()
    const { url } = this.state

    if (url) {
      Meteor.call('links.insert', url, (err, res) => {
        if (!err) {
          this.setState({ url: '' })
        }
      })
    }
  }
  render() {
    return (
      <div>
        <p>Add Link</p>
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            placeholder="URL"
            onChange={this.onUrlChange}
            value={this.state.url}
          />
          <button>Add Link</button>
        </form>
      </div>
    )
  }
}
