"use client"
import Image from 'next/image'; 
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import image from '../../../public/assets/learnicaAi.png';
import profile from '../../../public/assets/profile.png'

const Page = () => {
    const [messages, setMessages] = useState([
        { role: 'system', content: 'You are talking to AI.' }
    ]);
    const [input, setInput] = useState('');
    const chatEndRef = useRef(null);

    useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    const handleSendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { role: 'user', content: input };
        setMessages(prevMessages => [...prevMessages, userMessage]);
        setInput('');

        try {
            console.log("Using API Key:", process.env.NEXT_PUBLIC_OPENAI_API_KEY);

            const response = await axios.post(
                'https://api.openai.com/v1/chat/completions',
                {
                    model: 'gpt-4',
                    messages: [...messages, userMessage],
                },
                {
                    headers: {
                        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            const aiMessage = response.data.choices[0].message;
            setMessages(prevMessages => [...prevMessages, userMessage, aiMessage]);

        } catch (error) {
            console.error('Error sending message:', error);
            setMessages(prevMessages => [
                ...prevMessages,
                { role: 'assistant', content: "Sorry, something went wrong." }
            ]);
        }
    };

    return (
        <div className="container mx-auto">
            <div className="lg:flex grid gap-x-10">
                <div>
                    <div>
                        <Image alt="AI" src={image} />
                    </div>
                </div>
                <div className="my-20">
                    <div className="bg-blue-50 border rounded-2xl border-blue-600 lg:h-[550px] h-[400px] lg:w-[600px] flex flex-col relative">
                        <div className="rounded-2xl text-center bg-blue-600 h-12">
                            <h1 className="text-white text-center p-2 text-xl">Conversation Title</h1>
                        </div>

                        <div className="flex-grow overflow-auto p-4">
                            {messages.slice(1).map((msg, index) => (
                                <div key={index} className={msg.role === 'user' ? 'chat chat-end' : 'chat chat-start'}>
                                    <div className="chat-bubble">{msg.content}</div>
                                </div>
                            ))}
                            <div ref={chatEndRef} />
                        </div>

                        {/* input */}
                        <div className="relative p-4 border-t flex">
                           
                            <label className="flex input input-bordered  items-center w-full gap-2">
                                <input type="text"
                                className="w-full " 
                                placeholder="Type your Question....."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()} />
                                <Image
                                className='rounded-full w-10'
                                src={profile}
                                />
                            </label>
                            <button className="btn ml-2" onClick={handleSendMessage}>
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
