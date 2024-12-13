import React, { useEffect, useState } from 'react'
import bookData from '../../../dummy-data.json'; // Adjust path as necessary
import { useRouter } from 'next/router';
import Books from '@/pages/components/bookdetails/Books';
import { useAuth } from '@/pages/components/authcontext/authcontext';

export default function index() {
    const router=useRouter();

    const id=router.query.id;
    const [data, setData] = useState();
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
    useEffect(()=>
        {


          if(id)
            {

fetch(`/api/genre/${id}/books`).then(res=>res.json()).then(data=>setData(data.book))






            }
// const arr=[...bookData.books];
// console.log(id);
// const arr1=arr.filter((x)=>x.genreId===id);
// console.log(arr1);

// setData(arr1);



        },[router.query.id])


        function viewGenre(genreId) {
            console.log("Selected Genre ID:", genreId);
            router.push('/viewgenre/' + genreId);
          }
        function bookDetails(bookId) {
            console.log("Selected Book ID:", bookId);
            router.push('/books/' + bookId);
          }
  if(data){      
  return (
    <div>
        <center>
        {data.map((book) => (
          <Books 
            key={book.id}
            bookid={book.id}
            title={book.title}
            price={book.price}
            genreId={book.genreId}
            onViewGenre={viewGenre}
           
            bookdetails={bookDetails}
          />
        ))}
</center>
    </div>
  )
}

else
return <div>Loading....</div>

}

