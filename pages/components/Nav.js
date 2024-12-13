

//import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useAuth } from './authcontext/authcontext'
import ThemeToggle from './themebutton/Themebutton'
//import "../../../styles/globals.css";

import { useRouter } from 'next/router'; // Use `next/router` instead of `next/navigation`


export default function Nav() {
  const router = useRouter()
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
  // useEffect(() => {
  //   const handleRouteChange = async (url) => {
  //     try {
  //       if(user){
  //         const userid=user.id
  //         console.log(userid);
  //       // Prepare the route history data to send to the server
  //       const routeHistory = {
  //         url,
  //         userid
  //         // Include timestamp for when the route change occurred
  //       };

  //       // Send the route history data to the server using an API call
  //       const response = await fetch('http://localhost:3000//api/search', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify(routeHistory),
  //       });

  //       if (response.ok) {
  //         console.log('Route changed and saved to DB:', url);
  //       } else {
  //         console.error('Failed to save route change to DB');
  //       }}
  //     } catch (error) {
  //       console.error('Error saving route change:', error);
  //     }
    
  //   };

   
  //   router.events.on('routeChangeComplete', handleRouteChange);

    
  //   handleRouteChange(window.location.pathname);

 
  //   return () => {
  //     router.events.off('routeChangeComplete', handleRouteChange);
  //   };
  // }, [router.events]);
  
  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem',
      backgroundColor: '#f0f0f0',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <div>
        <button style={{
          padding: '0.5rem 1rem',
          margin: '0 0.5rem',
          border: 'none',
          borderRadius: '4px',
          backgroundColor: '#007bff',
          color: 'white',
          cursor: 'pointer',
          transition: 'background-color 0.3s ease'
        }} onClick={() => router.push('/Author')}>View Authors</button>
        <button style={{
          padding: '0.5rem 1rem',
          margin: '0 0.5rem',
          border: 'none',
          borderRadius: '4px',
          backgroundColor: '#007bff',
          color: 'white',
          cursor: 'pointer',
          transition: 'background-color 0.3s ease'
        }} onClick={() => router.push('/Genres')}>View Genres</button>
        <button style={{
          padding: '0.5rem 1rem',
          margin: '0 0.5rem',
          border: 'none',
          borderRadius: '4px',
          backgroundColor: '#007bff',
          color: 'white',
          cursor: 'pointer',
          transition: 'background-color 0.3s ease'
        }} onClick={() => router.push('/')}>View Home</button>
        <button style={{
          padding: '0.5rem 1rem',
          margin: '0 0.5rem',
          border: 'none',
          borderRadius: '4px',
          backgroundColor: '#007bff',
          color: 'white',
          cursor: 'pointer',
          transition: 'background-color 0.3s ease'
        }} onClick={() => router.push('/Search')}>View Search</button>
        {user ? (
          <button style={{
            padding: '0.5rem 1rem',
            margin: '0 0.5rem',
            border: 'none',
            borderRadius: '4px',
            backgroundColor: '#dc3545',
            color: 'white',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease'
          }} onClick={logout}>Log out</button>
        ) : (
          <button style={{
            padding: '0.5rem 1rem',
            margin: '0 0.5rem',
            border: 'none',
            borderRadius: '4px',
            backgroundColor: '#28a745',
            color: 'white',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease'
          }} onClick={() => router.push('/login')}>Log In</button>
        )}
      </div>
    {/* <ThemeToggle/> */}

      {user && user.email && (
        <div style={{
          marginLeft: 'auto',
          padding: '0.5rem',
          fontWeight: 'bold'
        }}>
          {user.email}
        </div>
      )}
    </nav>
  )
}

