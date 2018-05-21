import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import RecipeIndex from './recipe-index'
import RecipeBook from './recipe-book'
import Recipe from './recipe'
import RecipeEditor from './recipe-editor'
import NotFound from './not-found'

require('./index.styl')
require('normalize.css')

var model = new RecipeBook()

const getRecipeViewer = ({ match }) => {
  var recipe = model.getRecipeById(match.params.id)
  if (typeof recipe !== 'undefined') {
    return <Recipe recipe={recipe} />
  }
  return <NotFound verb='view' />
}

const getRecipeEditor = ({ match }) => {
  var recipe = model.getRecipeById(match.params.id)
  if (typeof recipe !== 'undefined') {
    return <RecipeEditor model={model} recipe={recipe} />
  }
  return <NotFound verb='edit' />
}

const App = () => (
  <Router>
    <div>
      <RecipeIndex model={model} />
      <Switch>
        <Route path='/edit/:id' component={getRecipeEditor} />
        <Route path='/:id' component={getRecipeViewer} />
      </Switch>
    </div>
  </Router>
)

var render = () => {
  ReactDOM.render(
    <App />,
    document.getElementById('app')
  )
}

model.subscribe(render)
render()
