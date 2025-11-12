import React, { useState } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('Hello from React!');
  const messages = [
    'Hello from React!',
    'Web Fragments are awesome!',
    'This is a micro-frontend!',
    'React Fragment here!',
    'Greetings from the component!'
  ];

  const changeMessage = () => {
    const currentIndex = messages.indexOf(message);
    const nextIndex = (currentIndex + 1) % messages.length;
    setMessage(messages[nextIndex]);
  };

  return (
    <div className="greeting">
      <h3>{message}</h3>
      <button onClick={changeMessage}>Change Message</button>
    </div>
  );
}

export default App;
