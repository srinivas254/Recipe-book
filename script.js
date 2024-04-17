let button = document.querySelector('#add-recipe');
let nameInput = document.querySelector('#recipe-name');
let ingrInput = document.querySelector('#recipe-ingredients');
let methodInput = document.querySelector('#recipe-method');

let recipeList = document.querySelector('#recipe-list');
const noRecipes = document.getElementById('no-recipes');

let recipes = [];

button.addEventListener('click', () => {
    let names = nameInput.value.trim();
    let ingredients = ingrInput.value.trim().split(',');
    let methods = methodInput.value.trim();

    if (names.length && ingredients.length && methods.length > 0) {
        const newRecipe = { names, ingredients, methods };
        recipes.push(newRecipe);
    }
});


button.addEventListener('click', () => {
    nameInput.value = '';
    ingrInput.value = '';
    methodInput.value = '';
});

button.addEventListener('click', () => {
    displayRecipes();
    noRecipes.style.display = recipes.length > 0 ? 'none' : 'flex';
});

function displayRecipes() {
    recipeList.innerHTML = '';
    recipes.forEach((recipe, index) => {
        const recipeDiv = document.createElement('div');
        recipeDiv.innerHTML = `
    <h3>${recipe.names}</h3>
    <p><strong>Ingredients:</strong></p>
    <ul>
      ${recipe.ingredients.map(ingr => `<li>${ingr}</li>`).join('')}
    </ul>
    <p><strong>Method:</strong></p>
    <p>${recipe.methods}</p>
    <button class="delete-button" data-index="${index}">Delete</button>`;
        recipeDiv.classList.add('recipe');
        recipeList.appendChild(recipeDiv);
    });
}

recipeList.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-button')) {
        console.log('Delete was clicked');
        let index = event.target.dataset.index;
        recipes.splice(index, 1);
        searchBox.value = '';
        displayRecipes();
    }
});

const searchBox = document.getElementById('search-box');

function search(query) {
    const filteredRecipes = recipes.filter(recipe => {
        return recipe.names.toLowerCase().includes(query.toLowerCase());
    });
    recipeList.innerHTML = '';

    filteredRecipes.forEach(recipe => {
        const recipeEl = document.createElement('div');
        recipeEl.innerHTML = `
  <h3>${recipe.names}</h3>
  <p><strong>Ingredients:</strong></p>
  <ul>
    ${recipe.ingredients.map(ingr => `<li>${ingr}</li>`).join('')}
  </ul>
  <p><strong>Method:</strong></p>
  <p>${recipe.methods}</p>
  <button class="delete-button" data-index="${recipes.indexOf(recipe)}">
    Delete
  </button>`;
        recipeEl.classList.add('recipe');
        recipeList.appendChild(recipeEl);
    });
}

searchBox.addEventListener('input', event => search(event.target.value));
