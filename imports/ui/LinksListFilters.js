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
      <div className="filters">
        <input
          className="filters__search"
          type="text"
          name="searchLinks"
          placeholder="Search Links"
          onChange={e => this.props.handleSearch(e)}
        />
        <select
          className="filters__sort"
          onChange={e => this.props.handleSort(e)}
          defaultValue="createdAtDesc"
        >
          <option value="createdAtDesc">Newest</option>
          <option value="createdAtAsc">Oldest</option>
          <option value="visitCountDesc">Visit Count Desc</option>
          <option value="visitCountAsc">Visit Count Asc</option>
        </select>
        <label className="filters__visible checkbox">
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