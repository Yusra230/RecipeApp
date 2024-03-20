const url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

async function fetchApi(query) {
    const loader = document.querySelector('.loader');
    loader.innerHTML = `<div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>`;
    loader.style.display = "block";
    const response = await fetch(url + query);
    const data = await response.json();
    console.log(data);
    loader.innerHTML="";
    showData(data.meals);
}


let input = document.querySelector("input");
let searchButton = document.querySelector(".search-btn");
searchButton.addEventListener("click", () => {
    let inputValue = input.value;
    fetchApi(inputValue);
})

function showData(meals) {
    let dishImg = document.querySelector(".dish-img");
    let dishName = document.querySelector(".dish-name");
    let dishType = document.querySelector(".dish-type");
    let ingredientsPara = document.querySelector('.ingredients-para');
    let recipe = document.querySelector('.recipe');
    let viewRecipeBtn = document.querySelector('.view-recipe');
    let closeBtn = document.querySelector('.btn-close');
    let ingredientCont = document.querySelector('.ingredients-container');
    let recipeCont = document.querySelector('.recipe-container');
    let recipeVideo = document.querySelector('.video');

    let ingredientsParaClone = "";
    ingredientsPara.innerHTML = "";
    let mealRecipe = "";

    if (meals == null) {
        alert('invalid input');
        return;
    }

    else {
        let myMeal = meals[0];
        dishImg.src = myMeal.strMealThumb;
        document.body.style.backgroundImage = `url(${myMeal.strMealThumb})`;
        document.body.classList.add('low-brightness');

        dishName.innerHTML = `<h1 class="dish-name">${myMeal.strMeal}</h1>`;
        dishType.innerHTML = `<h3 class="dish-type">${myMeal.strCategory}</h3>`;
        document.querySelector('.img-box').style.display = "block";
        document.querySelector('.ingredients-box').style.display = "block";
        mealRecipe = myMeal.strInstructions;

        let count = 1;
        let ingredients = [];
        for (let i in myMeal) {
            let ingredient = "";
            let measure = "";
            if (i.startsWith("strIngredient") && myMeal[i]) {
                ingredient = myMeal[i];
                measure = myMeal[`strMeasure` + count];
                count += 1;
                ingredients.push(`${measure} ${ingredient}`);
            }
        }
        ingredients.forEach((ingredient) => {
            ingredientsParaClone += `<p class="ingredients-para text-center">●  ${ingredient}</p>`
        })

        ingredientsPara.innerHTML = ingredientsParaClone;

        viewRecipeBtn.addEventListener("click", () => {
            recipe.innerText = mealRecipe;
            let YoutubeLink = myMeal.strYoutube;
            let videoId = extractVideoId(YoutubeLink);
            recipeVideo.innerHTML = `<h2 class="recipe-video-heading "> Recipe Video </h2> <iframe width="660" height="320" src="https://www.youtube.com/embed/${videoId}" title="YouTube video player" frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen></iframe>`;
            ingredientCont.style.display = "none";
            recipeCont.style.display = "block";
            recipeVideo.style.display = "flex";
            scrollTo(top);

        })

        closeBtn.addEventListener("click", () => {
            recipeCont.style.display = "none";
            recipeVideo.style.display = "none";
            ingredientCont.style.display = "block";
        })


    }

}

function extractVideoId(videoLink) {
    const regex = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/;
    const match = videoLink.match(regex);

    if (match && match[1]) {
        return match[1];
    } else {
        return null; // Return null if no match found
    }
}


