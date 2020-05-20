import React from 'react'

import Header from './Header'
import LinksListFilters from './LinksListFilters'
import LinksList from './LinksList'
import AddLink from './AddLink'

export default () => (
  <>
    <Header title="TnyLnk" />
    <div className="wrapper">
      <LinksListFilters />
      <AddLink />
      <LinksList />
    </div>
  </>
)
