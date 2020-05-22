import React from 'react'

import Header from './Header'
import LoginForm from './LoginForm'

export default () => (
  <div className="boxed-view">
    <Header hideActions={true} />
    <div className="boxed-view--content">
      <div className="boxed-view__box">
        <LoginForm />
      </div>
    </div>
  </div>
)
