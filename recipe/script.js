const searchbtn=document.getElementById('search-btn');
const searchform= document.getElementById('input-container');
const searchText=document.getElementById('search-text');
const mealList=document.getElementById('meal');

//Event listener
if(window.location.pathname.endsWith('index.html')){
searchbtn.addEventListener('click', searchRecipes);
mealList.addEventListener('click', getRecipe);
searchText.addEventListener("keypress", function(e){
    if (e.key==="Enter"){
        e.preventDefault();
        searchbtn.click();
    }
})
}
//Function that search the Recipes with the input
function searchRecipes(){
    let searchIn= document.getElementById('search-text').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchIn}`)
    .then(res => res.json())
    .then(data => {
        let html=`<h3>Search Results</h3>`;
        if(data.meals){
            data.meals.forEach(meal => {
               html+=`
                   <h2>${meal.strMeal}</h2>
                   <div class="meal-result" data-id= "${meal.idMeal}">
                   
                   <div class="meal-img">
                           <img src="${meal.strMealThumb}" alt="image food results">
                       </div>
                       <div class="meal-name">                  
                        <a href="Instructions.html" target="blank" class="recipe-btn">
                            Get Recipe </a>
                           </div>
                   </div>
                   <hr>
               `;
            });

        } else{
            html+=`<h4>Sorry " ${searchIn} " is in no recipe.</h4>`;
                }          
        mealList.innerHTML= html;
    });
}


function getRecipe(e){
    e.preventDefault();
    if(e.target.classList.contains('recipe-btn')){
        let recipeTarget = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeTarget.dataset.id}`)
        .then(res =>res.json())
        .then(data=>{
            let currentRecipe=data.meals[0];
            let instructions=currentRecipe.strInstructions;
            instructions=display(instructions);
            let html=`<h2>${currentRecipe.strMeal}</h2>
            <div class="meal-instruction">
            <div class="meal-img">
                <img src="${currentRecipe.strMealThumb}" alt="recipe img">
            </div>
            <h2>Instructions</h2>
                <p>${instructions}</p>
            <div class="meal-link">
                <a href="${currentRecipe.strYoutube}" target="blank">
                    YouTube
                    </a>
            </div>

        </div>
     
    `;
    localStorage.setItem('html', html);
    console.log(localStorage.getItem('html'));
    location.href="Instructions.html";

        });
        }
   
}

function display(str){
    var finalStr=str;
    let i=0;
    while ( i < str.length){
        if (str[i]==="-"){
            str[i]="<br>";
            console.log(str[i]);
        }
        else{
            str[i]=str[i];
        }
        finalStr=str;
        i++;
    }
    console.log(finalStr);
    return finalStr;
}