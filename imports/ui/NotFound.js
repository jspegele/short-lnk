import React from 'react'
import { Link } from 'react-router-dom'

export default () => (
  <div className="boxed-view">
    <div className="boxed-view__box">
      <h1>Page Not Found</h1>
      <p>We were unable to find that page :-(</p>
      <Link to="/">Head Home</Link>
    </div>
  </div>
)
