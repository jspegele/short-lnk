import React from 'react'
import PropTypes from 'prop-types'

import { Accounts } from 'meteor/accounts-base'

const PrivateHeader = ({ title }) => (
  <div>
    <h1>{title}</h1>
    <button type="button" onClick={() => Accounts.logout()}>Logout</button>
  </div>
)

PrivateHeader.propTypes = {
  title: PropTypes.string.isRequired
}

export default PrivateHeader
