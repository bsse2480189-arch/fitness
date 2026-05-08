import React from 'react';
import { GlassCard, Button } from '../components/ui/Base';
import { TrendingUp, Users, DollarSign, Star, MoreHorizontal, Search, Send, ArrowRight } from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell
} from 'recharts';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

const data = [
  { name: '01 Oct', users: 4000 },
  { name: '10 Oct', users: 5200 },
  { name: '20 Oct', users: 6100 },
  { name: '30 Oct', users: 8291 },
];

const popularData = [
  { name: 'HIIT', value: 4200, color: 'var(--color-surface-tint)' },
  { name: 'Power Lifting', value: 3800, color: 'var(--color-secondary-fixed-dim)' },
  { name: 'Yoga Flow', value: 2900, color: '#ffdad5' },
  { name: 'Core', value: 1500, color: 'var(--color-outline-variant)' },
];

export function AdminDashboard() {
  return (
    <div className="p-xl space-y-xl">
      {/* Header */}
      <div className="flex justify-between items-center">
         <div>
            <h2 className="text-3xl font-display font-bold">Platform Overview</h2>
            <p className="text-on-surface-variant">Real-time business performance metrics</p>
         </div>
         <Button className="gap-md px-lg">
           <Send size={18} /> Send Notification
         </Button>
      </div>

      {/* Stats Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-lg">
         <StatCard icon={<Users className="text-surface-tint" />} label="Active Users" value="12,842" change="↑ 14%" sub="vs last week" />
         <StatCard icon={<DollarSign className="text-surface-tint" />} label="Revenue (MRR)" value="$84.2k" change="↑ 8.2%" sub="targeted goal reached" />
         <StatCard icon={<Star className="text-white" />} label="AI Accuracy" value="98.4%" change="Optimized" sub="" />
      </section>

      {/* Charts */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
         <GlassCard className="col-span-8 p-6 rounded-3xl flex flex-col space-y-6">
            <div className="flex justify-between items-center">
               <h4 className="text-lg font-medium">User Engagement Trends</h4>
               <div className="flex gap-2">
                  <button className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-white text-xs">Weekly</button>
                  <button className="px-3 py-1 text-slate-400 hover:text-white text-xs">Monthly</button>
                  <button className="px-3 py-1 text-slate-400 hover:text-white text-xs">Yearly</button>
               </div>
            </div>
            <div className="h-64">
               <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data}>
                     <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                     <XAxis dataKey="name" stroke="rgba(255,255,255,0.2)" fontSize={10} axisLine={false} tickLine={false} />
                     <Tooltip 
                        contentStyle={{ backgroundColor: '#131313', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }} 
                        itemStyle={{ color: 'var(--color-surface-tint)' }}
                     />
                     <Line type="monotone" dataKey="users" stroke="var(--color-surface-tint)" strokeWidth={3} dot={{ fill: 'var(--color-surface-tint)', r: 4 }} activeDot={{ r: 6, stroke: 'white', strokeWidth: 2 }} />
                  </LineChart>
               </ResponsiveContainer>
            </div>
         </GlassCard>

         <GlassCard className="col-span-4 bg-gradient-to-b from-zinc-800 to-black p-6 rounded-3xl shadow-2xl relative space-y-6">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 bg-surface-tint rounded-xl flex items-center justify-center text-black font-black text-xs uppercase">AI</div>
               <div>
                  <h4 className="font-bold">Forge Coach</h4>
                  <p className="text-xs text-slate-400 italic">Real-time analysis...</p>
               </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                <p className="text-[10px] text-slate-500 mb-2 font-mono uppercase font-bold tracking-widest">Strategy Insight</p>
                <p className="text-sm text-slate-200 leading-relaxed italic">“Churn rates in <span className="text-surface-tint">Premium Plus</span> decreased by 12%. Suggesting personalized push notifications.”</p>
              </div>
              
              <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                <p className="text-[10px] text-slate-500 mb-2 font-mono uppercase font-bold tracking-widest">User Behavior</p>
                <p className="text-sm text-slate-200">Leg Day workouts are trending this morning. Peak volume at 07:15 AM.</p>
              </div>

              <div className="pt-4">
                <button className="w-full py-3 bg-surface-tint text-black font-bold rounded-2xl text-sm hover:opacity-90 active:scale-95 transition-all">
                  Generate AI Revenue Report
                </button>
              </div>
            </div>
         </GlassCard>
      </section>

      {/* Activity Table */}
      <section>
         <GlassCard className="p-0 border-none overflow-hidden rounded-3xl">
            <div className="p-4 bg-white/5 border-b border-white/10 flex justify-between items-center">
               <span className="text-sm font-semibold px-4">Latest Gym Check-ins (QR)</span>
               <span className="text-xs text-surface-tint cursor-pointer px-4 flex items-center gap-2">View Live Log <ArrowRight size={14} /></span>
            </div>
            <div className="flex p-4 gap-8">
              {[
                { name: 'Marcus Thorne', plan: 'Elite Squad Plan', time: '2m ago' },
                { name: 'Elena Velez', plan: 'Strength Builder', time: '5m ago' },
                { name: 'Sarah Chen', plan: 'Basic Plan', time: '14m ago' },
              ].map((checkin, idx) => (
                <div key={idx} className={cn("flex-1 flex items-center gap-4 px-4", idx > 0 && "border-l border-white/5")}>
                  <div className="w-8 h-8 rounded-full bg-zinc-700"></div>
                  <div className="text-sm">
                    <p className="font-medium">{checkin.name}</p>
                    <p className="text-xs text-slate-500">{checkin.plan} • {checkin.time}</p>
                  </div>
                </div>
              ))}
            </div>
         </GlassCard>
      </section>
    </div>
  );
}

