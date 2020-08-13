let numberOfItems = document.querySelector("#number"),
    item = document.querySelector("#item"),
    button = document.querySelector("#button"),
    img = document.querySelector("#avatar"),
    title = document.querySelector("#title"),
    list = document.querySelector("#title"),
    output = document.querySelector("#output");

let sendRequest = (e) =>{
  e.preventDefault();
  fetch(`https://api.edamam.com/search?q=${item.value}&app_id=ab03e59f&app_key=ee25054ec0bc66476b72524b38f37e4e&from=0&to=${numberOfItems.value}`)
  .then(res=>{
    if(!res.ok){
      throw Error("Please Make sure there are values in the form");
    }
    return res.json();
  })
  .then(data=>{
    let outputData = ``;
    data.hits.forEach(val=>{
      // the rendered card
      outputData += `
        <div class="row row-cols-1 row-cols-md-2">
          <div class="col mb-4">
            <div class="card">
              <img src="${val.recipe.image}" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">Recipie for ${val.recipe.label}</h5>
                <p class="card-text">
                  <h6>Ingredients</h6>
                  <ul>
                    ${
                      val.recipe.ingredientLines.map(val => `<li>${val}</li>`).join('')
                    }
                  <ul>
                </p>
              </div>
            </div>
          </div>
        </div>
      `
    })
    output.innerHTML = outputData;
  })
  .catch(err => alert(err));
}

button.addEventListener("click", sendRequest);

