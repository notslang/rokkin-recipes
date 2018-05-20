'use strict'
import React, {Component} from 'react'

import {NavLink} from 'react-router-dom'

class RecipeIndex extends Component {
  render () {
    var {model} = this.props

    // NOTE: these are already sorted by time added
    var recipes = model.recipes.map((recipe) => (
      <li key={recipe.id}>
        <NavLink to={'/' + recipe.id} activeClassName='active'>{recipe.name}</NavLink>
        <button onClick={() => model.deleteRecipeById(recipe.id)}>
          delete
        </button>
      </li>
    ), this)

    return (
      <ul>
        {recipes}
        <li>
          <button onClick={() => model.newRecipe()}>
            new recipe
          </button>
        </li>
      </ul>
    )
  }
}

export default RecipeIndex
