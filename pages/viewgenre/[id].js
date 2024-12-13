import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import bookData from '../../dummy-data.json'; // Adjust the path if necessary
import styles from './Genrepage.module.css';
import { useAuth } from '../components/authcontext/authcontext';

export default function GenrePage() {
  const router = useRouter();
  const [genre, setGenre] = useState(null);
  const [loading, setLoading] = useState(true); // Added loading state
  const [error, setError] = useState(null); // To handle any fetch errors
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
  useEffect(() => {
    // Log the bookData object to verify its structure
    console.log("bookData:", bookData.genres);
console.log(router.query.id)
    // Check if router.query.id is defined and a genre exists
    if (router.query.id) {
      // Fetch genre data from the API based on the genre ID
      fetch(`http://localhost:3000/api/genre/${router.query.id}`)
        .then(res => res.json())
        .then(data => {
          // Assuming your API returns the genre data in `data.genre`
          if (data && data.book) {
            setGenre(data.book); // Set the genre to state
          } else {
            setError('Genre not found.');
          }
        })
        .catch(err => {
          console.error('Error fetching genre:', err);
          setError('Failed to fetch genre data.');
        })
        .finally(() => setLoading(false)); // Stop loading once done
    } else {
      setError('No genre ID provided.');
      setLoading(false);
    }
  }, [router.query.id]);

  // Log the router query to see the current ID
  console.log("Router query:", router.query);

  if (loading) {
    return <div>Loading...</div>; // Show a loading state while waiting for data
  }

  return (
    <center>
      <div className={styles.heading}>
        <h1>{error || (genre ? genre.name : "Genre not found")}</h1>
      </div>
    </center>
  );
}
