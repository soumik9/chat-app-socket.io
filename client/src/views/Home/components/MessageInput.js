import React from 'react'
import { AiOutlineSend } from 'react-icons/ai'

function MessageInput({ socket, message, setMessage }) {

    // messge send fn 
    const handleSend = (e) => {
        e.preventDefault();
        if (message) {
            socket.emit('send-message', { message });
        }
    }

    return (
        <div className="flex justify-center">
            <form className='mt-5 w-full' onSubmit={handleSend}>

                <div class="inline-flex w-full">
                    <input
                        value={message}
                        type="text"
                        className="w-full px-4 py-2 outline-none border-0 focus:outline-none focus:text-gray-600"
                        placeholder="Type message"
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button type='submit' className="w-[40px] flex justify-center items-center bg-gray-100 group hover:bg-[#2d98da]">
                        <AiOutlineSend className='group-hover:text-white mt-[1px] ml-1' />
                    </button>
                </div>
            </form>
        </div>
    )
}

export default MessageInput