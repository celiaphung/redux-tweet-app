import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
//curly brackets means importing Named exports -> A component can have multiple Named exports
import { handleInitialData } from '../actions/shared'
//Non-curly brackets mearns importing Default exports -> A component only has 1 Default exports
import Dashboard from './Dashboard'
import LoadingBar from 'react-redux-loading'
import NewTweet from './NewTweet'
import TweetPage from './TweetPage'
import { BrowserRouter, Route } from 'react-router-dom'
import Nav from './Nav'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    return (
      <BrowserRouter>
        {/* Allows us to add a child to the router but not a new element to the DOM */}
        <Fragment>
          <LoadingBar />
          <div className='container'>
            <Nav />
            {this.props.loading === true
              ? null
              : <div>
                <Route path='/' exact component={Dashboard} />
                <Route path='/tweet/:id' component={TweetPage} />
                <Route path='/new' component={NewTweet} />
              </div>}
          </div>
        </Fragment>
      </BrowserRouter>
    )
  }
}

//Dashboard component is only rendered once handleInitialData() is finished
function mapStateToProps({ authedUser }) {
  return {
    loading: authedUser === null
  }
}

export default connect(mapStateToProps)(App);