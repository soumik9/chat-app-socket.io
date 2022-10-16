import { useState, useEffect } from "react";
const { io } = require("socket.io-client");

const useSocket = () => {

    const [socket, setSocket] = useState(null);
 
    useEffect(() => {
     setSocket(io('http://localhost:7000'));    
    },[])

    return { socket, setSocket };
}

export default useSocket;