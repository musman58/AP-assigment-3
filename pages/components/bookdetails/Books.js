// components/BookCard.js

import React from 'react';
import styles from './BookCard.module.css';
 // Create this CSS file to style the card

const Books = ({bookid, title, price, genreId, onViewGenre,bookdetails }) => {
  return (
    <div className={styles.card}>
      <h2>{title}</h2>
   
      <p><strong>Price:</strong> ${price.toFixed(2)}</p>
      <button className={styles.btnn} onClick={()=>onViewGenre(genreId)}>View Genre</button>
      <button className={styles.btnn} onClick={()=>bookdetails(bookid)}>View Book details</button>

    </div>
  );
};

export default Books;
