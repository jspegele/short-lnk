import React from 'react'
import { Meteor } from 'meteor/meteor'
import { Tracker } from 'meteor/tracker'
import { Session } from 'meteor/session'
import FlipMove from 'react-flip-move'

import { Links } from '../api/links'
import LinksListFilters from './LinksListFilters'
import LinksListItem from './LinksListItem'

export default class LinksList extends React.Component {
  constructor(props) {
    super(props)
    this.links = []
    this.state ={
      visibleLinks: [],
      sort: 'createdAtDesc'
    }
  }
  componentDidMount() {
    this.linksTracker = Tracker.autorun(() => {
      Meteor.subscribe('links')
      this.links = Links.find({
        visible: Session.get('showVisible')
      }, {sort: {createdAt: -1}}).fetch()
      this.setState({ visibleLinks: this.links })
    })
  }
  componentWillUnmount() {
    this.linksTracker.stop()
  }
  renderLinksListItems() {
    if (this.state.visibleLinks.length === 0) {
      return (
        <div className="item">
          <p className="item__status-message">No links found</p>
        </div>
      )
    }

    return this.state.visibleLinks.map(link => {
      const shortUrl = Meteor.absoluteUrl(link._id)
      return <LinksListItem key={link._id} shortUrl={shortUrl} {...link} />
    })
  }
  handleSearch = e => {
    const filter = e.target.value
    this.setState({ visibleLinks: this.links.filter(link => link.url.includes(filter)) }, () => {
      this.sortLinks()
    })
  }
  handleSort = e => {
    this.setState({ sort: e.target.value }, () => {
      this.sortLinks()
    })
  }
  sortLinks = () => {
    const sort = this.state.sort
    if (sort === 'visitCountDesc') {
      this.setState({ visibleLinks: this.sortByVisitCountDesc(this.state.visibleLinks) })
    } else if (sort === 'visitCountAsc') {
      this.setState({ visibleLinks: this.sortByVisitCountAsc(this.state.visibleLinks) })
    } else if (sort === 'createdAtDesc') {
      this.setState({ visibleLinks: this.sortByCreatedAtDesc(this.state.visibleLinks) })
    } else if (sort === 'createdAtAsc') {
      this.setState({ visibleLinks: this.sortByCreatedAtAsc(this.state.visibleLinks) })
    }
  }
  sortByVisitCountDesc = (links) => {
    return links.sort((a, b) => a.visitedCount < b.visitedCount ? 1 : -1)
  }
  sortByVisitCountAsc = (links) => {
    return links.sort((a, b) => a.visitedCount > b.visitedCount ? 1 : -1)
  }
  sortByCreatedAtDesc = (links) => {
    return links.sort((a, b) => a.createdAt < b.createdAt ? 1 : -1)
  }
  sortByCreatedAtAsc = (links) => {
    return links.sort((a, b) => a.createdAt > b.createdAt ? 1 : -1)
  }
  render() {
    return (
      <div>
        <LinksListFilters handleSearch={this.handleSearch} handleSort={this.handleSort} />
        {/* <FlipMove maintainContainerHeight={true}> */}
          {this.renderLinksListItems()}
        {/* </FlipMove> */}
      </div>
    )
  }
}
