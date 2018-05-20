'use strict'
import React, {Component} from 'react'

class Recipe extends Component {
  render () {
    var recipe = this.props.recipe
    var ingredients = recipe.ingredients.map((ingredient, i) => (
      <li key={i}>{ingredient.name}</li>
    ))
    var instructions = recipe.instructions.split('\n').map((step, i) => (
      <p key={i}>{step}</p>
    ))
    return (
      <div className='recipe'>
        <h1>{recipe.name}</h1>
        <ul>
          <li>id: {recipe.id}</li>
          <li>description: {recipe.description}</li>
        </ul>
        <h2>Ingredients</h2>
        <ul>
          {ingredients}
        </ul>
        <h2>Instructions</h2>
        {instructions}
      </div>
    )
  }
}

export default Recipe
