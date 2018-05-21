'use strict'
import React, {Component} from 'react'
import {NavLink, Link} from 'react-router-dom'
import {withRouter} from 'react-router'

class RecipeIndex extends Component {
  handleNew () {
    var recipe = this.props.model.newRecipe()
    this.props.history.push('/edit/' + recipe.id)
  }

  render () {
    var {model} = this.props

    // NOTE: these are already sorted by time added
    var recipes = model.recipes.map((recipe) => (
      <li className='recipe-link' key={recipe.id}>
        <NavLink to={'/' + recipe.id} activeClassName='active'>{recipe.name}</NavLink>
        <button className='delete' onClick={() => model.deleteRecipeById(recipe.id)}>
          delete
        </button>
      </li>
    ), this)

    return (
      <ul id='recipe-index'>
        <li id='logo'><Link to='/' /></li>
        <li>
          <button id='new-recipe' onClick={() => this.handleNew()}>
            new recipe
          </button>
        </li>
        {recipes}
      </ul>
    )
  }
}

export default withRouter(RecipeIndex)
