const images = document.querySelectorAll(".meal-description-container");
const urlApi = 'https://www.themealdb.com/api/json/v1/1/categories.php';

fetch(urlApi)
.then((response)=> response.json()) 
.then ((data) => {
       const recetas = data.categories; 
       const titleRecipe = data.categories
        .map(meal => {
            return `
            <div class='meal-description-container'>
            <p class='meal-title'> ${meal.strCategory}</p>
             <div class='meal-description'><img class='img-meal' src='${meal.strCategoryThumb} '
              alt='${meal.strCategory}' /><p class='text-meal-description'>${meal.strCategoryDescription}</p></div>
         </div> ` 
       })
       .join("");

       const container = document.querySelector('.title');
       container.insertAdjacentHTML('afterend', titleRecipe);  

       const containerToObserver = document.querySelectorAll('.meal-description-container');
       const observerConfig = {
          root: null,
        rootMargin: '0px',
          threshold: 0.05
          };
        
          let observer = new IntersectionObserver(beTouching, observerConfig);
          
          containerToObserver.forEach( entity => {
            observer.observe(entity)
                        
          });

          function beTouching(entries, ob){
            entries.forEach(entry => {
           
              if( entry.isIntersecting ){
                console.log(entry.target)
                entry.target.classList.add('active')
                  } else {
                    entry.target.classList.remove('active')
                  }
            })
       }

      }).catch(error => {
  alert('ocurrio un error')
})