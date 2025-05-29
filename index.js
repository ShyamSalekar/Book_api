const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());

// Test Route
app.get('/', (req, res) => {
  res.send('Book API is running!');
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

let books = [
  { id: 1, title: 'The Alchemist', author: 'Paulo Coelho' },
  { id: 2, title: '1984', author: 'George Orwell' }
];

// CRUD End points
// Return all books
app.get('/books', (req, res) => {
  res.json(books);
});

// Add a new Book
app.post('/books', (req, res) => {
  const newBook = req.body;
  newBook.id = books.length + 1;
  books.push(newBook);
  res.status(201).json(newBook);
});

// Update Book by id
app.put('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = books.findIndex(b => b.id === id);

  if (index !== -1) {
    books[index] = { ...books[index], ...req.body };
    res.json(books[index]);
  } else {
    res.status(404).json({ error: 'Book not found' });
  }
});

// Remove Book by id
app.delete('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  books = books.filter(b => b.id !== id);
  res.json({ message: 'Book deleted' });
});
