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
          wishListItems(); //infinite loop of adding Wishlist items!!!
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
        let jsonObj = {}
        let title = document.querySelector(`#title-${volume["id"]}`);
        let author = document.querySelector(`#aut-${volume["id"]}`);
        jsonObj = {
          'title': title,
          'author': author
        }
      if (add.innerHTML == 'add_circle_outline') {
          add.innerHTML = 'done';
          fetch("https://localhost:3000", {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            }, 
              body: JSON.stringify(jsonObj)
            })
            .then(res => {console.log("Request complete! response:", res);});
        }
        else {
          add.innerHTML = 'add_circle_outline';
          fetch('https://reqres.in/api/users/2', { //fix method to specify the element
            method: "DELETE",
            headers: {
                'Content-type': 'application/json'}
            });
        }
    });
});



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

function wishListItems() {
  fetch('https://localhost3000', {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => data.items.forEach((item) => buildWishlistItem(item)));
}

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
    title.id(`title-${volume["id"]}`);
    book.appendChild(title.createTextNode(`${volume["volumeInfo"]["title"]}`));

    let author = book.createElement('p');
    let authorSpan = author.createElement('span');
    authorSpan.classList.add('info');
    authorSpan.createTextNode('Author');
    let authorIdSpan = author.createElement('span');
    authorIdSpan.id(`aut-${volume["id"]}`);
    authorIdSpan.createTextNode(`${volume["volumeInfo"]["authors"]}`);
    author.append(authorSpan);
    author.append(authorIdSpan);
    book.appendChild(author);

    let publisher = book.createElement('p');
    let publisherSpan = publisher.createElement('span');
    publisherSpan.classList.add('info');
    publisherSpan.createTextNode('Publisher');
    let publisherIdSpan = publisher.createElement('span');
    publisherIdSpan.id(`pub-${volume["id"]}`);
    publisherIdSpan.createTextNode(`${volume["volumeInfo"]["publisher"]}`);
    publisher.appendChild(publisherSpan);
    publisher.appendChild(publisherIdSpan);
    book.appendChild(publisher);

    let datePublished = book.createElement('p');
    let datePublishedSpan = datePublished.createElement('span');
    datePublishedSpan.classList.add('info');
    datePublishedSpan.createTextNode('Date Published');
    let datePublishedIdSpan = datePublished.createElement('span');
    datePublishedIdSpan.id(`dat-${volume["id"]}`);
    datePublishedIdSpan.createTextNode(`${volume["volumeInfo"]["publisher"]}`);
    datePublished.appendChild(datePublishedSpan);
    datePublished.appendChild(datePublishedIdSpan);
    book.appendChild(datePublished);

    let description = book.createElement('p');
    description.classList.add('description');
    book.appendChild(description.createTextNode(`${volume["volumeInfo"]["description"]}`));

}


function buildWishlistItem(item) {
  let itemDiv = document.querySelector('#wishlist-pop-up');
  let savedBook = document.createElement('div');
  savedBook.classList.add('saved-book');
  let bookInfo = document.createElement('div');
  bookInfo.classList.add('book-info');
  let titleBook = document.createElement('h3');
  titleBook.createTextNode(item.title); //need to add a reference variable
  let authorBook = document.createElement('p');
  authorBook.createTextNode(item.author); //need to add a reference variable
  let removeSaved = document.createElement('button');
  removeSaved.classList.add('remove-saved');
  let exitIcon = document.createElement('i');
  exitIcon.classList.add('material-icons');
  exitIcon.createTextNode('&#xe14c;');

  bookInfo.append(titleBook);
  bookInfo.append(authorBook);
  savedBook.append(bookInfo);
  savedBook.appendChild(removeSaved);
  savedBook.appendChild(exitIcon);
  itemDiv.append(savedBook);
}

  

      



