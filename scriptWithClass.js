


let myLibrary = [];
const bookDisplay = document.getElementById("displayBooks");
const addBookButton = document.getElementById("addBook");
const addBookSubmit = document.getElementById("addBookSubmit");
document.getElementById("addBookFormDiv").style.display = "none";


addBookButton.addEventListener("click", e => {
    document.getElementById("addBookFormDiv").style.visibility = "visible";
    document.getElementById("addBookFormDiv").style.display = "";
})

addBookSubmit.addEventListener("click", e => {
    addNewBook()
    document.getElementById("addBookForm").reset(); 
    document.getElementById("addBookFormDiv").style.visibility = "hidden";
})

function createRemoveButton(divID) {
    const currentDiv = document.getElementById(divID)
    let removeButton = document.createElement('button')
    removeButton.textContent = "Remove Book"
    removeButton.id =  `removeBook${divID}`
    currentDiv.insertAdjacentHTML("beforeend", "<hr>")
    currentDiv.insertAdjacentElement("beforeend", removeButton)
    currentDiv.insertAdjacentHTML("beforeend", "<hr>")
    removeButton.addEventListener("click", e => {
        currentDiv.parentNode.removeChild(currentDiv);
        myLibrary[divID] = null;
    })
}

function createToggleButton(divID) {
    const currentDiv = document.getElementById(divID)
    let toggleButton = document.createElement('button')
    const currentItem = myLibrary[divID];
    if (currentItem.read === true) {
        toggleButton.textContent = "I haven't read this!"
    } else {
        toggleButton.textContent = "I've read this!"
    }
    toggleButton.id =  `toggleRead${divID}`
    currentDiv.insertAdjacentElement("beforeend", toggleButton)
    toggleButton.addEventListener("click", function() {
        if (currentItem.read === true) {
            currentItem.read = false
            currentItem.readString = "Unread"
            toggleButton.textContent = "I've read this!"
        } else {
            currentItem.read = true
            currentItem.readString = "Completed"
            toggleButton.textContent = "I haven't read this!"
        }
        document.getElementById(`h4${divID}`).textContent = currentItem.readString
    })
}

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    toggleRead() {
        (this.read === true) ? this.read = false: this.read = true;
    }
}

function insertInDom(item, index) {
    let newDiv = document.createElement('div');
    newDiv.innerHTML = `<h1>${item.title}</h1>
    <h2>${item.author}</h2>
    <h3>${item.pages} pages</h3>
    <h4  id="h4${index}">${item.readString}</h4>`;
    newDiv.id = `${index}`
    newDiv.className = "bookitem";
    bookDisplay.insertAdjacentElement("beforeend", newDiv)
}

function addNewBook() {
    const title = document.getElementById("bookTitle").value
    const author = document.getElementById("bookAuthor").value
    const pages = document.getElementById("bookPageCount").value
    const read = document.getElementById("bookRead").checked
    const newBook = new Book(title, author, pages, read)
    const index = addBook(newBook);
    insertInDom(newBook, index)
    createRemoveButton(index)
    createToggleButton(index)
    assignCover(index)
}

function addBook(bookObj) {
    if (bookObj.read === true) {
        bookObj.readString = "Completed"
    } else if (bookObj.read === false) {      
        bookObj.readString = "Unread";
    } else {
        bookObj.readString = "Invalid entry";
    }

    // Add new book to empty slot if prior book deleted
    const index = myLibrary.indexOf(null);
    if (index === -1) {
        myLibrary.push(bookObj)
        return myLibrary.length - 1
    } else {
        myLibrary[index] = bookObj;
        return index
    }  
}



function assignCover(divID) {
    const currentDiv = document.getElementById(divID)
    const colors = ['#717C89', '#522A27', '#B49082', '#98473E', '#9F7E69',
    '#03312E', '#211103', '#283833', '#471018', '#7A5C58']
    const colorChoice = colors[Math.floor((Math.random() * colors.length))]
    currentDiv.style.backgroundColor = colorChoice;

    const textures = ['texture1.png', 'texture2.png', 'texture3.png', 
    'texture4.png', 'texture5.png']
    const textureChoice = textures[Math.floor((Math.random() * textures.length))]
    currentDiv.style.backgroundImage = `url('${textureChoice}')`;


    const widthChoice = 60 + Math.floor(Math.random() * 40);
    currentDiv.style.width = widthChoice;

}

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, false)
const theScienceOfMom = new Book("The Science of Mom", "Callahan", 174, true)
const theBookThief = new Book("The Book Thief", "Zusak", 199, true)

addBook(theHobbit);
addBook(theScienceOfMom);
addBook(theBookThief);

// Render existing library
(function (){
    myLibrary.forEach(function(item, index) {
        insertInDom(item, index)
        createRemoveButton(index)
        createToggleButton(index)
        assignCover(index)
    }); 
})();






