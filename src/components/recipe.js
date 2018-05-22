'use strict'
import React from 'react'
import {Link} from 'react-router-dom'
import marked from 'marked'

const Recipe = ({recipe}) => {
  var ingredients = recipe.ingredients.map((ingredient, i) => (
    <li key={ingredient.id}>{ingredient.name}</li>
  ))
  return (
    <div id='recipe'>
      <div id='recipe-header'>
        <h1>
          {recipe.name}
          <span className='time-created'>
            Recipe created {new Date(recipe.timeAdded * 1000).toLocaleString()}
          </span>
        </h1>
        <Link to={'/edit/' + recipe.id}>edit</Link>
      </div>
      <div id='recipe-body'>
        <p>Serves {recipe.servings}</p>
        <h2>Description</h2>
        <div dangerouslySetInnerHTML={{__html: marked(recipe.description)}} />
        <h2>Ingredients</h2>
        <ul>
          {ingredients}
        </ul>
        <h2>Instructions</h2>
        <div dangerouslySetInnerHTML={{__html: marked(recipe.instructions)}} />
      </div>
    </div>
  )
}

export default Recipe
