'use strict'
import React, {Component} from 'react'
import clone from 'lodash.clone'
import {Link} from 'react-router-dom'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import DeleteIcon from '@material-ui/icons/Delete'
import IconButton from '@material-ui/core/IconButton'

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
    model.addIngredient(recipe.id, '')
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
          <TextField
            type='text'
            value={ingredient.name}
            onChange={this.handleIngredientChange.bind(this, ingredient.id)}
            placeholder='1 cup of Some Ingredient'
          />
          <IconButton onClick={this.deleteIngredient.bind(this, ingredient.id)}>
            <DeleteIcon />
          </IconButton>
        </li>
      )
    })
    return (
      <div id='recipe-editor'>
        <div id='recipe-header'>
          <h1>
            <input name='name' type='text' value={recipe.name} onChange={this.handleChange.bind(this, 'name')} />
            <span className='time-created'>
              Recipe created {new Date(recipe.timeAdded * 1000).toLocaleString()}
            </span>
          </h1>
          <Link to={'/' + recipe.id}>close editor</Link>
        </div>
        <div id='recipe-body'>
          <TextField
            label='Serves'
            type='number'
            value={recipe.servings}
            onChange={this.handleChange.bind(this, 'servings')}
            margin='normal'
          />
          <label htmlFor='description'><h2>Description</h2></label>
          <TextField
            id='description'
            multiline
            fullWidth
            value={recipe.description}
            onChange={this.handleChange.bind(this, 'description')}
          />
          <h2>Ingredients</h2>
          <ul id='ingredient-editor'>
            {ingredients}
            <li>
              <Button variant='raised' onClick={this.addIngredient.bind(this)}>
                add ingredient
              </Button>
            </li>
          </ul>
          <label htmlFor='instructions'><h2>Instructions</h2></label>
          <TextField
            id='instructions'
            multiline
            fullWidth
            value={recipe.instructions}
            onChange={this.handleChange.bind(this, 'instructions')}
          />
        </div>
      </div>
    )
  }
}

export default RecipeEditor
