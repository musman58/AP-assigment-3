import React from 'react';
import styles from './BookDetails.module.css'; // Import CSS module for styling

export default function BookDetails({ title, author, description, price,rating,authordetails,authorid }) {
  return (
    <div className={styles.bookDetailsContainer}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.author}><strong>Author:</strong> {author}</p>
      <p className={styles.description}><strong>Description:</strong> {description}</p>
      <p className={styles.price}><strong>Price:</strong> ${price.toFixed(2)}</p>
      
      <p className={styles.rating}><strong>Rating:</strong> {rating} / 5</p>
      <button onClick={()=>authordetails(authorid)}>View author Details</button>
    </div>
  );
}
