'use strict'
import React from 'react'
import {Link} from 'react-router-dom'

const Recipe = ({recipe}) => {
  var ingredients = recipe.ingredients.map((ingredient, i) => (
    <li key={i}>{ingredient.name}</li>
  ))
  var instructions = recipe.instructions.split('\n').map((step, i) => (
    <p key={i}>{step}</p>
  ))
  return (
    <div id='recipe'>
      <Link to={'/edit/' + recipe.id}>edit</Link>
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

export default Recipe
