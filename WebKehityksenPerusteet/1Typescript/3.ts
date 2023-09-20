// Define a type alias named 'Book' with appropriate properties
interface Book {
  title: string;
  author: string;
  publicationYear: number;
};

function promptForBook() {
  // Prompt user for book details (title, author, publication year)
  const bookTitle = prompt('Enter the title of the book:')!;
  const bookAuthor = prompt('Enter the author of the book:')!;
  const bookPublicationYear = +prompt('Enter the publication year of the book:')!;

  // Create an object of type 'Book' with the entered values
  const book: Book = {
    title: bookTitle,
    author: bookAuthor,
    publicationYear: bookPublicationYear
  };
  return book;
}

// Call the promptForBook function to get the book details
const bookDetails = promptForBook();

// Display the details of the book object to the user
console.log('Book Details:');
console.log(`Title: ${bookDetails.title}`);
console.log(`Author: ${bookDetails.author}`);
console.log(`Publication Year: ${bookDetails.publicationYear}`);
