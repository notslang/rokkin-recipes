'use strict'
import React, {Component} from 'react'

import {Link} from 'react-router-dom'

class RecipeIndex extends Component {
  render () {
    var recipes = this.props.model.recipes.map((recipe) => {
      return (
        <li key={recipe.id}>
          <Link to={'/' + recipe.id}>{recipe.name}</Link>
        </li>
      )
    }, this)

    return <ul>{recipes}</ul>
  }
}

export default RecipeIndex
