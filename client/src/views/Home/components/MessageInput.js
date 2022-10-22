import React, { useState } from 'react'
import { AiOutlineSend } from 'react-icons/ai'

function MessageInput({ socket, message, setMessage, setChat, isTyping }) {

    const [typingTimeout, setTypingTimeout] = useState(null);

    // messge send fn 
    const handleSend = (e) => {
        e.preventDefault();
        if (message) {
            socket.emit('send-message', { message });
            setChat((prev) => [...prev, { message, received: false }]);
            setMessage('')
        }
    }

    // onchange input
    const handleInput = (e) => {

        setMessage(e.target.value);
        socket.emit('typing-started');

        if(typingTimeout){ clearTimeout(typingTimeout) }

        // debounce effect
        setTypingTimeout(setTimeout(() => {
            socket.emit('typing-stopped');
        }, 1000)) 
    }

    return (
        <div className="flex justify-center">
            <form className='mt-5 w-full' onSubmit={handleSend}>

                <div class="w-full">
                    {isTyping && <label htmlFor="message" className='text-white '>Typing...</label>}
                    <div className={`flex ${isTyping && 'mt-1'} `}>
                        <input
                            value={message}
                            type="text"
                            id="message"
                            className={`w-full px-4 py-2 outline-none border-0 focus:outline-none focus:text-gray-600 `}
                            placeholder="Type message"
                            onChange={handleInput}
                        />
                        <button type='submit' className="w-[40px] flex justify-center items-center bg-gray-100 group hover:bg-[#2d98da]">
                            <AiOutlineSend className='group-hover:text-white mt-[1px] ml-1' />
                        </button>
                    </div>

                </div>
            </form>
        </div>
    )
}

export default MessageInput