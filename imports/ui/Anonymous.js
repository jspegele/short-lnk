import React from 'react'
import { Tracker } from 'meteor/tracker'
import { Session } from 'meteor/session'
import FlipMove from 'react-flip-move'
import { FaLink } from 'react-icons/fa'

import { Links } from '../api/links'
import Header from './Header'
import AddLinkAnonymous from './AddLinkAnonymous'
import LinksListItem from './LinksListItem'

export default class Anonymous extends React.Component {
  state ={
    links: []
  }
  componentDidMount() {
    this.linksTracker = Tracker.autorun(() => {
      Meteor.subscribe('links')
      const links = Links.find({
        userId: Session.get('tnylnkAnonId')
      }, {sort: {createdAt: -1}}).fetch()
      this.setState({ links })
    })
  }
  componentWillUnmount() {
    this.linksTracker.stop()
  }
  render() {
    return (
      <div>
        <Header />
        <div className="wrapper">
          <div className="centered">
            <FaLink size="8.4rem" />
            <h1>Easy, Readable, Tiny Links</h1>
          </div>
          <p>
            Enter a link below to generate a shortened alias that you can easily share 
            on social media, in email, messaging, etc.
          </p>
          <AddLinkAnonymous />
          {this.state.links.length > 0 && (
            <div>
              <FlipMove maintainContainerHeight={true}>
                {this.state.links.map(link => {
                  const shortUrl = Meteor.absoluteUrl(link._id)
                  return <LinksListItem key={link._id} shortUrl={shortUrl} {...link} />
                })}
              </FlipMove>
              <p>
                Tiny links created anonymously are saved to your cookies. You will 
                lose this history if you clear your cookies. Create an account today 
                to save your TnyLnk history, view  link stats and edit your links.
              </p>
            </div>
          )}
        </div>
      </div>
    )
  }
}