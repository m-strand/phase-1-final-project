
document.getElementById("search-albums").addEventListener('mouseover', function(){
    document.querySelector("search-albums").classList.add("green-detail")
});
document.getElementById("search-albums").addEventListener('mouseleave', function(){
    document.querySelector("search-albums").classList.remove("green-detail")
  });

document.getElementById("search-top-tracks").addEventListener('mouseover', function(){
    document.querySelector("search-top-tracks").classList.add("green-detail")
});
  document.getElementById("search-top-tracks").addEventListener('mouseleave', function(){
    document.querySelector("search-top-tracks").classList.remove("green-detail")
  });

  document.querySelector(".logo").addEventListener('mouseover', function(){
    document.querySelector(".logo").classList.add("green-detail")
  });
  document.querySelectorAll(".logo").addEventListener('mouseleave', function(){
    document.querySelector(".logo").classList.remove("green-detail")
});

function searchBarAlbum(query) {
    fetch("https://api.spotify.com/v1/search", {
        q: query,
        type: album,
    })
    .then(resp => resp.json())
    .then(data => data.forEach(album => entryA(album)))
};

function searchBarTracks(query) {
    fetch("https://api.spotify.com/v1/search", {
        q: query,
        type: tracks,
    })
    .then(resp => resp.json())
    .then(data => data.forEach(track => entryT(track)))
};

function searchAlbums () {document.getElementById("search-albums").addEventListener("submit", function (e) {
    //prevent default here
    searchBarAlbum(document.getElementById('query'.value))}, false)
};
function searchTracks () {document.getElementById("search-top-tracks").addEventListener("submit", function (e) {
    //prevent default here
    searchBarTracks(document.getElementById('query'.value))}, false)
};

//NEED to fix object paths for these 2 methods 
function buildAnAlbum(artistAlbum) {
    let entryA = document.createElement("div")
    entryA.className = 'entryA'
    entryA.innerHTML = ` \
    ${album.items}

    <button class="like-btn" id="${artistAlbum.id}">Like </button> \
    `
    entryA.querySelector(".like-btn").addEventListener("click", function() {
        document.getElementsByClassName("like-btn").classList.add("activated-like")
    })

};

{{#each albums.items}}
<div style="background-image:url({{images.0.url}})" data-album-id="{{id}}" class="cover"></div>
{{/each}}


function buildATrack(artistTrack) {
    let entryT = document.createElement("div")
    entryT.className = 'entryT'
    entryT.innerHTML = `\
    ${tracks.items}
    <img style="background-image:url(${})>
    <button class="like-btn" id="${.id}">Like </button> \
    `
    //this is going to active all like buttons!!
    entryT.querySelector(".like-btn").addEventListener("click", function() {
        document.getElementsByClassName("like-btn").classList.add("activated-like")
    })

};