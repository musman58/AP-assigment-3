import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import bookData from '../../dummy-data.json'; // Adjust path as necessary
import Authordetails from '../components/authordetails/Authordetails';
import { useAuth } from '../components/authcontext/authcontext';
import { useRouter } from 'next/router';

// SWR fetcher function to retrieve all authors
const fetchAuthors = async() => {

const respons=await fetch('http://localhost:3000//api/authors');
const data=await respons.json();




  return data.books || [];
};

export default function AuthorPage() {
  const [authors, setAuthors] = useState([]);
const router=useRouter()
  // Use SWR for client-side fetching of all authors
  const { data, error } = useSWR('authors', fetchAuthors);
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
  // Set authors to state once data is available
  useEffect(() => {
    if (data) setAuthors(data);
  }, [data]);

  if (error) return <div>Failed to load author information.</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
        <center> <h1>Authors Information</h1></center>
     
      {authors.map((author) => (
        
         <Authordetails name={author.name} biography={author.biography}/>
      
      ))}
    </div>
  );
}
