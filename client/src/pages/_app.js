import { useEffect, useState } from 'react';
import '../../styles/globals.css'
const { io } = require("socket.io-client");

function MyApp({ Component, pageProps }) {

  const [socket, setSocket] = useState(null);
 
  useEffect(() => {
   setSocket(io('http://localhost:7000'));
  },[])
  

  return <Component {...pageProps} />
}

export default MyApp
