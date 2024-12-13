import "@/styles/globals.css";
import { ThemeProvider } from "./components/ThemeContext/ThemeContext";
import ThemeToggle from "./components/themebutton/Themebutton";
import styles from "@/styles/Home.module.css";
import { useRouter } from "next/router";
import { useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider, useAuth } from "./components/authcontext/authcontext";
import Nav from "./components/Nav";

export default function App({ Component, pageProps }) {

 const router=useRouter();
   
  return ( 
<>
  
  <AuthProvider>
  <ThemeProvider>

  <Nav/>

  
  <Component {...pageProps} />
</ThemeProvider>;
</AuthProvider>
</>
)
}
