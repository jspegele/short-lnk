import React from 'react'
import { Meteor } from 'meteor/meteor'
import { Session } from 'meteor/session'

export default class AddLinkForm extends React.Component {
  state = {
    url: '',
    error: ''
  }
  onUrlChange = e => {
    this.setState({ url: e.target.value })
  }
  onSubmit = e => {
    e.preventDefault()
    const { url } = this.state

    Meteor.call('links.insert', url, Session.get('tnylnkAnonId'), (err, res) => {
      if (!err) {
        this.setState({ url: '', error: '' })
      } else {
        this.setState({ error: err.reason })
      }
    })
  }
  render() {
    return (
      <div>
        {this.state.error && <p className="error">{this.state.error}</p>}
        <form className="boxed-view__form boxed-view__form--add-link" onSubmit={this.onSubmit}>
          <input
            className="add-link"
            type="text"
            placeholder="URL"
            ref="url"
            onChange={this.onUrlChange}
            value={this.state.url}
          />
          <button className="button button--primary">Shorten</button>
        </form>
      </div>
    )
  }
}
