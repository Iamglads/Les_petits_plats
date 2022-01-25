import { recipes } from "./recipes.js";
import { Card } from "./js/Card.js";

class App {
  constructor() {
    this.recipes = recipes;
    this.displayRecipes = document.querySelector(".section__results--wrappe");
  }

  init() {
    this.display(this.recipes);
    this.searchBar(this.recipes);

    // filtre all appliances
    this.filterMethod(
      this.recipes,
      [],
      document.querySelector(".all-appareils"),
      "appliance"
    );
    // filtre all ustensils
    this.filterMethod(
      this.recipes,
      [],
      document.querySelector(".all-ustenciles"),
      "ustensils"
    );
    // filtre all ingredients
    this.filterMethod(
      this.recipes,
      [],
      document.querySelector(".all-ingredients"),
      "ingredients",
      "ingredient"
    );
  }

  /**
   *
   * @param {Array} arr
   * Display recipes in interface
   */
  display(arr) {
    arr.map((item) => {
      const card = new Card(item);
      this.displayRecipes.innerHTML += card.display();
    });
  }

  /**
   *
   * @param {Array} recipes
   */
  searchBar(recipes) {
    const searchBar = document.querySelector(".search-bar");
    searchBar.addEventListener("keyup", () => {
      const value = searchBar.value;
      if (value.length >= 3) {
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
          this.display(filterRecipes);
        } else this.dontMatch();
      } else {
        this.display(recipes);
      }
    });
  }

  dontMatch() {
    this.displayRecipes.innerHTML = "";
    this.displayRecipes.innerHTML = `<h3> Aucune recette ne correspond à votre critère...! <br> Vous pouvez chercher "Tarte aux pommes", "poisson", etc.</h3>`;
  }

  /**
   *
   * @param {Array} arr
   */
  displayTags(arr, returnHtml) {
    arr.forEach((item) => {
      returnHtml.innerHTML += `<li class="tag" data-tag="${item}"> ${item}</li>`;
    });
  }
  /**
   *
   * @param {Array} arr array of recipes
   * @param {Array} emptyArr empty array
   * @param {Sring} returnHtml
   * @param {*} el
   * @param {*} elTwo
   */
  filterMethod(arr, emptyArr, returnHtml, el, elTwo) {
    arr.filter((items) => {
      if (el == "ingredients") {
        items[el].map((item) => emptyArr.push(item[elTwo]));
      } else if (el == "appliance") {
        emptyArr.push(items[el]);
      } else if (el == "ustensils") {
        items[el].forEach((item) => emptyArr.push(item));
      }
    });

    let filterDoubles = new Set(emptyArr);
    let objectToArray = Array.from(filterDoubles);
    this.displayTags(objectToArray, returnHtml);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const app = new App();
  app.init();
});
