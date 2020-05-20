import React from 'react'

import PrivateHeader from './PrivateHeader'
import LinksListFilters from './LinksListFilters'
import LinksList from './LinksList'
import AddLink from './AddLink'

export default () => (
  <>
    <PrivateHeader title="Your Links" />
    <LinksListFilters />
    <AddLink />
    <LinksList />
  </>
)
