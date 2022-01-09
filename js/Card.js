export class Card {
  /**
   *
   * @param {Object} recipe recipes array
   */
  constructor(recipe) {
    this.recipe = recipe;
  }

  display() {
    const { name, servings, ingredients, time, description } = this.recipe;
    let ingredientsList = ingredients.map((item) => {
      return `<li>${item.ingredient}: <span>${item.ingredient.length} ${item.unit}</span></li>`;
    });

    return ` 
        <article  class="card">
            <div class="card-head">

            </div>
            <div class="card-content">
                <div class="card-content-title">
                    <h2>${name}</h2>
                    <div>
                        <img src="./images/horloge.png" alt="image">
                        <span class="temps"> ${time} </span>
                    </div>
                </div>
                <div class="card-content-description">
                    <ul>
                        ${ingredientsList}
                    </ul>
                    <div class="description">
                        <p>${description}</p>
                    </div>
                </div> 
            </div>
        </article>`;
  }
}
