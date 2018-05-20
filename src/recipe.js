'use strict'
import React, {Component} from 'react'

class Recipe extends Component {
  constructor (props) {
    super(props)
    this.state = this.props.data
  }

  render () {
    var ingredients = this.state.ingredients.map((ingredient, i) => (
      <li key={i}>{ingredient.name}</li>
    ))
    var instructions = this.state.instructions.split('\n').map((step, i) => (
      <p key={i}>{step}</p>
    ))
    return (
      <div className='recipe'>
        <h1>{this.state.name}</h1>
        <ul>
          <li>id: {this.state.id}</li>
          <li>description: {this.state.description}</li>
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
