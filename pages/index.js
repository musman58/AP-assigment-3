import Head from "next/head";
import { useRouter } from "next/router";
import localFont from "next/font/local";
import styles from "@/styles/Home.module.css";
import bookData from '../dummy-data.json';
import Books from "./components/bookdetails/Books";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import ThemeToggle from "./components/themebutton/Themebutton";
import { useAuth } from "./components/authcontext/authcontext";


// Local font setup
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home({arr,arr1}) {
  const router = useRouter();
  const y = useRef();

  const [data, setData] = useState(arr);
  const [filter, setFilter] = useState(arr1);
   //const{user}=useAuth();
   //console.log(user);
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
  function viewGenre(genreId) {
    console.log("Selected Genre ID:", genreId);
    router.push('/viewgenre/' + genreId);
  }

  function bookDetails(bookId) {
    console.log("Selected Book ID:", bookId);
    router.push('/books/' + bookId);
  }

  const handleGenreChange = () => {

    const selectedGenre = y.current.value;
    if(selectedGenre=='All')
      {
        console.log('all')
        const arr=[...bookData.books];
        setData(arr);
      }
      else
      {

    console.log(selectedGenre);
    const arr=[...bookData.books];
    console.log(arr);
    const arr1=arr.filter(x=>x.genreId===selectedGenre);
    console.log(arr1);
    setData(arr1);
  }

  };
  function viewauthorpage()
  {

router.push('/Author');

  }
  function viewgenrepage()
  {

router.push('/Genres');

  }
if(!filter || !data)
  return <div>Loading...</div>;
else
{  return (
    <>
      <Head>
        <title>Books List</title>
      </Head>

      <div className={styles.container}>
        <h1 className={styles.heading}>Books</h1>

        <select ref={y} onChange={handleGenreChange}>
        <option key='All'value='All'>ALL</option>
          {
         
          filter.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
     

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
      </div>
    </>
  );
}}

export async function  getStaticProps()
{
  //const arr=[...bookData.books];
  const boo=await fetch('http://localhost:3000/api/book');



  const data=await boo.json();
  console.log(data);
  const arr=data.books;
//const arr1=[...bookData.genres];
const gen=await fetch('http://localhost:3000/api/genre');



  const data1=await gen.json();
  console.log(data1);
  const arr1=data1.books;
console.log(arr);
console.log(arr1);





  return{
    props: {arr,arr1},
    revalidate:10

  }
}