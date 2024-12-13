import React from 'react';
import styles from '../bookdet/BookDetails.module.css'; // Import CSS module for styling

export default function Authordetails({ name,biography }) {
  return (
    <div className={styles.bookDetailsContainer}>
     
      <p className={styles.author}><strong>Name:</strong> {name}</p>
      <p className={styles.description}><strong>Biography:</strong> {biography}</p>
      
    </div>
  );
}
