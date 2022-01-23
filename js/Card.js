export class Card {
  /**
   *
   * @param {Object} recipe recipes array
   */
  constructor(recipe) {
    this.recipe = recipe;
  }

  display() {
    const { name, ingredients, time, description } = this.recipe;
    let ingredientsList = ingredients
      .map((item, index) => {
        return `<li>${item.ingredient}: <span>${item.ingredient.length} ${item.unit}</span></li>`;
      })
      .join("");

    return ` 
        <article  class="card">
            <div class="card-head">

            </div>
            <div class="card-content">
                <div class="title">
                    <h2>${name}</h2>
                    <div>
                        <img src="./images/horloge.png" alt="image">
                        <span class="temps"> ${time} </span>
                    </div>
                </div>
                <div class="content-description">
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
