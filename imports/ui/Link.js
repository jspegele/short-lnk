import React from 'react'

import { Links } from '../api/links'
import PrivateHeader from './PrivateHeader'
import LinksList from './LinksList'
import AddLink from './AddLink'

export default () => (
  <>
    <PrivateHeader title="Your Links" />
    <LinksList />
    <AddLink />
  </>
)
