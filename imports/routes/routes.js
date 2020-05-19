import { Meteor } from 'meteor/meteor'
import React from 'react'
import { Router, Route, Switch, Redirect } from 'react-router'
import { createBrowserHistory } from 'history';
import Signup from './../ui/Signup'
import Login from './../ui/Login'
import Link from '../ui/Link'
import NotFound from './../ui/NotFound'

export const browserHistory = createBrowserHistory();

const unauthenticatedPages = ['/', '/signup']
const authenticatedPages = ['/links']

const onEnterPublicPage = (Component) => {
  if (Meteor.userId()) {
      return <Redirect to="/links" />
  } else {
      return <Component />
  }
}

const onEnterPrivatePage = (Component) => {
  if (!Meteor.userId()) {
      return <Redirect to="/" />
  } else {
      return <Component />
  }
}

export const onAuthChange = (isAuthenticated) => {
  const pathname = location.pathname
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathname)
  const isAuthenticatedPage = authenticatedPages.includes(pathname)

  if (isUnauthenticatedPage && isAuthenticated) {
    browserHistory.push('/links')
  } else if (isAuthenticatedPage && !isAuthenticated) {
    browserHistory.push('/')
  }
}

export const routes = (
  <Router history={browserHistory}>
    <Switch>
      <Route exact path="/" render={() => onEnterPublicPage(Login)} />
      <Route path="/signup" render={() => onEnterPublicPage(Signup)} />
      <Route path="/links" render={() => onEnterPrivatePage(Link)} />
      <Route path="*" component={NotFound} />
    </Switch>
  </Router>
)