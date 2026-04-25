import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Bot, User, Loader2 } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { BUSINESS_INFO, SERVICES } from '../constants/data';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

interface Message {
  role: 'user' | 'model';
  content: string;
}

const SYSTEM_PROMPT = `You are the Ammar Digital AI Assistant. Your goal is to guide visitors "A to Z" about Ammar Digital's services, capabilities, and business info.
Keep responses concise, professional, and slightly futuristic/cyberpunk in tone. Output your response in a clean text format without markdown formatting.

Business Info:
Email: ${BUSINESS_INFO.email}
Phone: ${BUSINESS_INFO.phone}
Location: ${BUSINESS_INFO.address}
About: ${BUSINESS_INFO.aboutBio}

Key Services:
${SERVICES.map(s => `- ${s.title}: ${s.description}`).join('\n')}

Guide the user based on their questions, recommend services, and suggest they go to the "Order Protocol" page (/order) when they are ready.`;

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', content: "SYSTEM ONLINE. I am the Ammar Digital AI Operator. How may I direct your query today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      const history = messages.map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`).join('\n');
      const prompt = `${SYSTEM_PROMPT}\n\nConversation History:\n${history}\n\nUser: ${userMsg}\nAssistant:`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });

      setMessages(prev => [...prev, { role: 'model', content: response.text || 'Error processing request.' }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { role: 'model', content: "SYSTEM ERROR: Unable to process request at this time." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="w-14 h-14 bg-accent text-white rounded-full shadow-[0_0_20px_rgba(0,0,0,0.2)] flex items-center justify-center hover:scale-110 transition-transform hidden md:flex shrink-0"
            aria-label="Open AI Assistant"
          >
            <Bot size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Mobile Floating Button */}
      {!isOpen && (
         <button
         onClick={() => setIsOpen(true)}
         className="w-14 h-14 bg-accent text-white rounded-full shadow-[0_0_20px_rgba(0,0,0,0.2)] flex items-center justify-center md:hidden shrink-0"
         aria-label="Open AI Assistant"
       >
         <Bot size={24} />
       </button>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="absolute bottom-16 right-0 md:right-16 z-50 w-[calc(100vw-3rem)] md:w-96 h-[500px] max-h-[70vh] flex flex-col bg-background border border-foreground/20 rounded-2xl shadow-2xl overflow-hidden overscroll-contain origin-bottom-right"
          >
            {/* Header */}
            <div className="p-4 border-b border-foreground/10 bg-foreground/5 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                  <Bot size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-sm tracking-widest text-foreground uppercase">Operator AI</h3>
                  <p className="text-[10px] text-accent flex items-center gap-1 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> Online
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-foreground/10 rounded-lg transition-colors text-foreground/60 hover:text-foreground"
              >
                <X size={18} />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-background z-10 overscroll-contain">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    msg.role === 'user' ? 'bg-foreground/10 text-foreground' : 'bg-accent/10 text-accent'
                  }`}>
                    {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                  </div>
                  <div className={`max-w-[80%] rounded-2xl p-3 text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-foreground/10 text-foreground rounded-tr-sm' 
                      : 'bg-foreground/5 border border-foreground/10 text-foreground rounded-tl-sm'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-accent/10 text-accent flex items-center justify-center shrink-0">
                    <Bot size={14} />
                  </div>
                  <div className="bg-foreground/5 border border-foreground/10 text-foreground rounded-2xl rounded-tl-sm p-3 flex items-center gap-2">
                    <Loader2 size={14} className="animate-spin text-accent" />
                    <span className="text-xs tracking-widest uppercase font-bold text-foreground/50">Processing</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-foreground/10 bg-background shrink-0 z-20">
              <form 
                onSubmit={e => { e.preventDefault(); handleSend(); }}
                className="flex items-center gap-2 relative bg-foreground/5 rounded-xl border border-foreground/10 hover:border-accent/50 focus-within:border-accent focus-within:bg-background transition-colors overflow-hidden shadow-inner"
              >
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Type your query..."
                  className="flex-1 bg-transparent py-3 pl-4 pr-12 text-sm focus:outline-none text-foreground placeholder:text-foreground/50"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="absolute right-0 top-0 bottom-0 px-3 text-foreground/50 hover:text-accent disabled:opacity-50 disabled:hover:text-foreground/50 transition-colors flex items-center justify-center"
                >
                  <Send size={18} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
