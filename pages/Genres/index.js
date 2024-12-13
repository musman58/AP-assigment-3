import React, { useEffect } from 'react';
import bookData from '../../dummy-data.json'; // Adjust path as necessary
import styles from './genre.module.css'; // Import a CSS module for custom styles
import { useRouter } from 'next/router';
import { useAuth } from '../components/authcontext/authcontext';

export default function GenresPage({ genres }) {
  const router = useRouter();

const { logout, user,autherticated } = useAuth()
  // useEffect(() => {
    
  //   const handleRouteChange = (url) => {
      
  //     const history = JSON.parse(localStorage.getItem('routeHistory')) || [];
  //     history.push(url);
  //     localStorage.setItem('routeHistory', JSON.stringify(history));
  //     console.log('Route changed to:', url);
  //   };

    
  //   router.events.on('routeChangeComplete', handleRouteChange);
  //   handleRouteChange(window.location.pathname);
   
  //   return () => {
  //     router.events.off('routeChangeComplete', handleRouteChange);
  //   };
  // }, [router.events]);
  useEffect(() => {
    const handleRouteChange = async (url) => {
      try {
        if(user){
          const userid=user.id
          console.log(userid);
        // Prepare the route history data to send to the server
        const routeHistory = {
          url,
          userid
          // Include timestamp for when the route change occurred
        };

        // Send the route history data to the server using an API call
        const response = await fetch('http://localhost:3000//api/search', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(routeHistory),
        });

        if (response.ok) {
          console.log('Route changed and saved to DB:', url);
        } else {
          console.error('Failed to save route change to DB');
        }}
      } catch (error) {
        console.error('Error saving route change:', error);
      }
    
    };

   
    //router.events.on('routeChangeComplete', handleRouteChange);

    
    handleRouteChange(window.location.pathname);

 
    // return () => {
    //   router.events.off('routeChangeComplete', handleRouteChange);
    // };
  }, []);
//console.log(user.id);
  function viewBooks(genreId) {
    router.push('/Genres/' + genreId);
  }

  if (!genres) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Book Genres</h1>
      {genres.map((genre) => (
        <center key={genre.id}>
          <div className={styles.genreCard} onClick={() => viewBooks(genre.id)}>
            {genre.name}
          </div>
        </center>
      ))}
    </div>
  );
}

// Corrected `getServerSideProps` function
export async function getServerSideProps() {

  const gen=await fetch('http://localhost:3000/api/genre');



  const data1=await gen.json();
  console.log(data1);
  const genres=data1.books;
  //const genres = bookData.genres;

  return {
    props: { genres },
  };
}
