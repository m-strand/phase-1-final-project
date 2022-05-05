document.getElementById("search-volumes").addEventListener('mouseover', function(){
    document.querySelector("#search-volumes").classList.add("green-detail")
});
document.getElementById("search-volumes").addEventListener('mouseleave', function(){
    document.querySelector("#search-volumes").classList.remove("green-detail")
  });

  document.querySelector(".logo").addEventListener('mouseover', function(){
    document.querySelector(".logo").classList.add("green-detail")
  });
  document.querySelector(".logo").addEventListener('mouseleave', function(){
    document.querySelector(".logo").classList.remove("green-detail")
});

document.getElementById("enter-book").addEventListener("submit", function (e) {
    e.preventDefault();
    searchBarVolumes();
});

function searchBarVolumes(bookObj) {
    const api_key = 'AIzaSyAoZtsGR24X-AFD4yQsP16EwN-yfdG-oTI';
    let query = document.getElementById('query').value;
    const results = document.querySelector(".results");
    results.innerHTML = ""
    if(!query) {
        let noResults = document.createElement("div")
        noResults.className = 'noResults'
        noResults.innerHTML =  "No Results Found"
        document.querySelector(".results").appendChild(noResults);
    }
    else {
        fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=${api_key}`, {
            headers: {
             Accept: 'application/json',
            }
        }) 
    .then(response => response.json())
    .then(data => data.items.forEach(function(item) {buildABook(item)}));
}
};

function buildABook(volume) {
    let entryB = document.createElement("div")
    entryB.className = 'entryB'
    entryB.innerHTML =  `
    <h4>Title: ${volume["volumeInfo"]["title"]}</h4> 
    <p>Author: ${volume["volumeInfo"]["authors"]}</p>
    <p>Publisher: ${volume["volumeInfo"]["publisher"]}</p>
    <p>Date Published: ${volume["volumeInfo"]["publishedDate"]}</p>
    <p id='description'>${volume["volumeInfo"]["description"]}</p>
    <button class="like-btn" id="${volume["id"]}">Like</button>
    `
    document.querySelector(".results").appendChild(entryB);
    document.getElementById(`${volume["id"]}`).addEventListener("click", function() {
        document.getElementById(`${volume["id"]}`).classList.toggle("activated-like")
        if (document.getElementById(`${volume["id"]}`).classList.contains("activated-like"))
        document.getElementById(`${volume["id"]}`).innerHTML = "Liked";
        else {
            document.getElementById(`${volume["id"]}`).innerHTML = "Like"; 
        }
    })
    document.getElementById(`${volume["id"]}`).addEventListener('mouseover', function(){
        document.getElementById(`${volume["id"]}`).classList.add("green-detail")
      });
    
    document.getElementById(`${volume["id"]}`).addEventListener('mouseleave', function(){
        document.getElementById(`${volume["id"]}`).classList.remove("green-detail")
    }); 
    
}
