import React from 'react'

import Header from './Header'
import LinksListFilters from './LinksListFilters'
import LinksList from './LinksList'
import AddLinkForm from './AddLinkForm'

export default () => (
  <>
    <Header />
    <div className="wrapper">
      <LinksListFilters />
      <AddLinkForm />
      <LinksList />
    </div>
  </>
)
