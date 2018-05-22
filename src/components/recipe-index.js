'use strict'
import React, {Component} from 'react'
import {NavLink, Link} from 'react-router-dom'
import {withRouter} from 'react-router'
import TimeAgo from 'react-timeago'
import Button from '@material-ui/core/Button'

class RecipeIndex extends Component {
  getActiveRecipe () {
    // TODO: there really should be a cleaner way of getting route parameters,
    // but `this.props.match.params.id` isn't it
    var {location} = this.props
    if (location.pathname === '/') {
      return null
    } else {
      return location.pathname.replace(/^\/(?:edit\/)?/, '')
    }
  }

  handleNew () {
    var recipe = this.props.model.newRecipe()

    // once a new recipe is made, the user probably wants to edit it
    this.props.history.push('/edit/' + recipe.id)
  }

  handleDelete (id) {
    // TODO: maybe just switch it to having an undo? that would be nicer
    if (!window.confirm('Are you sure you want to delete that recipe?')) {
      return
    }

    var {model} = this.props

    // we don't want to go to a 404 page, so get the id of the next recipe to
    // redirect to
    const nextRecipeId = model.getNextRecipeIdInList(id)

    model.deleteRecipeById(id)

    // no need for redirect logic if we're not on the recipe being deleted
    if (id !== this.getActiveRecipe()) return

    var redirect
    if (nextRecipeId === null) {
      if (model.recipes.length === 0) {
        // we've deleted the only recipe, go home
        redirect = '/'
      } else {
        // we've deleted the last recipe in the list, go to the new last recipe
        redirect = '/' + model.recipes[model.recipes.length - 1].id
      }
    } else {
      redirect = '/' + nextRecipeId
    }
    this.props.history.push(redirect)
  }

  render () {
    var {model} = this.props

    // NOTE: these are already sorted by time added
    var recipes = model.recipes.map((recipe) => (
      <li className='recipe-link' key={recipe.id}>
        <NavLink to={'/' + recipe.id} className={recipe.id === this.getActiveRecipe() ? 'active' : null}>
          <span className='recipe-name'>
            {recipe.name} <TimeAgo date={recipe.timeAdded * 1000 - 600} />
          </span>
        </NavLink>
        <button className='delete' onClick={this.handleDelete.bind(this, recipe.id)}>
          delete
        </button>
      </li>
    ), this)

    return (
      <ul id='recipe-index'>
        <li id='logo'><Link to='/' /></li>
        <li>
          <Button id='new-recipe' onClick={this.handleNew.bind(this)}>
            new recipe
          </Button>
        </li>
        {recipes}
      </ul>
    )
  }
}

export default withRouter(RecipeIndex)
