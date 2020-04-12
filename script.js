let myLibrary = [];

let bookDisplay = document.getElementById("displayBooks");
const addBookButton = document.getElementById("addBook");


function Book(title, author, pages, read) {
    this.ID = Date.now();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    
    this.info = `${this.title} by ${this.author}, ${this.pages} pages, ${this.readString}`;
    return this.info
}

addBookButton.addEventListener("click", e => {
    
    const title = prompt("What is the title?")
    const author = prompt("Who is the author?")
    const pages = prompt("How many pages?")
    const read = prompt("Have you read it? Enter true or false.")
    let newBook = new Book(title, author, pages, read)
    addBook(newBook)
    render();
})

function addBook(bookObj) {
    myLibrary.push(bookObj);
}
const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, false)
const theScienceOfMom = new Book("The Science of Mom", "Callahan", 174, true)
const theBookThief = new Book("The Book Thief", "Kirokawa", 199, true)
const harryPotterPhilosopher = new Book("Harry Potter and the Philosopher's Stone", "J.K. Rowling", 244, true)

addBook(theHobbit);
addBook(theScienceOfMom);
addBook(theBookThief);
addBook(harryPotterPhilosopher);

function render(){
    myLibrary.forEach(item => {

        if (item.read == true || item.read === "true" || item.read == "true" || item.read === true) {
            item.readString = "Completed"
        } else if (item.read == false || item.read === "false" || item.read == "false" || item.read === false) {      
            item.readString = "Unread";
        } else {
            item.readString = "Invalid entry";
        }

        let newDiv = document.createElement('div');
        newDiv.innerHTML = `<h1>${item.title}</h1><h2>${item.author}</h2><h3>${item.pages} pages</h3><h4>${item.readString}</h4>`;
        bookDisplay.appendChild(newDiv);
        

    }); 
}








