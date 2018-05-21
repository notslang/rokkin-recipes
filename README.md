# ![RokkinRecipes](https://raw.githubusercontent.com/slang800/rokkin-recipes/master/src/logo.png)

A recipe book themed coding challenge for RokkinCat's internship interview. This is built with React.js and Webpack. Also, I decided to try out react-router for handling the history API.

## Design process

### Data model

I started out with designing the data model for an individual recipe, based on the requirements from the coding challenge. That data model looks something like this:

```js
{
  // a unique id for the recipe, useful as a React key, doesn't change ever
  id: "abcd123",

  // human readable recipe name (title)
  name: "Recipe Name",

  // like 1 paragraph that says what the recipe is in more detail
  description: "A long description for the recipe...",

  // how many servings the recipe makes
  servings: 4,

  // collection of ingredient objects
  ingredients: [
    {
      // a unique id for the ingredient, also useful as a React key
      id: "4123abc"

      // human readable ingredient name
      name: "tomato, broccoli, something like that",

      // honestly, this could just be a part of the name
      quantity: "1 cup"
    },
    {
      // ... more ingredients ...
    }
  ],

  // free form text describing how to prepare the recipe. this could have been
  // an array of steps, but I've read enough cooking blogs to know that authors
  // never stick to a nice rigid format when writing.
  instructions: "A few paragraphs about how to prepare the recipe..."
}
```

And then I worked on designing the UI that I wanted...

### UI concept

![UI whiteboard design](https://i.imgur.com/mIo2S6d.jpg)

On a mobile version of this, the left-side panel (which holds the list of recipes) would disappear behind a hamburger menu to give more horizontal screen space. However, I'm pressed for time, so mobile isn't a priority.

The edit mode should look about the same as the regular recipe viewer, so it's easy to tell what changes map to, between the modes.

I could just make the editing mode and the viewing mode into the same thing and remove the need for a button to switch between the two. However, in a real recipe book you'd be viewing recipes at least 90% of the time, and in that case having editor controls around would be annoying.

So, I think it makes sense to hide the editor behind a button. Except in the case where you've just pressed the "new recipe" button - that should bring up an editor right away because the user intention is clear.

### Logo concept

Credit to @sabrinastangler for help with the logo design.

![logo design](https://i.imgur.com/vNkcD1y.jpg)
