import React, { useState, useEffect } from 'react';
import { GlassCard, Button } from '../components/ui/Base';
import { Search, Heart, SignalLow, SignalMedium, SignalHigh, Timer, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { dataSource } from '../services/DataSource';
import { WorkoutPlan } from '../types';
import { cn } from '../lib/utils';

export function Workouts() {
  const [workouts, setWorkouts] = useState<WorkoutPlan[]>([]);
  const [category, setCategory] = useState('All Workouts');
  const [loading, setLoading] = useState(true);

  const categories = ['All Workouts', 'Strength', 'Cardio', 'Home', 'Gym', 'Yoga'];

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const data = await dataSource.getWorkouts(category);
      setWorkouts(data);
      setLoading(false);
    };
    load();
  }, [category]);

  const LevelIcon = ({ level }: { level: string }) => {
    switch (level) {
      case 'beginner': return <SignalLow size={14} className="text-surface-tint" />;
      case 'intermediate': return <SignalMedium size={14} className="text-secondary-fixed-dim" />;
      case 'advanced': return <SignalHigh size={14} className="text-secondary-fixed-dim" />;
      default: return null;
    }
  };

  return (
    <div className="px-container-padding py-lg space-y-lg">
      {/* Search */}
      <section>
        <div className="relative flex items-center group">
          <Search className="absolute left-4 text-on-surface-variant/40 group-focus-within:text-surface-tint transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Search workouts, trainers..." 
            className="w-full bg-white/5 border-none rounded-xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-surface-tint/50 transition-all placeholder:text-on-surface-variant/40"
          />
        </div>
      </section>

      {/* Categories */}
      <section className="overflow-x-auto no-scrollbar -mx-container-padding px-container-padding">
        <div className="flex gap-md pb-md">
          {categories.map(cat => (
            <button
               key={cat}
               onClick={() => setCategory(cat)}
               className={cn(
                 "px-lg py-sm rounded-full font-bold whitespace-nowrap transition-all duration-300",
                 category === cat 
                   ? "bg-surface-tint text-[#161e00] neon-glow-primary scale-105" 
                   : "glass-card text-on-surface hover:bg-white/10"
               )}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
        {workouts.map((w, i) => (
          <motion.div
            key={w.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            <GlassCard className="group cursor-pointer hover:scale-[1.02] transition-transform duration-300 p-0 border-none overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                 <img src={w.thumbnailUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={w.title} />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                 {i === 0 && (
                   <div className="absolute top-4 right-4 bg-surface-tint text-[#161e00] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">New</div>
                 )}
              </div>
              <div className="p-md space-y-md">
                <div className="flex justify-between items-start">
                  <h3 className="font-display text-xl font-bold">{w.title}</h3>
                  <button className="text-white/20 hover:text-white transition-colors">
                    <Heart size={20} />
                  </button>
                </div>
                <p className="text-sm text-on-surface-variant line-clamp-2">{w.description}</p>
                <div className="flex items-center gap-lg pt-sm border-t border-white/5">
                  <div className="flex items-center gap-xs">
                    <LevelIcon level={w.level} />
                    <span className="text-[10px] font-bold uppercase tracking-wider opacity-60">{w.level}</span>
                  </div>
                  <div className="flex items-center gap-xs">
                    <Timer size={14} className="text-secondary-fixed-dim" />
                    <span className="text-[10px] font-bold uppercase tracking-wider opacity-60">{w.duration} min</span>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </section>
    </div>
  );
}
