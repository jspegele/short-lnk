import React from 'react'
import { Tracker } from 'meteor/tracker'
import { Session } from 'meteor/session'

export default class LinksListFilters extends React.Component {
  state = {
    showVisible: true
  }
  componentDidMount() {
    this.visibleTracker = Tracker.autorun(() => {
      this.setState({ showVisible: Session.get('showVisible') })
    })
  }
  componentWillUnmount() {
    this.visibleTracker.stop()
  }
  render() {
    return (
      <div>
        <label className="checkbox">
          <input
            className="checkbox__box"
            type="checkbox"
            checked={!this.state.showVisible}
            onChange={e => {
              Session.set('showVisible', !e.target.checked)
            }}
          />
          show hidden links
        </label>
      </div>
    )
  }
}