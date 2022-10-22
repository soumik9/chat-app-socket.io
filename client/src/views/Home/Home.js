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
            setChat((prev) => [...prev, data.message])
        })

    }, [socket])

    // messge send fn 
    const handleSend = (e) => {
        e.preventDefault();
        if (message) {
            socket.emit('send-message', { message });
        }
    }

    return (
        <div className='container mt-10'>
            <div className='w-[60%] mx-auto shadow-lg rounded-lg bg-[#10ac84] p-[15px_10px]'>


                <div className="flex justify-center mt-5">
                    <div className='bg-[#34495e] p-[3px_20px] rounded w-[400px]'>
                        {chat.map((message, index) => <div key={index}>
                            <p className='text-[24px] my-2 text-white' >{message}</p>
                        </div>)}
                    </div>
                </div>

                <MessageInput 
                    socket={socket}
                    message={message}
                    setMessage={setMessage}
                />
             
            </div>
        </div>
    );
};

export default Home;