function StatCard({ icon, label, value, change, sub }: { icon: React.ReactNode, label: string, value: string, change: string, sub: string }) {
  return (
    <GlassCard className="p-5 rounded-3xl relative overflow-hidden group">
       <div className="absolute -right-4 -top-4 w-20 h-20 bg-surface-tint/5 blur-3xl rounded-full group-hover:bg-surface-tint/10 transition-all"></div>
       <div className="flex justify-between items-start mb-1">
          <span className="text-xs text-slate-400 uppercase tracking-tighter">{label}</span>
          <div className="opacity-40 group-hover:opacity-100 transition-all">{icon}</div>
       </div>
       <div className="flex flex-col">
          <span className="text-3xl font-display font-bold tracking-tight">{value}</span>
          <div className="flex items-center gap-1 mt-2 text-[10px]">
             <span className="text-surface-tint font-bold">{change}</span>
             <span className="text-slate-500">{sub}</span>
          </div>
       </div>
    </GlassCard>
  );
}

function ActivityRow({ name, email, activity, time, status }: any) {
  return (
    <tr className="hover:bg-white/5 transition-colors group">
       <td className="px-lg py-md">
          <div className="flex items-center gap-md">
             <div className="w-8 h-8 rounded-full bg-surface-tint/20 flex items-center justify-center text-surface-tint font-bold text-xs uppercase">{name[0]}</div>
             <div>
                <p className="font-bold">{name}</p>
                <p className="text-[10px] opacity-40">{email}</p>
             </div>
          </div>
       </td>
       <td className="px-lg py-md opacity-80">{activity}</td>
       <td className="px-lg py-md opacity-40">{time}</td>
       <td className="px-lg py-md">
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
            status === 'Active' ? 'bg-surface-tint/20 text-surface-tint' : 
            status === 'Premium' ? 'bg-secondary-fixed-dim/20 text-secondary-fixed-dim' : 
            'bg-white/5 text-white/40'
          }`}>{status}</span>
       </td>
       <td className="px-lg py-md text-right">
          <button className="opacity-20 group-hover:opacity-100 transition-opacity"><MoreHorizontal size={18} /></button>
       </td>
    </tr>
  );
}
