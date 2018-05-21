import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import RecipeIndex from './recipe-index'
import RecipeBook from './recipe-book'
import Recipe from './recipe'
import RecipeEditor from './recipe-editor'

require('./index.styl')

var model = new RecipeBook()

const getRecipe = ({ match }) => {
  var recipe = model.getRecipeById(match.params.id)
  if (typeof recipe !== 'undefined') {
    return <Recipe recipe={recipe} />
  }
  return (
    <div id='recipe'>
      <h1>Recipe not found</h1>
      Cannot view the recipe at the URL you requested. Maybe you deleted it or cleared out your browser cache? Copying links between browsers will not work because your recipes are only stored in the browser that you are using. They are not synced to a database.
    </div>
  )
}

const getRecipeEditor = ({ match }) => {
  var recipe = model.getRecipeById(match.params.id)
  if (typeof recipe !== 'undefined') {
    return <RecipeEditor model={model} recipe={recipe} />
  }
  return (
    <div id='recipe'>
      <h1>Recipe not found</h1>
      Cannot edit the recipe at the URL you requested. Maybe you deleted it or cleared out your browser cache? Copying links between browsers will not work because your recipes are only stored in the browser that you are using. They are not synced to a database.
    </div>
  )
}

const App = () => (
  <Router>
    <div>
      <RecipeIndex model={model} />
      <Switch>
        <Route path='/edit/:id' component={getRecipeEditor} />
        <Route path='/:id' component={getRecipe} />
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
