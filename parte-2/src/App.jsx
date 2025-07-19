import { useState } from 'react';
import ChatBox from './components/ChatBox'
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Imprementación Ollama</h1>
      <ChatBox/>
    </div>
  );
}

export default App;
