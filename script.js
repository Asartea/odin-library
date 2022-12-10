const submitButton = document.getElementById('form-submit')
function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.info = function() {
        let readstring = read ? 'Read' : 'Unread'
        return `${title} is a book by ${author} and is ${pages} long. I have ${readstring}`
    }
}
function Library() {
    this.books = []
    this.addBook = function(newBook) {
        if(!this.alreadyInLibrary(newBook)) {
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
function Controller() {
    this.Library = new Library()
    this.Display = new Display()
    this.addBook = function(formData) {
        let data = this.handleFormData(formData)
        let newBook = new Book(data.title, data.author, data.pages, data.read)
        this.Display.addBook(newBook)
        this.Library.addBook(newBook)
    }
    this.removeBook = function(title) {
        this.Display.removeBook(title)
        this.Library.removeBook(title)
    }
    this.handleFormData = function(data) {
        data = new FormData(data)
        console.log(data)
        return Object.fromEntries(data)
    }
}
let mainController = new Controller()

function Display() {
    this.template = document.querySelector('template')
    this.container = document.getElementById('container')
    this.addBook = function(newBook) {
        let clone = this.template.content.cloneNode(true)
        let bookCard = clone.querySelectorAll('.book-card')[0]
        bookCard.dataset.title = newBook.title
        let rows = bookCard.querySelectorAll('.bookcard-row')
        rows[0].textContent = newBook.title
        rows[1].textContent = newBook.author
        rows[2].textContent = newBook.pages
        let removeButton = bookCard.querySelector('#remove-button')
        removeButton.dataset.title = newBook.title
        console.log(removeButton)
        removeButton.addEventListener('click', e => {
            let title = e.target.parentElement.dataset.title
            console.log(e.target.parentElement.dataset.title)
            mainController.removeBook(title)
       })
       let readButton = bookCard.querySelector("#read-indicator")
       let bookIsRead = newBook.read ? true : false
       let bookIsReadString = bookIsRead ? "Read" : "Unread"
       readButton.textContent = bookIsReadString
       console.log(bookIsRead)
       this.container.appendChild(clone)
    }
    this.removeBook = function(title) {
        let bookCard = document.querySelector(`[data-title=${title}]`)
        bookCard.remove()
    }
}
submitButton.addEventListener('click', (e) => {
    e.preventDefault()
    let data = e.target.form
    mainController.addBook(data)
})