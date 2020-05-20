import React from 'react'
import PropTypes from 'prop-types'

import { Accounts } from 'meteor/accounts-base'

const PrivateHeader = ({ title }) => (
  <div className="header">
    <div className="wrapper">
      <div className="header__content">
        <h1 className="header__title">{title}</h1>
        <button
          className="button button--link-text"
          type="button"
          onClick={() => Accounts.logout()}
        >
          Logout
        </button>
      </div>
    </div>
  </div>
)

PrivateHeader.propTypes = {
  title: PropTypes.string.isRequired
}

export default PrivateHeader
