const { MongoClient } = require('mongodb');

// Replace with your connection string and credentials
const uri = 'mongodb+srv://muhammadusman01645:Usman586..@cluster0.q1z7epv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';


const client = new MongoClient(uri);

const data = {
    books: [
        {
          "id": "1",
          "title": "The Great Gatsby",
          "authorId": "1",
          "description": "A novel about the American dream and the disillusionment that comes with it.",
          "price": 10.99,
          "genreId": "1",
          "rating": 4.4
        },
        {
          "id": "2",
          "title": "To Kill a Mockingbird",
          "authorId": "2",
          "description": "A novel set in the Deep South and focused on themes of racial injustice and moral growth.",
          "price": 12.99,
          "genreId": "1",
          "rating": 4.8
        },
        {
          "id": "3",
          "title": "1984",
          "authorId": "3",
          "description": "A dystopian novel that explores the dangers of totalitarianism and extreme political ideology.",
          "price": 14.99,
          "genreId": "2",
          "rating": 4.7
        },
        {
          "id": "4",
          "title": "Pride and Prejudice",
          "authorId": "4",
          "description": "A romantic novel that charts the emotional development of the protagonist, Elizabeth Bennet.",
          "price": 9.99,
          "genreId": "3",
          "rating": 4.6
        },
        {
          "id": "5",
          "title": "The Catcher in the Rye",
          "authorId": "5",
          "description": "A story about teenage rebellion and alienation narrated by the protagonist Holden Caulfield.",
          "price": 11.99,
          "genreId": "1",
          "rating": 4.0
        },
        {
          "id": "6",
          "title": "The Alchemist",
          "authorId": "6",
          "description": "A philosophical book that tells the story of Santiago, a shepherd boy on a journey to discover his personal legend.",
          "price": 13.99,
          "genreId": "4",
          "rating": 4.5
        },
        {
          "id": "7",
          "title": "To Kill a Mockingbird",
          "authorId": "2",
          "description": "A novel set in the Deep South and focused on themes of racial injustice and moral growth.",
          "price": 12.99,
          "genreId": "1",
          "rating": 4.8
        }
      ],
      genres: [
        { "id": "1", "name": "Fiction" },
        { "id": "2", "name": "Dystopian" },
        { "id": "3", "name": "Romance" },
        { "id": "4", "name": "Adventure" }
      ],
      authors: [
        { "id": "1", "name": "F. Scott Fitzgerald", "biography": "An American novelist and short story writer." },
        { "id": "2", "name": "Harper Lee", "biography": "An American novelist known for 'To Kill a Mockingbird'." },
        { "id": "3", "name": "George Orwell", "biography": "An English novelist and essayist." },
        { "id": "4", "name": "Jane Austen", "biography": "An English novelist known for her social commentary." },
        { "id": "5", "name": "J.D. Salinger", "biography": "An American writer known for 'The Catcher in the Rye'hello." },
        { "id": "6", "name": "Paulo Coelho", "biography": "A Brazilian lyricist and novelist." }
      ],
      reviews: [
        { "id": "1", "bookId": "1", "userId": "101", "rating": 5, "comment": "A timeless classic!" },
        { "id": "2", "bookId": "2", "userId": "102", "rating": 4, "comment": "A powerful story." },
        { "id": "3", "bookId": "3", "userId": "103", "rating": 5, "comment": "Chilling and thought-provoking." },
        { "id": "4", "bookId": "4", "userId": "104", "rating": 4, "comment": "A beautifully written love story." }
      ],
      users: [
        { "id": "101", "username": "usman", "email": "usman1@example.com","password":"123" },
        { "id": "102", "username": "nouman", "email": "nouman2@example.com" ,"password":"123" },
        { "id": "103", "username": "ali", "email": "ali3@example.com","password":"123"  },
        { "id": "104", "username": "kamran", "email": "kamran4@example.com","password":"123"  }
      ]
};

async function run() {
  try {
    await client.connect();
    console.log('Connected to MongoDB Atlas');

    const db = client.db('BOOKSHOP'); // Replace <dbname> with your database name

    // Insert collections
    await db.collection('books').insertMany(data.books);
    await db.collection('genres').insertMany(data.genres);
    await db.collection('authors').insertMany(data.authors);
    await db.collection('reviews').insertMany(data.reviews);
    await db.collection('users').insertMany(data.users);

    console.log('Data inserted successfully');
  } catch (error) {
    console.error('Error inserting data:', error);
  } finally {
    await client.close();
  }
}

run();
