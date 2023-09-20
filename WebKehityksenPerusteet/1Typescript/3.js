"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
function promptForBook() {
    // Prompt user for book details (title, author, publication year)
    var bookTitle = prompt('Enter the title of the book:');
    var bookAuthor = prompt('Enter the author of the book:');
    var bookPublicationYear = +prompt('Enter the publication year of the book:');
    // Create an object of type 'Book' with the entered values
    var book = {
        title: bookTitle,
        author: bookAuthor,
        publicationYear: bookPublicationYear
    };
    return book;
}
// Call the promptForBook function to get the book details
var bookDetails = promptForBook();
// Display the details of the book object to the user
console.log('Book Details:');
console.log("Title: ".concat(bookDetails.title));
console.log("Author: ".concat(bookDetails.author));
console.log("Publication Year: ".concat(bookDetails.publicationYear));
