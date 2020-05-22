import React from 'react'

import Header from './Header'
import LinksList from './LinksList'
import AddLinkForm from './AddLinkForm'

export default () => (
  <>
    <Header />
    <div className="wrapper">
      <AddLinkForm />
      <LinksList />
    </div>
  </>
)
