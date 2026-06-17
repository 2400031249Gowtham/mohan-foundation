'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Bot, Send } from 'lucide-react';

type Message = {
  id: string;
  role: 'bot' | 'user';
  text: string;
};

const SUGGESTIONS = [
  "Course Information",
  "Admission Process",
  "CPD Courses",
  "Contact Us",
  "Certificate Details",
  "Fees Information"
];

const MOCK_RESPONSES: Record<string, string> = {
  "Course Information": "You can explore our available courses from the Courses section.",
  "Admission Process": "Our admission process is simple. Apply online through the 'Apply Now' button in the header, and our team will get in touch with you.",
  "CPD Courses": "We offer various CPD-accredited courses including Transplant Coordination, Brainstem Death, and more.",
  "Contact Us": "You can reach us at elearning@mohanfoundation.org or call our Toll Free number at 1800-103-7100.",
  "Certificate Details": "Certificates are awarded upon successful completion of the course requirements and assessments.",
  "Fees Information": "Fee structures vary depending on the course. Please select a specific course from our catalog for detailed pricing."
};

export default function Chatbot() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'bot', text: 'Hello! I am the Mohan AI Assistant. How can I help you today?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  if (!mounted) return null;

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = { id: Date.now().toString(), role: 'user', text };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Mock processing delay
    setTimeout(() => {
      let botText = "I'm a frontend mock bot! I don't have a real backend connected, so I can only answer the suggested questions.";
      const matchedKey = Object.keys(MOCK_RESPONSES).find(key => text.toLowerCase().includes(key.toLowerCase()));
      if (matchedKey) {
        botText = MOCK_RESPONSES[matchedKey];
      }

      setMessages(prev => [...prev, { id: Date.now().toString() + 'bot', role: 'bot', text: botText }]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-[#203c7c] hover:bg-blue-900 text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 z-50 group"
          aria-label="Open Chatbot"
        >
          <MessageCircle size={28} className="group-hover:scale-110 transition-transform duration-300" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-[90vw] sm:w-96 bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.12)] border border-gray-100 overflow-hidden flex flex-col z-50 transition-all duration-300 animate-in fade-in slide-in-from-bottom-5" style={{ height: '500px', maxHeight: '80vh' }}>
          
          {/* Header */}
          <div className="bg-[#203c7c] text-white px-4 py-3 flex items-center justify-between shadow-md relative z-10">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot size={20} />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-[#203c7c]"></span>
              </div>
              <div>
                <h3 className="font-bold text-sm">Mohan AI Assistant</h3>
                <p className="text-xs text-blue-200 leading-none mt-0.5">Online</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white transition-colors p-1" aria-label="Close Chat">
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 bg-[#f9fafb] flex flex-col gap-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm shadow-sm ${msg.role === 'user' ? 'bg-[#d3222a] text-white rounded-br-none' : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Questions (Chips) */}
          {!isTyping && (
            <div className="px-4 py-2 bg-white border-t border-gray-100 overflow-x-auto whitespace-nowrap scrollbar-hide flex gap-2">
              {SUGGESTIONS.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => handleSend(suggestion)}
                  className="inline-block px-3 py-1.5 bg-[#f4f7fb] hover:bg-[#e8ecf4] text-[#203c7c] text-xs rounded-full transition-colors border border-blue-100 flex-shrink-0 font-medium"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}

          {/* Input Area */}
          <div className="p-3 bg-white border-t border-gray-100">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend(inputValue)}
                placeholder="Type your message..."
                className="flex-1 bg-[#f9fafb] border border-gray-200 text-sm rounded-full px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#203c7c] transition-shadow"
                maxLength={200}
              />
              <button
                onClick={() => handleSend(inputValue)}
                disabled={!inputValue.trim()}
                className="w-10 h-10 bg-[#203c7c] disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-900 text-white rounded-full flex items-center justify-center transition-colors flex-shrink-0"
                aria-label="Send message"
              >
                <Send size={16} className="ml-0.5" />
              </button>
            </div>
            {/* Character counter (optional) */}
            <div className="text-[10px] text-gray-400 text-right mt-1 px-2">
              {inputValue.length}/200
            </div>
          </div>

        </div>
      )}

      {/* Global styles for hide-scrollbar */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}</style>
    </>
  );
}
