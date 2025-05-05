import { useState, useEffect, useRef } from 'react';
import { FaPaperPlane, FaRobot, FaBrain, FaExclamationTriangle } from 'react-icons/fa';
export default function VirtualAgent({ onClose }) {
  const [messages, setMessages] = useState([
    { from: 'agent', text: "👋 Hi! I'm your assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef(null);
  const [sessionId, setSessionId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeModel, setActiveModel] = useState('servicenow'); // 'servicenow' or 'gemini'
  const [error, setError] = useState(null);

  // Auto-scroll on message update
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Start session on mount or model switch
  useEffect(() => {
    if (activeModel === 'servicenow') {
      startSession();
    }
  }, [activeModel]);

  const startSession = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/va/start', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to start session');
      }

      if (data.result?.session_id) {
        setSessionId(data.result.session_id);
      } else {
        throw new Error('No session ID received');
      }
    } catch (error) {
      console.error('Error starting session:', error);
      setError('Failed to start Virtual Agent session');
      setMessages((prev) => [...prev, { 
        from: 'agent', 
        text: '⚠️ Could not start session. Please try again later.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    if (activeModel === 'servicenow' && !sessionId) {
      setError('Session not initialized');
      return;
    }

    const userMessage = { from: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      let botReply;
      
      if (activeModel === 'servicenow') {
        // ServiceNow VA logic
        const response = await fetch('/api/va/message', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            session_id: sessionId,
            user_input: currentInput,
          }),
        });

        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to get response');
        }

        botReply = data.result?.output?.text || '🤖 Sorry, I didn\'t get that.';
      } else {
        // Gemini API logic
        const response = await fetch(process.env.NEXT_PUBLIC_GEMINI_API_URL || 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: currentInput
              }]
            }]
          })
        });

        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error?.message || 'Failed to get response from Gemini');
        }

        botReply = data.candidates?.[0]?.content?.parts?.[0]?.text || 
                  '🤖 Sorry, I had trouble generating a response.';
      }
      
      setMessages((prev) => [...prev, { from: 'agent', text: botReply }]);
    } catch (error) {
      console.error('Error sending message:', error);
      setError(error.message);
      setMessages((prev) => [...prev, { 
        from: 'agent', 
        text: `⚠️ Error: ${error.message || 'Failed to get response'}` 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !isLoading) sendMessage();
  };

  const toggleModel = () => {
    const newModel = activeModel === 'servicenow' ? 'gemini' : 'servicenow';
    setActiveModel(newModel);
    setMessages([{ 
      from: 'agent', 
      text: `👋 Hi! I'm your ${newModel === 'gemini' ? 'Gemini' : 'ServiceNow'} assistant. How can I help?` 
    }]);
    setError(null);
  };

  return (
    <div className="fixed bottom-20 right-6 w-96 h-[600px] rounded-3xl overflow-hidden shadow-lg z-50 flex flex-col font-sans border border-gray-200 bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#00B4D8] to-[#0077B6] text-white px-5 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-bold">Virtual Assistant</h2>
          <button 
            onClick={toggleModel}
            className="text-xs bg-white/20 p-1 rounded-md flex items-center gap-1 hover:bg-white/30 transition"
            title={`Switch to ${activeModel === 'servicenow' ? 'Gemini' : 'ServiceNow'} model`}
            disabled={isLoading}
          >
            {activeModel === 'servicenow' ? <FaBrain /> : <FaRobot />}
            {activeModel === 'servicenow' ? 'Gemini' : 'ServiceNow'}
          </button>
        </div>
        <button
          onClick={onClose}
          className="text-2xl font-light hover:scale-110 transform transition"
          disabled={isLoading}
        >
          &times;
        </button>
      </div>

      {/* Chat Body */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-gradient-to-b from-white via-[#f8fbfc] to-white">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`max-w-[80%] px-4 py-2 text-sm rounded-2xl shadow ${
              msg.from === 'agent'
                ? 'bg-white border border-gray-200 text-gray-800 self-start'
                : 'bg-[#0077B6] text-white self-end ml-auto'
            }`}
          >
            {msg.text}
          </div>
        ))}
        {isLoading && (
          <div className="max-w-[80%] px-4 py-2 text-sm rounded-2xl shadow bg-white border border-gray-200 text-gray-800 self-start">
            <div className="flex space-x-2">
              <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
              <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        )}
        {error && (
          <div className="flex items-center gap-2 text-red-500 text-xs p-2">
            <FaExclamationTriangle /> {error}
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <div className="flex items-center gap-3 p-3 bg-white border-t border-gray-200">
        <input
          type="text"
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0077B6] transition"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
        />
        <button
          onClick={sendMessage}
          disabled={isLoading || !input.trim()}
          className={`bg-gradient-to-r from-[#00B4D8] to-[#0077B6] text-white p-2 rounded-full transition transform shadow-md ${
            isLoading || !input.trim() ? 'opacity-50' : 'hover:scale-105'
          }`}
        >
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
}