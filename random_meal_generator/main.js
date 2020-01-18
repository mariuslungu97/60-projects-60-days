const btnRecipe = document.getElementById('btnGetRecipe');
const container = document.querySelector('.container');


let state = {
    photo : null,
    video : null,
    ingredients : [],
    meta : null,
    title : null,
    description : null
};

(function(state) {

    function getRecipe(e) {
        
        e.preventDefault();
        //get recipe
        fetch('https://www.themealdb.com/api/json/v1/1/random.php')
            .then(res => res.json())
            .then(data => {

                let meal, photo, meta, video, title, description, ingredients;

                meal = data.meals[0];

                meta = {
                    category : meal.strCategory ? meal.strCategory : '', 
                    tags : meal.strTags ? meal.strTags : '', 
                    area : meal.strArea ? meal.strArea : ''
                };

                photo = meal.strMealThumb ? meal.strMealThumb : '';
                video = meal.strYoutube ? `https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}` : '';
                
                title = meal.strMeal ? meal.strMeal : '';
                description = meal.strInstructions ? meal.strInstructions : '';
                
                ingredients = [];

                for(let i = 1; i <= 10; i++) {
                    let idIngredient = 'strIngredient' + i;
                    let idMeasure = 'strMeasure' + i;

                    if(meal[idIngredient] && meal[idIngredient].length > 0) {
                        let recipeName, recipeMeasure;
                        
                        recipeName = meal[idIngredient];
                        
                        if(meal[idMeasure] && meal[idMeasure].length > 0) recipeMeasure = meal[idMeasure];

                        if(recipeName && recipeMeasure) ingredients.push([recipeName, recipeMeasure]);
                        else if(recipeName) ingredients.push([recipeName, '']);
                    }
                };

                state = {...state, meta, photo, video, title, description, ingredients};

            })
            .then(() => {
                //remove past recipe
                const recipeEl = document.querySelector('.recipe');
                if(recipeEl) recipeEl.parentNode.removeChild(recipeEl);
                else {
                    container.classList.replace('container-child', 'container-children');
                }
                //add recipe render
                container.insertAdjacentHTML('beforeend', `
                <div class="recipe u-margin-2">
                    <div class="recipe__meta u-margin-2">
                        <div class="recipe__meta--item u-margin-1"><span class="bold">Category</span> : ${state.meta.category}</div>
                        <div class="recipe__meta--item u-margin-1"><span class="bold">Area</span> : ${state.meta.area}</div>
                        <div class="recipe__meta--item u-margin-1"><span class="bold">Tags</span> : ${state.meta.tags}</div>
                    </div>
                    <div class="recipe__main u-margin-2">
                        <div class="recipe__main--img">
                            <img src=${state.photo} alt="Meal Photo">
                        </div>
                        <div class="recipe__main--text">
                            <h2 class="recipe__main--title u-margin-1">${state.title}</h2>
                            <p class="recipe__main--instructions">${state.description}</p>
                        </div>
                    </div>
                    <div class="recipe__ingredients u-margin-2">    
                        <span class="bold highlight">Ingredients:</span>
            
                        <ul class="recipe__ingredients--list u-margin-1">
                            ${state.ingredients.map(el => `<li class="recipe__ingredients--item"> ${el[0]} : ${el[1]} </li>`).join('')}
                        </ul>
                    </div>
                    <div class="recipe__video u-margin-2">
                        <span class="bold highlight">Video Recipe:</span>
            
                        <div class="recipe__video--frame u-margin-1">
                            <iframe width="1024" height="768" src=${state.video}>
                            </iframe>
                        </div>
                    </div>
                </div>
                `);
            });
    };

    btnRecipe.addEventListener('click', getRecipe);

})(state);

