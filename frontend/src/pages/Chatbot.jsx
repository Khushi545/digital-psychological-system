import React, { useState, useEffect, useRef } from 'react';
import api from '../api';
import { Send, Info, Bot } from 'lucide-react';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', text: "Hello! I'm your AI wellness companion. I'm here to listen and provide support. How are you feeling today?", timestamp: '10:30 AM' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', text: input, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await api.post('/chat', { message: input });
      setMessages(prev => [...prev, { role: 'assistant', text: res.data.response, isCrisis: res.data.isCrisis, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', text: 'I am taking a moment to process. Please try again later.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', height: '100%', paddingBottom: '2rem' }}>
      
      {/* Header */}
      <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderRadius: '999px', padding: '1rem 1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ backgroundColor: 'var(--primary)', color: 'white', padding: '0.5rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Bot size={20} />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '1rem', color: 'var(--secondary)' }}>AI Support Companion</h3>
            <div style={{ fontSize: '0.75rem', color: 'var(--success)', fontWeight: 'bold', letterSpacing: '1px', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <span style={{ width: '6px', height: '6px', backgroundColor: 'var(--success)', borderRadius: '50%', display: 'inline-block' }}></span> ALWAYS LISTENING
            </div>
          </div>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: '600', backgroundColor: 'var(--primary-light)', padding: '0.4rem 1rem', borderRadius: '999px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ width: '12px', height: '14px', border: '1.5px solid var(--primary)', borderRadius: '0 0 6px 6px', borderTop: 'none', position: 'relative' }}><span style={{ position: 'absolute', top: '-6px', left: '1px', width: '8px', height: '6px', border: '1.5px solid var(--primary)', borderRadius: '4px 4px 0 0', borderBottom: 'none' }}></span></span> Anonymous Session
          </span>
          <Info size={20} color="var(--text-muted)" style={{ cursor: 'pointer' }} />
        </div>
      </div>

      {/* Chat Area */}
      <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', borderRadius: '24px', padding: 0 }}>
        
        <div style={{ flex: 1, overflowY: 'auto', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {messages.map((m, idx) => (
            <div key={idx} style={{ alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '75%', display: 'flex', gap: '1rem' }}>
              
              {m.role === 'assistant' && (
                <div style={{ backgroundColor: 'var(--primary-light)', color: 'var(--primary)', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Bot size={18} />
                </div>
              )}
              
              <div>
                <div style={{ 
                  backgroundColor: m.isCrisis ? '#fef2f2' : (m.role === 'user' ? 'var(--primary)' : 'var(--bg-main)'),
                  color: m.isCrisis ? '#991b1b' : (m.role === 'user' ? 'white' : 'var(--text-primary)'), 
                  padding: '1rem 1.25rem', 
                  borderRadius: m.role === 'user' ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
                  boxShadow: 'var(--shadow-sm)',
                  border: m.isCrisis ? '2px solid #f87171' : '1px solid var(--border-light)'
                }}>
                  {m.text}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem', textAlign: m.role === 'user' ? 'right' : 'left' }}>
                  {m.timestamp}
                </div>
              </div>
            </div>
          ))}
          {loading && (
            <div style={{ alignSelf: 'flex-start', display: 'flex', gap: '1rem' }}>
              <div style={{ backgroundColor: 'var(--primary-light)', padding: '1rem 1.25rem', borderRadius: '20px 20px 20px 4px' }}>
                <span className="typing-dots">Typing...</span>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input Area */}
        <div style={{ padding: '1.5rem', borderTop: '1px solid var(--border-light)', backgroundColor: 'var(--bg-card)' }}>
          <form onSubmit={handleSend} style={{ display: 'flex', gap: '1rem', backgroundColor: 'var(--primary-light)', borderRadius: '999px', padding: '0.5rem 0.5rem 0.5rem 1.5rem', alignItems: 'center' }}>
            <span style={{ color: 'var(--primary)', fontSize: '1.2rem', fontWeight: 'bold' }}>⚡</span>
            <input 
              type="text" 
              value={input} 
              onChange={e => setInput(e.target.value)} 
              placeholder="Type how you're feeling..." 
              style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', color: 'var(--primary)', fontSize: '1rem' }}
            />
            <button type="submit" style={{ backgroundColor: 'var(--primary)', color: 'white', border: 'none', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} disabled={loading}>
              <Send size={18} />
            </button>
          </form>
          <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '1rem', marginBottom: 0 }}>
            MindEase AI is a support tool, not a clinical replacement. In emergencies, please call local services.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
