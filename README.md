# recipe_planner

## Website Functions Summarized:
- Quiz: User takes the quiz & is presented with a recipe based on his/her quiz choices. On the results page of the quiz, there is a 'favorite' button that directs the user to the 'favorites' page to save the recipe.
- All Recipes: User can freely browse recipes without taking the quiz.
- Nearby Grocery: User enters zip code to find nearby grocery stores.
- Your Favorites: Most recent quiz result is displayed. User enters a username (if it's their first time using the website), and can save their latest quiz result to their username. Clicking a username displays all saved recipes under that username. Clicking 'Save Recipe' next to a username saves the latest quiz result to that username.

## APIs/Libraries/Additional Things used:
- Edamame: A recipe API. It allows recipes to be searched based on health, diet, calorie range, cooking time, etc. Returns each recipe as an object with properties ingredients, calories, image, url, label, etc.
    Documentation here: [Edamame API Documenation](https://developer.edamam.com/edamam-docs-recipe-api)
- Google Maps: Maps API.
    Documentation here: [Google Maps API Documentation](https://developers.google.com/maps/documentation/)
- Firebase: Used as the realtime database to saved recipes and associated usernames.
- Bootstrap: Used Bootstrap for styling of the html. We then modified the Bootstrap elements with custom css.
- jQuery: Used jQuery libraries in our Javascript.
- Ajax: Used Ajax for interacting with the APIs.


# Website Functions Detailed:

## Quiz
