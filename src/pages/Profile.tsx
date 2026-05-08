import React from 'react';
import { GlassCard, Button } from '../components/ui/Base';
import { Settings, Shield, LogOut, ChevronRight, Crown, Star, CreditCard, Gift, HelpCircle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { motion } from 'motion/react';

export function Profile() {
  const { user, logout } = useAuth();

  return (
    <div className="px-container-padding py-lg space-y-lg max-w-2xl mx-auto">
      {/* Header */}
      <section className="flex flex-col items-center text-center space-y-md">
        <div className="relative group">
           <div className="w-24 h-24 rounded-full p-1 bg-surface-tint neon-glow-primary">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvOH4E53zNhpfNYIBfrfw3s8cTuLDwWKOFoci-fTNedezK7x_uYlZ2gHsf7OqeWTcyZOfeKLmKJ5GOjBC2zRDKYQY7MRgzjjGICdVqTSP9QtaTbQ1141wAdriT5SKSYLrbi0U7GjmyjH-IwA5wRVgoHCB2DR0nXRT0fT7Qhw6oBMHb4UbuNV5AUFuMiL3DruKngcxR7Ee28Bb4JqO1e_s4-Zk-tA94bt0jgHr5GWHLzPr9QFXFZXrJjsyGwBDJhWpeJ_E6ndl9qm8" 
                className="w-full h-full rounded-full object-cover border-2 border-black" 
                alt="Profile" 
              />
           </div>
           <button className="absolute bottom-0 right-0 p-1.5 bg-surface-tint text-black rounded-full border-2 border-black shadow-lg">
             <Settings size={14} />
           </button>
        </div>
        <div>
           <h2 className="font-display text-2xl font-bold">{user?.displayName}</h2>
           <p className="text-sm text-on-surface-variant">Pro Member • Level 42</p>
        </div>
      </section>

      {/* Subscription Card */}
      <section>
        <GlassCard className="p-0 border-none overflow-hidden group">
          <div className="bg-surface-tint p-lg text-black flex justify-between items-center relative overflow-hidden">
             <Crown className="absolute -right-4 -top-4 w-24 h-24 opacity-10 group-hover:rotate-12 transition-transform" />
             <div className="space-y-1">
                <h3 className="font-display font-black text-xl uppercase tracking-tighter italic">FitForge Pro+</h3>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-80">Active Annual Plan</p>
             </div>
             <Button variant="ghost" size="sm" className="bg-black/10 hover:bg-black/20 border border-black/20 text-black font-bold">MANAGE</Button>
          </div>
          <div className="p-md bg-white/5 space-y-md">
             <div className="flex justify-between items-center text-xs">
                <span className="opacity-60 text-[10px] font-bold uppercase tracking-widest">Next Billing</span>
                <span className="font-bold">Oct 12, 2026</span>
             </div>
             <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="bg-surface-tint h-full w-2/3 rounded-full" />
             </div>
          </div>
        </GlassCard>
      </section>

      {/* Options */}
      <section className="space-y-sm">
        <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-on-surface-variant px-sm">General</h4>
        <div className="space-y-2">
           <OptionRow icon={<CreditCard size={18} />} title="Billing & Payments" />
           <OptionRow icon={<Gift size={18} />} title="Referral Rewards" subtitle="Earn tokens for every invite" />
           <OptionRow icon={<Shield size={18} />} title="Privacy & Security" />
           <OptionRow icon={<HelpCircle size={18} />} title="Help & Support" />
        </div>
      </section>

      <section className="pt-xl pb-10">
        <Button 
          variant="outline" 
          className="w-full border-red-500/20 text-red-400 hover:bg-red-500/10 gap-md py-lg"
          onClick={logout}
        >
          <LogOut size={20} /> Logout
        </Button>
        <p className="text-center text-[10px] text-on-surface-variant mt-lg uppercase tracking-widest opacity-40">FitForge Pro v2.4.0</p>
      </section>
    </div>
  );
}

function OptionRow({ icon, title, subtitle }: { icon: React.ReactNode, title: string, subtitle?: string }) {
  return (
    <GlassCard className="p-md cursor-pointer hover:bg-white/10 transition-colors flex items-center justify-between border-transparent group">
       <div className="flex items-center gap-md">
          <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-on-surface-variant group-hover:text-surface-tint transition-colors">
            {icon}
          </div>
          <div>
             <h4 className="font-bold text-sm">{title}</h4>
             {subtitle && <p className="text-[10px] text-on-surface-variant">{subtitle}</p>}
          </div>
       </div>
       <ChevronRight size={18} className="opacity-20 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
    </GlassCard>
  );
}
