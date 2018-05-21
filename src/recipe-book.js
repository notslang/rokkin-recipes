'use strict'

import {Component} from 'react'
import uuid from 'uuid/v4'
import orderBy from 'lodash.orderby'
import find from 'lodash.find'
import filter from 'lodash.filter'

import {store, load} from './utils'
import FILLER_CONTENT from './filler-content'

// store all the recipes under a single key in localstorage... for simplicitly,
// not performance
const LOCALSTORAGE_KEY = 'rokkin-recipes'

/**
 * Holds a list of Recipes and handles storing them in localstorage
 * @extends Component
 */
class RecipeBook extends Component {
  constructor () {
    super()
    this.onChange = null // function to call when data is updated
    this.recipes = []
    var savedRecipes = load(LOCALSTORAGE_KEY)
    if (savedRecipes === null) {
      // load some filler content so new users don't have an empty application
      for (let recipe of FILLER_CONTENT) {
        let name, servings, description, ingredients, instructions
        ({name, servings, description, ingredients, instructions} = recipe)
        this.addRecipe(name, servings, description, ingredients, instructions)
      }
    } else {
      this.recipes = savedRecipes
    }
  }

  /**
   * Add a new recipe.
   * @param {String} name Human readable name for the recipe. can be edited by
   * users till their heart's content
   * @param {Integer} servings how many servings the recipe makes... not exactly a
   * scientific measurement, but most recipe books use this.
   * @param {String} description
   * @param {Array} ingredients Array of ingredients
   */
  addRecipe (name, servings, description, ingredients, instructions) {
    var newRecipe = {
      // used so URLs don't break when recipe names change. tbh, it makes the
      // urls kinda ugly.
      // TODO: use the original name to create an ID that doesn't change if the
      // name is edited later?
      id: uuid().substr(0, 7),

      // standard UNIX timestamp. we don't need millisecond precision for this
      timeAdded: Math.round(Date.now() / 1000),

      name: name,
      description: description,
      servings: servings,
      ingredients: ingredients,
      instructions: instructions
    }
    this.recipes = orderBy(this.recipes.concat(newRecipe), 'timeAdded', 'desc')
    this.handleChange()
    return newRecipe
  }

  updateRecipe (updatedRecipe) {
    this.recipes = this.recipes.map((recipe) => {
      return updatedRecipe.id === recipe.id ? updatedRecipe : recipe
    })
    this.handleChange()
  }

  newRecipe () {
    return this.addRecipe(
      'Untitled Recipe',
      0,
      'Add description here...',
      [],
      'Add instructions here...'
    )
  }

  getRecipeById (id) {
    return find(this.recipes, {id: id})
  }

  deleteRecipeById (id) {
    // TODO: move this outside of the model. we should be able to call this
    // without a confirm dialog. maybe just switch it to having an undo? that
    // would be nicer.
    if (!window.confirm('Are you sure you want to delete that recipe?')) {
      return
    }

    this.recipes = filter(this.recipes, (r) => (r.id !== id))
    this.handleChange()
  }

  /**
   * Assign a function to be called when the state of the model changes. This
   * is used to tell react to re-render.
   * @param {Function} onChange Function to call
   */
  subscribe (onChange) {
    this.onChange = onChange
  }

  /**
   * Called to handle any change to the data.
   */
  handleChange () {
    store(LOCALSTORAGE_KEY, this.recipes)
    if (this.onChange !== null) this.onChange()
  }
}

export default RecipeBook
