let myLibrary = [];
const bookDisplay = document.getElementById("displayBooks");
const addBookButton = document.getElementById("addBook");
const addBookSubmit = document.getElementById("addBookSubmit");
document.getElementById("addBookFormDiv").style.visibility = "hidden"


addBookButton.addEventListener("click", e => {
    document.getElementById("addBookFormDiv").style.visibility = "visible";
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
    currentDiv.insertAdjacentElement("beforeend", removeButton)
    removeButton.addEventListener("click", e => {
        currentDiv.parentNode.removeChild(currentDiv);
        myLibrary[divID] = null;
    })
}


function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    return this.info
}

function insertInDom(item, index) {
    let newDiv = document.createElement('div');
    newDiv.innerHTML = `<h1>${item.title}</h1><h2>${item.author}</h2><h3>${item.pages} pages</h3><h4>${item.readString}</h4>`;
    newDiv.id = `${index}`
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

function render(){
    myLibrary.forEach(function(item, index) {
        insertInDom(item, index)
        createRemoveButton(index)
    }); 
}


const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, false)
const theScienceOfMom = new Book("The Science of Mom", "Callahan", 174, true)
const theBookThief = new Book("The Book Thief", "Kirokawa", 199, true)
const harryPotterPhilosopher = new Book("Harry Potter and the Philosopher's Stone", "J.K. Rowling", 244, true)

addBook(theHobbit);
addBook(theScienceOfMom);
addBook(theBookThief);
addBook(harryPotterPhilosopher);
render()






