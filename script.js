const submitButton = document.getElementById('form-submit')
function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}
function Library() {
    this.books = []
    this.addBook = function(book) {
        if(!this.alreadyInLibrary(book)) {
            this.books.push(book)
        }
    }
    this.removeBook = function(title) {
        this.books.filter((book) => book.title !== title)
    }
    this.getBookInfo = function(title) {
        return this.books.find(book => book.title === title)
    }
    this.alreadyInLibrary = function(newBook) {
        return this.books.some((book) => book.title !== newBook.title)
    }
    this.toggleRead = function(title) {
        let book = this.getBookInfo(title)
        book.read = !book.read
    }
}
function Controller() {
    this.Library = new Library()
    this.Display = new Display()
    this.addBook = function(formData) {
        let data = this.handleFormData(formData)
        if(this.Library.alreadyInLibrary(data)) {
            console.error("cant add books with the same title")
            return
        }
        data.read = data.read ? true : false
        let newBook = new Book(data.title, data.author, data.pages, data.read)
        this.Display.renderBook(newBook)
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
    this.toggleRead = function(title) {
        this.Library.toggleRead(title)
        this.Display.updateRead(title)
    }
}
let mainController = new Controller()

function Display() {
    this.template = document.querySelector('template')
    this.container = document.getElementById('container')
    this.submitButton = document.getElementById('form-submit')
    this.renderBook = function(book) {
        let clone = this.template.content.cloneNode(true)
        let bookCard = clone.querySelectorAll('.book-card')[0]
        bookCard.dataset.title = book.title
        let rows = bookCard.querySelectorAll('.bookcard-row')
        rows[0].textContent = book.title
        rows[1].textContent = book.author
        rows[2].textContent = book.pages
        let removeButton = bookCard.querySelector('#remove-button')
        removeButton.dataset.title = book.title
        console.log(removeButton)
        removeButton.addEventListener('click', e => {
            let title = e.target.parentElement.dataset.title
            mainController.removeBook(title)
       })
       let readButton = bookCard.querySelector("#read-indicator")
       readButton.dataset.title = book.title
       readButton.dataset.read = book.read
       readButton.parentElement.addEventListener("click", (e) => {
        console.log(e.target.dataset.title)
            mainController.toggleRead(e.target.dataset.title)
       })
       let bookIsReadString = book.read ? "Read" : "Unread"
       console.log(readButton)
       readButton.textContent = bookIsReadString
       this.container.appendChild(bookCard)  
    }
    this.removeBook = function(title) {
        let bookCard = document.querySelector(`[data-title=${title}]`)
        bookCard.remove()
    }
    this.updateBook= function(book) {
        this.removeBook(book.title)
        this.renderBook(book)
    }
    this.updateRead = function(title) {
        let readButton = document.querySelector(`[data-title=${title}]`).querySelector('#read-indicator')
        console.log(readButton)
        let currentState = readButton.dataset.read
        if (currentState === "true") {
            readButton.textContent = "Unread"
            readButton.dataset.read = "false"
        } else {
            readButton.textContent = "Read"
            readButton.dataset.read = "true"
        }
        console.log(readButton.dataset.read)
    }
}
submitButton.addEventListener('click', (e) => {
    e.preventDefault()
    let data = e.target.form
    mainController.addBook(data)
})