'use strict'
import React, {Component} from 'react'
import clone from 'lodash.clone'
import {Link} from 'react-router-dom'

class RecipeEditor extends Component {
  handleChange (property, event) {
    var {model, recipe} = this.props

    // we can use clone here becuase our ingredient editing is separate
    var newRecipe = clone(recipe)
    newRecipe[property] = event.target.value
    model.updateRecipe(newRecipe)
  }

  addIngredient () {
    var {model, recipe} = this.props
    model.addIngredient(recipe.id, 'ingredient name...')
  }

  handleIngredientChange (ingredientId, event) {
    var {model, recipe} = this.props
    model.updateIngredient(recipe.id, {
      id: ingredientId,
      name: event.target.value
    })
  }

  deleteIngredient (ingredientId, event) {
    var {model, recipe} = this.props
    model.deleteIngredient(recipe.id, ingredientId)
  }

  render () {
    var {recipe} = this.props
    var ingredients = recipe.ingredients.map((ingredient, i) => {
      return (
        <li key={ingredient.id}>
          <label>
            Name:
            <input type='text' value={ingredient.name} onChange={this.handleIngredientChange.bind(this, ingredient.id)} />
            <input type='button' onClick={this.deleteIngredient.bind(this, ingredient.id)} value='delete' />
          </label>
        </li>
      )
    })
    return (
      <div id='recipe-editor'>
        <Link to={'/' + recipe.id}>close editor</Link>
        <form className='recipe-editor'>
          <input name='name' type='text' value={recipe.name} onChange={this.handleChange.bind(this, 'name')} />

          <label htmlFor='description'><h2>Description</h2></label>
          <textarea id='description' value={recipe.description} onChange={this.handleChange.bind(this, 'description')} />
          <h2>Ingredients</h2>
          <ul>
            {ingredients}
          </ul>
          <input type='button' onClick={this.addIngredient.bind(this)} value='add ingredient' />
          <label htmlFor='instructions'><h2>Instructions</h2></label>
          <textarea id='instructions' value={recipe.instructions} onChange={this.handleChange.bind(this, 'instructions')} />
        </form>
      </div>
    )
  }
}

export default RecipeEditor
