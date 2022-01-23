import { recipes } from "./recipes.js";
import { Card } from "./js/Card.js";

class App {
  constructor() {
    this.recipes = recipes;
    this.displayRecipes = document.querySelector(".section__results--wrappe");
  }

  init() {
    recipes.map((recipe) => {
      const card = new Card(recipe);
      this.displayRecipes.innerHTML += card.display();
    });
    this.searchBar(this.recipes);
    this.filterIngredients(this.recipes);
    this.filterAppliance(this.recipes);
    this.filterUstencils(this.recipes);
  }

  /**
   *
   * @param {Array} recipes tableau des recettes
   */
  searchBar(recipes) {
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
    this.displayRecipes.innerHTML = "";
    this.displayRecipes.innerHTML = `<h3> Aucune recette ne correspond à votre recherche!</h3>`;
  }

  filterIngredients(recipes) {
    const displayIngredients = document.querySelector(".all-ingredients");
    const listIngredients = [];
    recipes.filter((recipe) => {
      recipe.ingredients.map((ingredient) => {
        listIngredients.push(ingredient.ingredient);
      });
    });
    let filterDoublons = listIngredients.filter(
      (item, index, self) => self.indexOf(item) == index
    );
    filterDoublons.forEach((item) => {
      displayIngredients.innerHTML += `<li class="tag" data-tag="${item}"> ${item}</li>`;
    });
    //console.log(listIngredients);
  }

  filterAppliance(recipes) {
    const listAppliance = [];
    const displayAppliance = document.querySelector(".all-appareils");
    recipes.filter((recipe) => {
      listAppliance.push(recipe.appliance);
    });
    let filterDoublons = listAppliance.filter(
      (item, index, self) => self.indexOf(item) == index
    );
    filterDoublons.forEach((item) => {
      displayAppliance.innerHTML += `<li class="tag" data-tag="${item}"> ${item}</li>`;
    });
    console.log(listAppliance);
  }

  filterUstencils(recipes) {
    const displayUstencils = document.querySelector(".all-ustenciles");
    const listUstencils = [];
    recipes.filter((recipe) => {
      recipe.ustensils.forEach((ustensil) => listUstencils.push(ustensil));
    });
    let filterDoublons = listUstencils.filter(
      (item, index, self) => self.indexOf(item) == index
    );
    filterDoublons.forEach((item) => {
      displayUstencils.innerHTML += `<li class="tag" data-tag="${item}"> ${item}</li>`;
    });
    console.log(listUstencils);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const app = new App();
  app.init();
});
