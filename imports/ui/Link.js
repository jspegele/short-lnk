import React from 'react'

import { Links } from '../api/links'
import PrivateHeader from './PrivateHeader'
import LinksListFilters from './LinksListFilters'
import LinksList from './LinksList'
import AddLink from './AddLink'

export default () => (
  <>
    <PrivateHeader title="Your Links" />
    <LinksListFilters />
    <LinksList />
    <AddLink />
  </>
)
