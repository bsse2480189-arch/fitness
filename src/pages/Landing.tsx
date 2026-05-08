import React from 'react';
import { Button } from '../components/ui/Base';
import { motion } from 'motion/react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Zap, ShieldCheck, Activity } from 'lucide-react';

export function Landing() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleStart = async () => {
    await login('demo@fitforge.com');
    navigate('/');
  };

  return (
    <div className="relative h-screen w-full flex flex-col justify-end bg-black overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCDRAIsFPz7WHIHWFGEDIUcStyQThZ5iU2Z16QuqkrXGBaL9WcKI2gIyN4g2ybpu7gpDS90GcN4ETyhYgXk1DRkMKKaOoc5LIAWqZuSytriRH_lmssvrluX2m0P2w624EqoukpfGQZx1ISGsid-GDOGul4TDnOocR1PsM_Hew34A69gySyzunPDPND-_8b4lRjq1MkGpKk-ZzOgKfUNlb0Sjdjr1o6Ft58iHVjAwmCiFn7UbSEoQgzAVUjVVzTj4HJewOJ7RIpbs84" 
          className="w-full h-full object-cover grayscale opacity-60" 
          alt="Athlete"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      </div>

      {/* Floating Logo */}
      <header className="absolute top-0 w-full z-50 flex justify-between items-center px-container-padding h-24">
         <div className="flex items-center gap-2">
           <div className="w-8 h-8 bg-surface-tint rounded-lg flex items-center justify-center">
             <div className="w-4 h-4 bg-black rotate-45"></div>
           </div>
           <h1 className="font-display text-xl font-bold tracking-tight uppercase">FitForge<span className="text-surface-tint">Pro</span></h1>
         </div>
         <button className="text-xs font-bold uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity">Skip</button>
      </header>

      {/* Hero Content */}
      <main className="relative z-10 px-container-padding pb-xxl space-y-lg max-w-xl mx-auto w-full">
         <div className="space-y-sm">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display text-5xl font-black leading-none"
            >
               Forge Your<br />Best Self
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-on-surface-variant max-w-[85%]"
            >
               Experience the future of fitness with AI-driven workout engineering tailored to your unique physiology.
            </motion.p>
         </div>

         {/* Features Bento */}
         <div className="grid grid-cols-2 gap-md">
            <FeatureCard icon={<Zap size={18} fill="currentColor" />} title="Dynamic AI" desc="Real-time adjustments" />
            <FeatureCard icon={<Activity size={18} />} title="Biometrics" desc="Precision tracking" />
         </div>

         <div className="pt-md space-y-xl">
            <Button onClick={handleStart} className="w-full py-lg text-lg uppercase tracking-widest font-black shadow-2xl">
               Get Started
            </Button>
            
            <div className="flex justify-center items-center gap-xs">
              <div className="h-0.5 w-8 bg-surface-tint rounded-full" />
              <div className="h-0.5 w-2 bg-white/20 rounded-full" />
              <div className="h-0.5 w-2 bg-white/20 rounded-full" />
            </div>
         </div>
      </main>

      <footer className="relative z-10 py-lg text-center">
         <p className="text-xs text-on-surface-variant">
           Already have an account? <button onClick={handleStart} className="text-white font-bold underline underline-offset-4">Log in</button>
         </p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: any) {
  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-md space-y-1">
       <div className="text-surface-tint mb-1">{icon}</div>
       <h4 className="font-bold text-xs">{title}</h4>
       <p className="text-[10px] text-on-surface-variant">{desc}</p>
    </div>
  );
}
