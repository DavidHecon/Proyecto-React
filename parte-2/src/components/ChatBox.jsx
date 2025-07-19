import { useState } from "react";
import axios from "axios";
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

const ChatBox = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSend = async () => {
  if (!message.trim()) return;

  const userMessage = { role: 'user', content: message };
  setMessages(prev => [...prev, userMessage]); // Mostrar mensaje del usuario de inmediato
  setMessage(''); // Limpiar input al presionar Enter o botón

  try {
    const response = await axios.post('http://localhost:11434/api/generate', {
      model: 'deepseek-r1:1.5b',
      prompt: message,
      stream: false
    });

    const rawReply = response.data.response || 'Sin respuesta';
    const botReply = rawReply.replace(/<think>[\s\S]*?<\/think>/gi, '').trim();

    setMessages(prev => [...prev, { role: 'assistant', content: botReply }]); // Agregar respuesta de la IA
  } catch (error) {
    console.error('Error al enviar mensaje', error);
    alert('Ocurrió un error al comunicar con Ollama');
  }
};

  return (
    <div>
      <div style={{ maxHeight: '400px', overflow: 'auto', marginBottom: '1rem' }}>
        {messages.map((m, i) => (
  <div
    key={i}
    style={{
      textAlign: m.role === 'user' ? 'right' : 'left',
      marginBottom: '1rem',
      padding: '0.5rem 1rem',
      borderRadius: '10px',
      maxWidth: '80%',
      alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start'
    }}
  >
    <b>{m.role === 'user' ? 'Tú' : 'IA'}:</b>{' '}
    <ReactMarkdown
      children={m.content}
      remarkPlugins={[remarkMath]}
      rehypePlugins={[rehypeKatex]}
    />
  </div>
))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        placeholder="Escribe un mensaje..."
        style={{ width: '80%' }}
      />
      <button onClick={handleSend} style={{ marginTop: '1rem' }}>Enviar</button>
    </div>
  );
};

export default ChatBox;
