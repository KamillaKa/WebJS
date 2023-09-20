"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Implement instances of the 'Product' type
function createElectronicDevice() {
    var brand = prompt("Enter brand of the electronic device:") || '';
    var model = prompt("Enter model of the electronic device:") || '';
    return { type: 'electronic', brand: brand, model: model };
}
function createBook() {
    var title = prompt("Enter title of the book:") || '';
    var author = prompt("Enter author of the book:") || '';
    return { type: 'book', title: title, author: author };
}
// Create instances of 'Product'
var electronicProduct = createElectronicDevice();
var bookProduct = createBook();
// Display the details of each product
function displayProductDetails(product) {
    console.log("Product Type: ".concat(product.type));
    if (product.type === 'electronic') {
        console.log("Brand: ".concat(product.brand));
        console.log("Model: ".concat(product.model));
    }
    else {
        console.log("Title: ".concat(product.title));
        console.log("Author: ".concat(product.author));
    }
}
console.log('Electronic Device Details:');
displayProductDetails(electronicProduct);
console.log();
console.log('Book Details:');
displayProductDetails(bookProduct);
