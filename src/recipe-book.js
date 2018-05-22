'use strict'

import {Component} from 'react'
import uuid from 'uuid/v4'
import orderBy from 'lodash.orderby'
import find from 'lodash.find'
import findIndex from 'lodash.findindex'
import filter from 'lodash.filter'
import clone from 'lodash.clone'

import {store, load} from './utils'
import FILLER_CONTENT from './filler-content'

// store all the recipes under a single key in localstorage... for simplicitly,
// not performance
const LOCALSTORAGE_KEY = 'rokkin-recipes-v2'

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
      ingredients: [],
      instructions: instructions
    }

    this.recipes = orderBy(this.recipes.concat(newRecipe), 'timeAdded', 'desc')

    // use the addIngredient function so the ids are generated... reduce the
    // size of filler-content.json
    ingredients.map(this.addIngredient.bind(this, newRecipe.id))

    this.handleChange()
    return newRecipe
  }

  updateRecipe (updatedRecipe) {
    this.recipes = this.recipes.map((recipe) => (
      updatedRecipe.id === recipe.id ? updatedRecipe : recipe
    ))
    this.handleChange()
  }

  newRecipe () {
    var newRecipe = this.addRecipe(
      'Untitled Recipe',
      1,
      'Add description here...',
      ['1 cup first ingredient'],
      'Add instructions here...\n\n1. The first step in my recipe\n2. The second step in my recipe\n'
    )
    return newRecipe
  }

  getRecipeById (id) {
    return find(this.recipes, {id: id})
  }

  deleteRecipeById (id) {
    this.recipes = filter(this.recipes, (r) => (r.id !== id))
    this.handleChange()
  }

  addIngredient (id, ingredientName) {
    // addressing ingredients by an id makes it easy to use react keys
    var ingredient = {
      id: uuid().substr(0, 7),
      name: ingredientName
    }

    this.recipes = this.recipes.map((recipe) => {
      if (id !== recipe.id) {
        return recipe
      }
      var newRecipe = clone(recipe)
      newRecipe.ingredients = recipe.ingredients.concat(ingredient)
      return newRecipe
    })
    this.handleChange()
  }

  updateIngredient (id, updatedIngredient) {
    this.recipes = this.recipes.map((recipe) => {
      if (id !== recipe.id) {
        return recipe
      }
      var newRecipe = clone(recipe)
      newRecipe.ingredients = recipe.ingredients.map((ingredient) => (
        updatedIngredient.id === ingredient.id ? updatedIngredient : ingredient
      ))
      return newRecipe
    })
    this.handleChange()
  }

  deleteIngredient (id, ingredientId) {
    this.recipes = this.recipes.map((recipe) => {
      if (id !== recipe.id) {
        return recipe
      }
      var newRecipe = clone(recipe)
      newRecipe.ingredients = filter(
        recipe.ingredients,
        (ingredient) => (ingredient.id !== ingredientId)
      )
      return newRecipe
    })
    this.handleChange()
  }

  /**
   * Find the next recipe id in the list, ordered in reverse-chronological order
   * according to the time they were created. If there is no next then return
   * null.
   * @param {String} id Recipe id
   * @return {String} The next recipe id
   */
  getNextRecipeIdInList (id) {
    const index = findIndex(this.recipes, {id: id})
    if (index === -1 || index === this.recipes.length - 1) {
      return null
    }
    return this.recipes[index + 1].id
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
