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

document.getElementById("enter-book").addEventListener("submit", function (e) {
  e.preventDefault();
  searchBarVolumes();
});

function searchBarVolumes() {
  const api_key =  '';
  let query = document.getElementById('query').value;
  const results = document.querySelector(".search-section");
  results.innerHTML = ""
  if(!query) {
      let noResults = document.createElement("div")
      noResults.className = 'noResults'
      noResults.innerHTML =  "Try typing some letters and let the fun begin"
      document.querySelector(".search-section").appendChild(noResults);
  }
  else {
      fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=${api_key}`, {
          headers: {
           Accept: 'application/json',
          }
      })
  .then(response => response.json())
  .then(data => data.items.forEach(function(item) {buildABook(item)}))
}
};

function buildABook(volume) {
  let searchResults = document.querySelector('.search-section');
  let book = document.createElement('div');
  book.classList.add('book');
  book.id = `wish-${volume["id"]}`;
  searchResults.appendChild(book);

  let addButton = document.createElement('button');
  addButton.classList.add('add');
  addButton.id = `${volume["id"]}`;
  book.appendChild(addButton);

  let addIcon = document.createElement('i');
  addIcon.classList.add('material-icons');
  addIcon.classList.add('addBtn');
  addIcon.appendChild(document.createTextNode("add_circle_outline"));
  addButton.appendChild(addIcon);

  let title = document.createElement('h3');
  title.id =`title-${volume["id"]}`;
  title.appendChild(document.createTextNode(`${volume["volumeInfo"]["title"]}`));
  book.appendChild(title);

  let author = document.createElement('p');
  let authorSpan = document.createElement('span');
  authorSpan.classList.add('info');
  authorSpan.appendChild(document.createTextNode('Author '));
  let authorIdSpan = document.createElement('span');
  authorIdSpan.id = `aut-${volume["id"]}`;
  authorIdSpan.appendChild(document.createTextNode(`${volume["volumeInfo"]["authors"]}`));
  author.append(authorSpan);
  author.append(authorIdSpan);
  book.appendChild(author);

  let publisher = document.createElement('p');
  let publisherSpan = document.createElement('span');
  publisherSpan.classList.add('info');
  publisherSpan.appendChild(document.createTextNode('Publisher '));
  let publisherIdSpan = document.createElement('span');
  publisherIdSpan.id = `pub-${volume["id"]}`;
  publisherIdSpan.appendChild(document.createTextNode(`${volume["volumeInfo"]["publisher"]}`));
  publisher.appendChild(publisherSpan);
  publisher.appendChild(publisherIdSpan);
  book.appendChild(publisher);

  let datePublished = document.createElement('p');
  let datePublishedSpan = document.createElement('span');
  datePublishedSpan.classList.add('info');
  datePublishedSpan.appendChild(document.createTextNode('Date Published '));
  let datePublishedIdSpan = document.createElement('span');
  datePublishedIdSpan.id = `dat-${volume["id"]}`;
  datePublishedIdSpan.appendChild(document.createTextNode(`${volume["volumeInfo"]["publisher"]}`));
  datePublished.appendChild(datePublishedSpan);
  datePublished.appendChild(datePublishedIdSpan);
  book.appendChild(datePublished);

  let description = document.createElement('p');
  description.classList.add('description');
  book.appendChild(description.appendChild(document.createTextNode(`${volume["volumeInfo"]["description"]}`)));

  
  const addBtn = document.querySelectorAll('.addBtn');
  addBtn.forEach((add) => {
      add.addEventListener('click', () => {
          let jsonObj = {}
          let title = document.querySelector(`#title-${volume["id"]}`);
          let author = document.querySelector(`#aut-${volume["id"]}`);
          let wishId = document.querySelector(`#wish-${volume["id"]}`);
          jsonObj = {
            'title': title.innerHTML,
            'author': author.innerHTML,
            'wishId': wishId.id
          }
      if (add.innerHTML == 'add_circle_outline') {
          add.innerHTML = 'done';
          buildWishlistItem(jsonObj);
          /*fetch("https://localhost:3000", {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            }, 
              body: JSON.stringify(jsonObj)
            })
            .then(res => {console.log("Request complete! response:", res);}); */
        }
      else {
          add.innerHTML = 'add_circle_outline';
          /*fetch("https://localhost:3000/" + jsonObj, { 
            method: "DELETE",
            headers: {
              'Content-type': 'application/json'}
          }); */
          removeWishListItem(jsonObj);
      }
  });
});

}


function buildWishlistItem(item) {
  let itemDiv = document.querySelector('#wishlist-pop-up');
  let savedBook = document.createElement('div');
  savedBook.classList.add('saved-book');
  let bookInfo = document.createElement('div');
  bookInfo.classList.add('book-info');
  let titleBook = document.createElement('h3');
  titleBook.appendChild(document.createTextNode(item.title)); 
  let authorBook = document.createElement('p');
  authorBook.appendChild(document.createTextNode(item.author)); 
  let removeSaved = document.createElement('button');
  removeSaved.classList.add('remove-saved');
  let exitIcon = document.createElement('i');
  exitIcon.classList.add('material-icons');
  exitIcon.appendChild(document.createTextNode('&#xe14c;'));

  bookInfo.append(titleBook);
  bookInfo.append(authorBook);
  savedBook.append(bookInfo);
  savedBook.appendChild(removeSaved);
  savedBook.appendChild(exitIcon);
  itemDiv.append(savedBook);
}

function removeWishListItem(item) {
  let savedBook = document.querySelector(`wish-${item["id"]}`);
  savedBook.remove();
}

      



