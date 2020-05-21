import React from 'react'
import { Meteor } from 'meteor/meteor'
import PropTypes from 'prop-types'
import Clipboard from 'clipboard'
import moment from 'moment'

export default class LinksListItem extends React.Component {
  state = {
    justCopied: false
  }
  componentDidMount() {
    this.clipboard = new Clipboard(this.refs.copy)
    this.clipboard.on('success', () => {
      this.setState({ justCopied: true })
      setTimeout(() => this.setState({ justCopied: false }), 1000)
    }).on('error', () => {
      alert('Unable to copy. Please manually copy the link.')
    })
  }
  componentWillUnmount() {
    this.clipboard.destroy()
  }
  renderStats() {
    const visitMessage = this.props.visitedCount === 1 ? 'click' : 'clicks'
    let visitedMessage = null

    if (typeof this.props.lastVisitedAt === 'number') {
      visitedMessage = `(last clicked ${moment(this.props.lastVisitedAt).fromNow()})`
    }

    return <div>{this.props.visitedCount} {visitMessage} {visitedMessage}</div>
  }
  render() {
    return (
      <div className="item">
        <div className="item__title">
          <div className="item__message">
            <div className="item__url"><span>{this.props.url}</span></div>
            <div>{!this.props.anonymous && this.renderStats()}</div>
          </div>
        </div>
        <div className="item__shortUrl">
          <a href={this.props.shortUrl} target="_blank">{this.props.shortUrl}</a>
        </div>
        <div className="item__actions">
          <button
            className={this.state.justCopied ? "button button--pill button--pill-alt button--copy" : "button button--pill button--copy"}
            ref="copy"
            data-clipboard-text={this.props.shortUrl}
          >
            {this.state.justCopied ? 'Copied!' : 'Copy'}
          </button>
          {!this.props.anonymous && (
            <button
              className="button button--pill"
              onClick={() => {
                Meteor.call('links.setVisibility', this.props._id, !this.props.visible)
              }}
            >
              {this.props.visible ? 'Hide' : 'Unhide'}
            </button>
          )}
        </div>
      </div>
    )
  }
}

LinksListItem.propTypes = {
  _id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  createdAt: PropTypes.number.isRequired,
  anonymous: PropTypes.bool.isRequired,
  visible: PropTypes.bool.isRequired,
  shortUrl: PropTypes.string.isRequired,
  visitedCount: PropTypes.number.isRequired,
  lastVisitedAt: PropTypes.number
}
