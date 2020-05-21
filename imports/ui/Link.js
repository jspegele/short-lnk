import React from 'react'

import Header from './Header'
import LinksListFilters from './LinksListFilters'
import LinksList from './LinksList'
import AddLinkModal from './AddLinkModal'

export default () => (
  <>
    <Header />
    <div className="wrapper">
      <LinksListFilters />
      <AddLinkModal />
      <LinksList />
    </div>
  </>
)
