import { recipes } from "./recipes.js";
import { Card } from "./js/Card.js";

class App {
  constructor() {
    this.recipes = recipes;
    this.displayRecipes = document.querySelector(".section__results--wrappe");
  }

  init() {
    this.searchBar(this.recipes);
  }

  /**
   *
   * @param {Array} recipes tableau des recettes
   */
  searchBar(recipes) {
    recipes.map((recipe) => {
      const card = new Card(recipe);
      this.displayRecipes.innerHTML += card.display();
    });
    const searchBar = document.querySelector(".search-bar");
    searchBar.addEventListener("keyup", () => {
      const value = searchBar.value;
      if (value.length >= 3) {
        //console.log(true);
        const filterRecipes = recipes.filter((recipe) => {
          const description = recipe.description.includes(value);
          const ingredients = recipe.ingredients.map((ingredient) =>
            ingredient.ingredient.includes(value)
          );
          const title = recipe.name.includes(value);
          return description, ingredients, title;
        });
        if (filterRecipes.length >= 1) {
          this.displayRecipes.innerHTML = "";
          filterRecipes.map((recipe) => {
            const card = new Card(recipe);
            this.displayRecipes.innerHTML += card.display();
          });
        } else this.dontMatch();

        console.log(filterRecipes);
      } else {
        recipes.map((recipe) => {
          const card = new Card(recipe);
          this.displayRecipes.innerHTML += card.display();
        });
      }
    });
  }

  dontMatch() {
    this.displayRecipes.innerHTML = `<h3> Aucune recette ne correspond à votre recherche!</h3>`;
  }

  /*   filterIngredients() {
    const listIngredients = [];
    this.recipes.filter((recipe) => {
      recipe.ingredients.map((ingredient) => {
        listIngredients.push(ingredient.ingredient);
      });
    });

    console.log(listIngredients);
  }

  filterAppareils() {
    const listAppliance = [];
    this.recipes.filter((recipe) => {
      listAppliance.push(recipe.appliance);
    });
    console.log(listAppliance);
  }

  filterUstencils() {
    const listUstencils = [];
    this.recipes.filter((recipe) => {
      recipe.ustensils.forEach((ustensil) => listUstencils.push(ustensil));
    });
    console.log(listUstencils);
  } */
}

document.addEventListener("DOMContentLoaded", () => {
  const app = new App();
  app.init();
});
