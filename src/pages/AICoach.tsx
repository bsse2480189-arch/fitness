import React, { useState, useRef, useEffect } from 'react';
import { GlassCard, Button } from '../components/ui/Base';
import { Send, Bot, Mic, PlusCircle, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { aiService } from '../services/AiService';
import { useAuth } from '../hooks/useAuth';
import { cn } from '../lib/utils';

export function AICoach() {
  const { user } = useAuth();
  const [messages, setMessages] = useState([
    { role: 'model', parts: [{ text: `Good morning, ${user?.displayName?.split(' ')[0]}. I've analyzed your sleep data and previous workout load. You're primed for a high-intensity session today. Ready to crush some goals?` }] }
  ]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isThinking]);

  const handleSend = async () => {
    if (!input.trim() || isThinking) return;

    const userMsg = { role: 'user' as const, parts: [{ text: input }] };
    setMessages(prev => [...prev, userMsg]);
    const currentInput = input;
    setInput('');
    setIsThinking(true);

    try {
      // Mocked AI call or real if key exists
      const response = await aiService.chatWithCoach(currentInput, messages.map(m => ({
        role: m.role as 'user' | 'model',
        parts: m.parts
      })));
      
      setMessages(prev => [...prev, { role: 'model', parts: [{ text: response }] }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'model', parts: [{ text: "My sensors are experiencing some interference. Could you repeat that?" }] }]);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <div className="h-full flex flex-col pt-4">
      {/* Header */}
      <div className="px-container-padding flex flex-col items-center text-center space-y-md py-lg shrink-0">
        <div className="w-16 h-16 rounded-full glass-card flex items-center justify-center neon-glow-primary">
          <Bot size={32} className="text-surface-tint" />
        </div>
        <div className="flex items-center gap-sm">
           <h2 className="font-display text-xl font-bold">ForgeAI Assistant</h2>
           <span className="bg-surface-tint text-black text-[8px] font-black uppercase px-2 py-0.5 rounded-full tracking-widest leading-none">Pro</span>
        </div>
        <p className="text-xs text-on-surface-variant max-w-[240px]">Your personal elite coach, ready to optimize your performance.</p>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-container-padding space-y-lg pb-4">
        {messages.map((msg, i) => (
          <div key={i} className={cn(
            "flex items-start gap-md max-w-[85%]",
            msg.role === 'user' ? "self-end flex-row-reverse" : "self-start"
          )}>
            <div className={cn(
               "w-8 h-8 rounded-full shrink-0 flex items-center justify-center",
               msg.role === 'user' ? "bg-surface-tint/20 border border-surface-tint/20" : "bg-white/5 border border-white/10"
            )}>
              {msg.role === 'user' ? (
                <div className="w-full h-full rounded-full overflow-hidden">
                   <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvOH4E53zNhpfNYIBfrfw3s8cTuLDwWKOFoci-fTNedezK7x_uYlZ2gHsf7OqeWTcyZOfeKLmKJ5GOjBC2zRDKYQY7MRgzjjGICdVqTSP9QtaTbQ1141wAdriT5SKSYLrbi0U7GjmyjH-IwA5wRVgoHCB2DR0nXRT0fT7Qhw6oBMHb4UbuNV5AUFuMiL3DruKngcxR7Ee28Bb4JqO1e_s4-Zk-tA94bt0jgHr5GWHLzPr9QFXFZXrJjsyGwBDJhWpeJ_E6ndl9qm8" className="w-full h-full object-cover" />
                </div>
              ) : <Bot size={18} className="text-surface-tint" />}
            </div>
            <div className={cn(
              "p-md rounded-2xl",
              msg.role === 'user' ? "bg-surface-tint text-black rounded-tr-none" : "glass-card rounded-tl-none"
            )}>
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.parts[0].text}</p>
            </div>
          </div>
        ))}

        {isThinking && (
          <div className="flex items-start gap-md max-w-[85%]">
            <div className="w-8 h-8 rounded-full shrink-0 bg-white/5 border border-white/10 flex items-center justify-center">
               <Bot size={18} className="text-surface-tint" />
            </div>
            <div className="glass-card p-md rounded-2xl rounded-tl-none flex items-center gap-md">
               <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-surface-tint animate-pulse" />
                  <div className="w-1.5 h-1.5 rounded-full bg-surface-tint animate-pulse delay-150" />
                  <div className="w-1.5 h-1.5 rounded-full bg-surface-tint animate-pulse delay-300" />
               </div>
               <span className="text-[10px] uppercase font-bold italic opacity-40">Analyzing metrics...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-container-padding space-y-md shrink-0 bg-gradient-to-t from-black via-black/80 to-transparent">
        <div className="flex gap-sm overflow-x-auto no-scrollbar pb-sm">
           {['Generate a leg workout', 'Analyze my breakfast', 'Motivation needed'].map(txt => (
             <Button key={txt} variant="outline" size="sm" className="whitespace-nowrap bg-white/5 border-transparent text-[10px] font-bold uppercase tracking-wider" onClick={() => setInput(txt)}>
               {txt}
             </Button>
           ))}
        </div>
        <div className="relative group">
           <GlassCard className="p-1 rounded-2xl flex items-center gap-sm group-focus-within:border-surface-tint/50 transition-all border-white/5">
              <button className="w-10 h-10 flex items-center justify-center opacity-40 hover:opacity-100 transition-opacity">
                 <PlusCircle size={20} />
              </button>
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask ForgeAI anything..." 
                className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-md"
              />
              <div className="flex items-center gap-xs pr-sm">
                <button className="w-8 h-8 rounded-lg flex items-center justify-center opacity-40 hover:opacity-100 transition-opacity">
                   <Mic size={18} />
                </button>
                <button 
                  onClick={handleSend}
                  disabled={!input.trim() || isThinking}
                  className="w-10 h-10 bg-surface-tint text-black rounded-xl flex items-center justify-center shadow-lg disabled:opacity-50 active:scale-95 transition-all"
                >
                   <Send size={18} />
                </button>
              </div>
           </GlassCard>
        </div>
      </div>
    </div>
  );
}
