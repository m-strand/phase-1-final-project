const books = document.querySelectorAll(".book");

books.forEach((bookCard) => {
  bookCard.addEventListener('mouseover', () => {
    bookCard.classList.add("book-hover");
  });
});

books.forEach((book) => {
  book.addEventListener('mouseleave', () => {
    book.classList.remove("book-hover");
  });
});
 

const buttons = document.querySelectorAll('.btn');

buttons.forEach((btn) => {
  btn.addEventListener('mouseover', () => {
    btn.classList.add("button-hover");
  });
});

 buttons.forEach((button) => {
   button.addEventListener('mouseleave', () => {
     button.classList.remove("button-hover");
   });
 });

document.querySelector("#wishlist").addEventListener('click', () => {
    const popup = document.getElementById("wishlist-pop-up");
      if (popup.style.visibility === "hidden") {
          popup.style.visibility = "visible";
      } 
      else {
          popup.style.visibility = "hidden";
      }
});

document.querySelector("#exit-list").addEventListener('click', () => {
       const popup = document.getElementById("wishlist-pop-up");
      popup.style.visibility = "hidden";
});

document.querySelector("#sortBtn").addEventListener('click', () => {
    const popup = document.getElementById("sortby");
      if (popup.style.visibility === "hidden") {
          popup.style.visibility = "visible";
      } 
      else {
          popup.style.visibility = "hidden";
      }
});

const addBtn = document.querySelectorAll('.addBtn');
addBtn.forEach((add) => {
    add.addEventListener('click', () => {
        if (add.innerHTML == 'add_circle_outline') {
          add.innerHTML = 'done';
        }
        else {
          add.innerHTML = 'add_circle_outline';
        }
  });
});




//OLD CODE I NEED TO REVIEW

document.getElementById("enter-book").addEventListener("submit", function (e) {
    e.preventDefault();
    searchBarVolumes();
});

function searchBarVolumes() {
    const api_key =  '';
    let query = document.getElementById('query').value;
    const results = document.querySelector(".results");
    results.innerHTML = ""
    if(!query) {
        let noResults = document.createElement("div")
        noResults.className = 'noResults'
        noResults.innerHTML =  "No Results Found"
        document.querySelector(".search-section").appendChild(noResults);
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
    let book = document.createElement('div');
    book.classList.add('book');
    document.appendChild(book);

    const para = document.createElement("p");
    const textNode = document.createTextNode("Hello World");
    para.appendChild(textNode);

    let addButton = book.createElement('button');
    addButton.classList.add('add');
    addButton.id(`${volume["id"]}`);
    book.appendChild(addButton);

    let addIcon = addButton.createElement('i');
    addIcon.classList.add('material-icons');
    addIcon.classList.add('addBtn');
    addButton.appendChild(addIcon.createTextNode("add_circle_outline"));

    let title = book.createElement('h3');
    book.appendChild(title.createTextNode(`${volume["volumeInfo"]["title"]}`));

    let author = book.createElement('p');
    //add span!!!
    book.appendChild(author.createTextNode(`${volume["volumeInfo"]["authors"]}`));

    let publisher = book.createElement('p');
    //add span!!!
    book.appendChild(publisher.createTextNode(`${volume["volumeInfo"]["publisher"]}`));

    let description = book.createElement('p');
    description.classList.add('description');
    book.appendChild(description.createTextNode(`${volume["volumeInfo"]["description"]}`));

    entryB.innerHTML =  `
    <div class='book'>
      <button class="add" id="${id}">
        <i class="material-icons addBtn">add_circle_outline</i>
      </button>
      <h3>The Poppy War</h3> 
      <p><span class="info">Author</span> R. F. Kuang</p>
      <p><span class="info">Publisher</span> Harper Voyager</p>
      <p><span class="info">Date Published</span> May 1, 2018</p>
      <p class='description'>The Poppy War is the story of passionate yet ruthless Fang Runin, also known as Rin, who grows up poor, orphaned by a previous war. But she studies and gets into an elite military academy, and develops a gift for shamanism that lets her call upon the fire powers of a vengeful Phoenix god</p>
    </div>
    `
}
