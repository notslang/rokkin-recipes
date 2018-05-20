'use strict'
import React, {Component} from 'react'

class Recipe extends Component {
  render () {
    var {recipe} = this.props
    var ingredients = recipe.ingredients.map((ingredient, i) => (
      <li key={i}>{ingredient.name}</li>
    ))
    var instructions = recipe.instructions.split('\n').map((step, i) => (
      <p key={i}>{step}</p>
    ))
    return (
      <div className='recipe'>
        <h1>{recipe.name}</h1>
        <p>Recipe added {new Date(recipe.timeAdded * 1000).toLocaleString()}</p>
        <h2>Description</h2>
        <p>{recipe.description}</p>
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
