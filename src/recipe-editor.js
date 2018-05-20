'use strict'
import React, {Component} from 'react'
import cloneDeep from 'lodash.clonedeep'
import {Link} from 'react-router-dom'

class RecipeEditor extends Component {
  handleChange (property, event) {
    var {model, recipe} = this.props
    var newRecipe = cloneDeep(recipe)
    newRecipe[property] = event.target.value
    model.updateRecipe(newRecipe)
  }

  render () {
    var {recipe} = this.props
    return (
      <div className='recipe'>
        <Link to={'/edit/' + recipe.id}>edit</Link>
        <form className='recipe-editor'>
          <label>
            Name:
            <input type='text' value={recipe.name} onChange={this.handleChange.bind(this, 'name')} />
          </label>
          <label htmlFor='description'>Description:</label>
          <textarea id='description' value={recipe.description} onChange={this.handleChange.bind(this, 'description')} />
          <label htmlFor='ingredients'>Ingredients:</label>
          <label htmlFor='instructions'>Instructions:</label>
          <textarea id='instructions' value={recipe.instructions} onChange={this.handleChange.bind(this, 'instructions')} />
        </form>
      </div>
    )
  }
}

export default RecipeEditor
