import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Authordetails from '@/pages/components/authordetails/Authordetails';
import axios from 'axios';
import { useAuth } from '@/pages/components/authcontext/authcontext';

export default function Index() {
  const router = useRouter();
  const [author, setAuthor] = useState(null);  // Initialize author as null to handle loading state
  const Id = router.query.id;
const{authenicated,user}=useAuth();
//const { logout, user,autherticated } = useAuth()
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

   
   // router.events.on('routeChangeComplete', handleRouteChange);

    
    handleRouteChange(window.location.pathname);

 
    // return () => {
    //   router.events.off('routeChangeComplete', handleRouteChange);
    // };
  }, []);

if(!authenicated)
  {

router.push('/login');

  }
  useEffect(() => {
   
    if (Id) {
   
      fetch(`/api/authors/${Id}`)
        .then((res) => res.json())
        .then((data) => setAuthor(data.authors))
        .catch((error) => console.error('Error fetching author:', error));
    }
  }, [Id]);  

  return (
    <div>
      
      {author ? (
        <Authordetails name={author.name} biography={author.biography} />
      ) : (
        <p>Loading...</p>  
      )}
    </div>
  );
}
