const template = document.querySelector('template')
const submitButton = document.getElementById('form-submit')

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.info = function() {
        let readstring = read ? 'read' : 'not read'
        return `${title} is a book by ${author} and is ${pages} long. I have ${readstring}`
    }
}
function Library() {
    this.books = []
    this.addBook = function(newBook) {
        if(!mainLibrary.alreadyInLibrary(newBook)) {
            this.books.push(newBook)
        }
    }
    this.removeBook = function(title) {
        this.books.filter((book) => book.title !== title)
    }
    this.getBookInfo = function(title) {
        return this.books.find(title)
    }
    this.alreadyInLibrary = function(newBook) {
        return this.books.some((book) => book.title === newBook.title)
    }
}
let mainLibrary = new Library()
function Display() {
    this.addBook = function(newBook) {
        let clone = template.cloneNode(true)
        let bookCard = clone.getElementsByClassName('book-card')[0]
        bookCard.dataset.title = newBook.title
        let rows = bookCard.getElementsByClassName('bookcard-row')
        rows[0].textContent = newBook.title
        rows[1].textContent = newBook.author
        rows[3].textContent = newBook.pages
        //TODO: READ / NOT READ DISPLAY    
    }
    this.removeBook = function(title) {
        let bookCard = document.querySelector(`[data-title=${title}]`)
        bookCard.remove()
    }
}
let mainDisplay = new Display()
function addBook (title, author, pages, read) {
    let newBook = new Book(title, author, pages, read)
    mainLibrary.addBook(newBook)
    mainDisplay.addBook(newBook)
}

function removeBook(title) {
    mainLibrary.removeBook(title)
    mainDisplay.removeBook(title)
}
submitButton.addEventListener('click', (e) => {
    e.preventDefault()
    let data = handleFormData(e.target.form)
    addBook(data.title, data.author, data.pages, data.read)
})
function handleFormData(data) {
    let formdata = new FormData(data)
    return Object.fromEntries(formdata)
}