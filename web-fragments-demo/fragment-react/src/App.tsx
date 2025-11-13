import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
    const FRAGMENT_NAME = 'React';
    const [message, setMessage] = useState('Hello from React!');
    const [receivedMessage, setReceivedMessage] = useState<string | null>(null);
    const messages = [
        'Hello from React!',
        'Web Fragments are awesome!',
        'This is a micro-frontend!',
        'React Fragment here!',
        'Greetings from the component!',
    ];

    useEffect(() => {
        // Set up broadcast channel
        const bc = new BroadcastChannel('/fragment-events');

        const handleMessage = (event: MessageEvent) => {
            const { type, source } = event.data;
            if (type === 'fragment_broadcast') {
                if (source !== FRAGMENT_NAME) {
                    setReceivedMessage(`Event received from ${source}`);
                } else {
                    setReceivedMessage('');
                }
            }
        };

        bc.addEventListener('message', handleMessage);

        // Clean up on unmount
        return () => {
            bc.removeEventListener('message', handleMessage);
            bc.close();
        };
    }, []);

    const changeMessage = () => {
        const currentIndex = messages.indexOf(message);
        const nextIndex = (currentIndex + 1) % messages.length;
        setMessage(messages[nextIndex]);
    };

    const broadcastEvent = () => {
        const bc = new BroadcastChannel('/fragment-events');
        bc.postMessage({
            type: 'fragment_broadcast',
            source: FRAGMENT_NAME,
        });
        bc.close();
    };

    return (
        <div className="greeting">
            <h3>{message}</h3>
            <button onClick={changeMessage}>Change Message</button>
            <div className="broadcast-section">
                <button onClick={broadcastEvent}>Broadcast Event</button>
                {receivedMessage && (
                    <p className="message">{receivedMessage}</p>
                )}
            </div>
        </div>
    );
}

export default App;
