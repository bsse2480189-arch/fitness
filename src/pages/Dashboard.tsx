import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { GlassCard, ProgressRing, Button } from '../components/ui/Base';
import { Calendar, CheckCircle2, Circle, Flame, Droplets, Scale, Timer, Play } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { dataSource } from '../services/DataSource';
import { UserProfile } from '../types';
import { cn } from '../lib/utils';

export function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats] = useState({
    calories: 1840,
    caloriesGoal: 2500,
    steps: 9200,
    stepsGoal: 10000,
    water: 1.8,
    waterGoal: 3.0,
    weight: 78.4,
    weightTarget: 75.0,
  });

  const goals = [
    { id: 1, text: 'Morning Yoga Session', completed: true },
    { id: 2, text: 'Hit 100g Protein', completed: false },
    { id: 3, text: '2L Water Intake', completed: false },
  ];

  return (
    <div className="p-container-padding py-lg space-y-xl pb-32">
      {/* Elegant Header */}
      <header className="flex justify-between items-start pt-md">
        <div>
          <h2 className="text-3xl font-display font-bold tracking-tight">Morning <span className="text-surface-tint">Overview</span></h2>
          <p className="text-sm text-slate-500">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
        </div>
        <div className="relative">
           <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-surface-tint/20 p-0.5">
              <img src={user?.photoURL || `https://ui-avatars.com/api/?name=${user?.displayName}&background=CCFF00&color=000`} className="w-full h-full rounded-full object-cover" />
           </div>
           <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-surface-tint border-2 border-[#0A0A0A] rounded-full"></span>
        </div>
      </header>

      {/* Main Stats Grid */}
      <section className="grid grid-cols-2 gap-md">
        <GlassCard className="col-span-2 p-6 rounded-3xl flex items-center justify-between relative overflow-hidden" glow>
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-surface-tint/10 blur-[80px] rounded-full"></div>
          <div className="space-y-sm relative z-10">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Daily Progress</p>
            <h3 className="text-4xl font-display font-black leading-none">{Math.round((stats.calories / stats.caloriesGoal) * 100)}%</h3>
            <p className="text-xs text-slate-400">Calories: {stats.calories} / {stats.caloriesGoal} kcal</p>
          </div>
          <div className="relative z-10">
            <ProgressRing progress={(stats.calories / stats.caloriesGoal) * 100} size={100} strokeWidth={10} />
          </div>
        </GlassCard>

        <StatMiniCard icon={<Flame className="text-orange-400" />} label="Move" value="482" unit="kcal" />
        <StatMiniCard icon={<Timer className="text-cyan-400" />} label="Exercise" value="42" unit="min" />
        <StatMiniCard icon={<Droplets className="text-blue-400" />} label="Hydration" value={stats.water.toString()} unit="L" />
        <StatMiniCard icon={<Scale className="text-purple-400" />} label={stats.weight > stats.weightTarget ? "Burn" : "Gain"} value={Math.abs(stats.weight - stats.weightTarget).toFixed(1)} unit="kg" />
      </section>

      {/* Today's Workout */}
      <section className="space-y-md">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-display font-bold">Today's <span className="text-surface-tint">Forge</span></h3>
          <button className="text-xs text-slate-500 hover:text-slate-300">View Plan</button>
        </div>
        <GlassCard className="p-0 overflow-hidden border-none rounded-3xl">
          <div className="relative aspect-[16/9] w-full group">
            <img 
              src="https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&w=800" 
              className="absolute inset-0 w-full h-full object-cover grayscale brightness-50 group-hover:scale-105 transition-transform duration-700" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end text-white">
              <div className="space-y-xs">
                <span className="text-[10px] font-bold uppercase tracking-widest bg-surface-tint text-black px-2 py-0.5 rounded">High Intensity</span>
                <h4 className="text-2xl font-display font-bold">Power Leg Burner</h4>
                <div className="flex items-center gap-md text-xs opacity-80">
                  <span className="flex items-center gap-1"><Timer size={14} /> 45 min</span>
                  <span className="flex items-center gap-1"><Flame size={14} /> 620 kcal</span>
                </div>
              </div>
              <button className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-xl">
                <Play size={24} fill="currentColor" className="ml-1" />
              </button>
            </div>
          </div>
        </GlassCard>
      </section>

      {/* Goals Section */}
      <section className="space-y-md">
        <h3 className="text-xl font-display font-bold">Priority <span className="text-surface-tint">Tasks</span></h3>
        <div className="space-y-sm">
          {goals.map(goal => (
            <GlassCard key={goal.id} className="p-4 flex items-center gap-md rounded-2xl">
              <div className={cn(
                "w-6 h-6 rounded-full flex items-center justify-center border-2 transition-colors",
                goal.completed ? "bg-surface-tint border-surface-tint text-black" : "border-white/10"
              )}>
                {goal.completed && <CheckCircle2 size={14} strokeWidth={3} />}
              </div>
              <span className={cn("text-sm", goal.completed ? "text-slate-400 line-through" : "text-slate-100")}>{goal.text}</span>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* FAB AI */}
      <button 
        onClick={() => navigate('/ai-coach')}
        className="fixed right-6 bottom-24 w-14 h-14 bg-surface-tint text-[#161e00] rounded-full shadow-2xl flex items-center justify-center z-50 neon-glow-primary active:scale-95 transition-transform group"
      >
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-surface-tint opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-surface-tint border-2 border-black"></span>
        </span>
        <Flame size={24} className="group-hover:scale-110 transition-transform" />
      </button>
    </div>
  );
}

function StatMiniCard({ icon, label, value, unit }: { icon: React.ReactNode, label: string, value: string, unit: string }) {
  return (
    <GlassCard className="p-4 rounded-2xl flex flex-col gap-xs">
       <div className="flex justify-between items-center opacity-40">
          <span className="text-[10px] font-bold uppercase tracking-widest">{label}</span>
          <div className="scale-75">{icon}</div>
       </div>
       <p className="text-xl font-display font-bold leading-none">{value}<span className="text-[10px] opacity-40 ml-0.5">{unit}</span></p>
    </GlassCard>
  );
}
