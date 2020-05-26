import React from 'react'
import { Meteor } from 'meteor/meteor'
import PropTypes from 'prop-types'
import Clipboard from 'clipboard'
import moment from 'moment'
import { RiBarChart2Line, RiTimeLine } from 'react-icons/ri'
import Modal from 'react-modal'

import Label from './Label'
import ConfirmDelete from './ConfirmDelete'

export default class LinksListItem extends React.Component {
  state = {
    justCopied: false,
    modal: false
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

    return (
      <div className="item__stats">
        <RiBarChart2Line size="1.68rem" />
        <Label key={this.props._id + 'visitCount'} text={this.props.visitedCount.toString().concat(' ' + visitMessage)} />
        <RiTimeLine size="1.6rem" />
        <Label key={this.props._id + 'lastVist'} text={moment(this.props.lastVisitedAt).fromNow()} />
      </div>
    )
  }
  handleHide = () => {
    Meteor.call('links.setVisibility', this.props._id, !this.props.visible)
  }
  handleModalOpen = () => {
    this.setState({ modal: true })
  }
  handleModalClose = () => {
    this.setState({ modal: false })
  }
  handleDelete = () => {
    Meteor.call('links.remove', this.props._id)
  }
  render() {
    return (
      <div className="item">
        <div className="item__details">
          <div className="item__url item__message" title={this.props.url}><span>{this.props.url}</span></div>
          <div className="item__stats">
            <div className="item__message">
              {!this.props.anonymous && this.renderStats()}
            </div>
          </div>
        </div>
        <div className="item__actions">
          <div className="item__shortUrl">
            <a href={this.props.shortUrl} target="_blank">{this.props.shortUrl}</a>
          </div>
          <div className="item__action-buttons">
            <button
              className={this.state.justCopied ? "button button--special button--copied" : "button button--secondary button--copy"}
              ref="copy"
              data-clipboard-text={this.props.shortUrl}
            >
              {this.state.justCopied ? 'Copied!' : 'Copy'}
            </button>
            {!this.props.anonymous && (
              <button
                className="button button--secondary"
                onClick={this.handleHide}
              >
                {this.props.visible ? 'Hide' : 'Unhide'}
              </button>
            )}
            {!this.props.anonymous && (
              <>
                <button
                  className="button button--tertiary"
                  onClick={this.handleModalOpen}
                >
                  Delete
                </button>
                <Modal
                  isOpen={this.state.modal}
                  contentLabel="Delete link"
                  onRequestClose={this.handleModalClose}
                  className="boxed-view__box"
                  overlayClassName="boxed-view boxed-view--modal"
                >
                  <ConfirmDelete
                    handleModalClose={this.handleModalClose}
                    handleHide={this.handleHide}
                    handleDelete={this.handleDelete}
                  />
                </Modal>
              </>
            )}
          </div>
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
