import React from 'react';
import { useEffect, useState } from 'react';
import useSocket from '../../hooks/useSocket';
import MessageInput from './components/MessageInput';

const Home = (props) => {

    // hooks
    const { socket } = useSocket();

    // states
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);

    // socket emit
    useEffect(() => {
        if (!socket) return;
        socket.on('message-form-server', (data) => {
            setChat((prev) => [...prev, {message: data.message, received: true}])
        })

    }, [socket])

    return (
        <div className='container mt-10'>
            <div className='w-[60%] mx-auto shadow-lg rounded-lg bg-[#10ac84] p-[15px_10px]'>


                <div className="flex justify-center mt-5">
                    <div className='bg-[#34495e] p-[3px_20px] rounded w-[400px]'>
                        {chat.map((data, index) => <div key={index}>
                            <p className={`text-[24px] my-2 text-white ${data.received ? 'text-left' : 'text-right'}`} >{data.message}</p>
                        </div>)}
                    </div>
                </div>

                <MessageInput 
                    socket={socket}
                    message={message}
                    setMessage={setMessage}
                    setChat={setChat}
                />
             
            </div>
        </div>
    );
};

export default Home;