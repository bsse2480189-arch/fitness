import React, { useState } from 'react';
import { GlassCard, Button } from '../components/ui/Base';
import { Plus, Heart, MessageCircle, Share2, Timer, Award, MoreVertical, Flame } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

export function Social() {
  const influencers = [
    { name: 'Elena K.', role: 'Pro Coach', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDRYIgjkGzZwYEVmv9-uL-j_ARsEOE5wfl_AsnsQsxmsZljo8um4SVwEIsqBYjWzndadC-IpfPTLJ-poi6zPxIVVFkDWCEZUZ1nZiwbmL89Ay6nt7Ob5JGRU-6R3CCaTGaLql9f_gj9Kt1h_qXGWb0UlvJZKpwV4DYcRWzjeuyLFO-GhZA05gDK-v_HLV9pXklnowj9SqFrhM5IoDb1JaYFP5q7m76xv6sKolDDhHmzK6DwpNLCEegcceqOgeZDghmV40MOUgw4pDs' },
    { name: 'Marcus G.', role: 'Powerlifter', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCz_4O5zyMzD4Yis_CDlOKjAG8p1BPura2V-Kex6CrKFwHzqShReh3rjFkt2UvAejZz-eVKE49jmatxVC0jvI5muGuo18MIm6vWpXsLn4bLpoKApBNXS7IHJ04-BjxJU6GE-aMC64FY8tSkKvat8YRDcx0yZik8SIiExfEftaMk-9HeDsGNdw_EnT4G8u9yJ8N9Pol4DDaHLl3nUDBihpWXyr85eAvodpTi6J-6afnZwunwLJwqtwM60Yx4T0o81H73GCFpwFzVW4Y' },
    { name: 'Sarah V.', role: 'Nutritionist', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCXmJgzkLz4OvsXKF8lhpMQg6LGvSgiY88xGx1w0fs7TTme9JRwQGDgOvQFu9kxlpeOpKsQ3pFwCdA-quVHTruz2M2gSAOzS4O6Fz8vBfNbg3ky9y0-slOehsRhLMyIoYC7ae12ImO9wvLkPn-QM91kN3ypE5kuS2wcXtcexPEGzC8b4zWJTb9hFXfjZt8CsmF5CL6mkjZPHO_7WBpRzTwZG2zpU16zym6opBYBtYxK6zUhRvBCJvmFsFcNs5rQEPUDJnZ55hZ_mPs' },
  ];

  return (
    <div className="px-container-padding py-lg space-y-lg max-w-2xl mx-auto">
      {/* Challenge Banner */}
      <section className="relative h-48 rounded-2xl overflow-hidden glass-card">
         <img 
           src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_CF6yle82DgOuQl0xiW6MBNGex7rDtw1Im_zn-vz7JTcnS9WrS1HIPyaXnbAw0QJ-nN0htJYU8eyhMgoFQaTotGUXiUlORQtApp-tZk4qFnwkmXpu7H33nsbEikya7Ol9JGkt1cIc2nqhvgUteM6Ma_bmFaPHxhAfm9j0v3EsNUdQ3-kX0rR6CysbTeDz76x3isNz9yaiwedKuSugfeAoMWsr0wkyv8WVAoWpnlGV6I0HIRhwFIDbd0JFmnVp3g3ogSl9GdRv_IE" 
           className="absolute inset-0 w-full h-full object-cover opacity-60" 
           alt="Challenge" 
         />
         <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
         <div className="absolute bottom-4 left-4 right-4 space-y-sm">
           <div className="inline-flex items-center gap-xs px-2 py-0.5 rounded bg-surface-tint text-[#161e00] text-[10px] font-bold uppercase">
             <Timer size={12} /> Ends in 04:22:15
           </div>
           <h2 className="font-display text-2xl font-bold">Hypertrophy Week</h2>
           <p className="text-sm opacity-80">Join 1,200 others in this month's peak challenge.</p>
         </div>
      </section>

      {/* Influencers */}
      <section className="space-y-md">
        <div className="flex justify-between items-center">
          <h3 className="font-display text-lg font-bold">Influencers</h3>
          <Button variant="ghost" size="sm" className="text-surface-tint">SEE ALL</Button>
        </div>
        <div className="flex gap-md overflow-x-auto no-scrollbar -mx-container-padding px-container-padding pb-sm">
          {influencers.map((inf, i) => (
            <div key={inf.name} className="shrink-0 w-32 flex flex-col items-center gap-sm text-center">
               <div className={cn(
                 "w-16 h-16 rounded-full p-1",
                 i === 0 ? "bg-surface-tint" : "bg-white/10"
               )}>
                 <img src={inf.img} className="w-full h-full rounded-full object-cover" alt={inf.name} />
               </div>
               <div>
                  <p className="font-bold text-xs truncate w-24">{inf.name}</p>
                  <p className="text-[10px] text-on-surface-variant">{inf.role}</p>
               </div>
               <Button size="sm" variant={i === 0 ? 'primary' : 'outline'} className="w-full text-[10px] py-1">
                 {i === 0 ? 'FOLLOWING' : 'FOLLOW'}
               </Button>
            </div>
          ))}
        </div>
      </section>

      {/* Feed */}
      <section className="space-y-lg pb-10">
        <h3 className="font-display text-lg font-bold border-b border-white/5 pb-sm">Feed</h3>
        
        {/* Achievement Post */}
        <article className="glass-card shadow-lg p-0 border-none overflow-hidden">
           <div className="p-md flex items-center justify-between">
              <div className="flex items-center gap-md">
                 <div className="w-10 h-10 rounded-full bg-surface-tint/20 flex items-center justify-center text-surface-tint border border-surface-tint/30">
                    <Award size={20} />
                 </div>
                 <div>
                    <h4 className="font-bold text-sm">Alex Rivers</h4>
                    <p className="text-[10px] opacity-40">2 hours ago</p>
                 </div>
              </div>
              <button className="opacity-40 hover:opacity-100"><MoreVertical size={18} /></button>
           </div>
           <div className="px-md pb-md space-y-md">
              <p className="text-sm">Just smashed my PR on the Deadlift! 220kg felt like a breeze today. The Forge training plan is really paying off. 🔥</p>
              
              <div className="bg-white/5 rounded-2xl p-lg border border-white/5 flex flex-col items-center gap-sm text-center">
                 <span className="text-surface-tint text-[10px] font-bold tracking-[0.3em] uppercase">New Personal Best</span>
                 <div className="font-display text-5xl font-black text-white">220.0 <span className="text-xl opacity-40">KG</span></div>
                 <div className="flex gap-xl mt-sm">
                    <div className="space-y-1">
                       <p className="text-[9px] uppercase font-bold opacity-40">Previous</p>
                       <p className="font-bold text-xs">205.0 KG</p>
                    </div>
                    <div className="space-y-1">
                       <p className="text-[9px] uppercase font-bold opacity-40">Gain</p>
                       <p className="font-bold text-xs text-surface-tint">+15.0 KG</p>
                    </div>
                 </div>
              </div>
           </div>
           
           <div className="flex items-center gap-lg p-md border-t border-white/5">
              <button className="flex items-center gap-sm text-surface-tint">
                 <Heart size={20} fill="currentColor" /> <span className="text-xs font-bold">482</span>
              </button>
              <button className="flex items-center gap-sm opacity-60">
                 <MessageCircle size={20} /> <span className="text-xs font-bold">24</span>
              </button>
              <button className="flex items-center gap-sm opacity-60">
                 <Share2 size={20} /> <span className="text-xs font-bold">Share</span>
              </button>
           </div>
        </article>

        {/* Progress Post */}
        <article className="glass-card shadow-lg p-0 border-none overflow-hidden">
           <div className="p-md flex items-center gap-md">
             <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGa7mCXlmQvmiI3S-aRj7J8K5Z1ckGNWGJjpDQ2TtUDF7TnN47kwM1C8tEzBA-EtT9azoZDuK3qpOtUS8TLN5wV6lctWyk5Mb4UzUypmgNX85es61j58mi4otkX0xtQ0O3lqIQ6xF3OSwzxaZYepquSUSMY721BmcA5rfEpcg2s9UcPf668gmu8c8DPSg8hLS-nkRVHv-oDnogIj_6Ev6OQcU9ruFlSG8MNrRuNc1cj6-GcsMCeI3n3FhnghHjBc3nfaG7AB6DPDo" className="w-full h-full object-cover" alt="Profile" />
             </div>
             <div>
                <h4 className="font-bold text-sm">Jordan Lee</h4>
                <p className="text-[10px] opacity-40">5 hours ago</p>
             </div>
           </div>
           
           <p className="text-sm px-md pb-md">Consistency is king. 6 months into the cutting phase and the definition is finally where I want it to be. Trust the process. 🔱</p>

           <div className="grid grid-cols-2 gap-px bg-white/10 border-y border-white/10">
              <div className="relative aspect-[4/5]">
                 <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCkl2Egs5xoIuaOBgPY0V-8uGr5E3t0E3JHkED2JqHgO8m9gGtGFVeLEKgM12J46Skqq-mUk26VgwGU7HeP4Rq0tnratNLBYrccDEt68t45TugyzLzty881M--mMwHMcR4NhCFJyHRN-W1F4vhn84l9FS0-XtwEY_YubAHwzioORvMhqb0qUGJ_gfN4jSbtOcFgRd229syzh0P8lvZhgSAoK-gDmjvaAvqAYnRpuf2ivG2Xsqu26BBP5GJgJBogDgvv7f7kmXjPQcY" className="w-full h-full object-cover" alt="Before" />
                 <div className="absolute top-2 left-2 bg-black/60 text-white text-[8px] font-black px-2 py-0.5 rounded uppercase backdrop-blur-sm">Month 1</div>
              </div>
              <div className="relative aspect-[4/5]">
                 <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6AMKdz0X6tf9nHMsuegy_djVhMNCovIzCOGC_2FvKyaPfJAgAIzdnY5lgzKjA83sVfJTykxL8D7euCVTwj7DF2gqULBUSx620Toh4HJmsiKEHyZZLZBTsjv8TFmmyZmWHfLxcOP56VBcbpN9dcLbyiL9_Z9d6kXryHObEQiH5TqoBnZ6Y7tKfWLpFFaoqLB_njnj7azXHHrbXpmUG0VG9yLb2-lqyRlXsegId7agJw3dgPtgbBQEpg77Trj7l_l7tU-O95ozzhek" className="w-full h-full object-cover" alt="After" />
                 <div className="absolute top-2 right-2 bg-surface-tint text-[#161e00] text-[8px] font-black px-2 py-0.5 rounded uppercase">Now</div>
              </div>
           </div>

           <div className="flex items-center gap-lg p-md">
              <button className="flex items-center gap-sm opacity-60 hover:text-surface-tint hover:opacity-100 transition-all">
                 <Heart size={20} /> <span className="text-xs font-bold">1.2k</span>
              </button>
              <button className="flex items-center gap-sm opacity-60">
                 <MessageCircle size={20} /> <span className="text-xs font-bold">156</span>
              </button>
              <button className="flex items-center gap-sm opacity-60">
                 <Share2 size={20} />
              </button>
           </div>
        </article>
      </section>

      {/* FAB */}
      <button className="fixed right-6 bottom-24 w-14 h-14 bg-surface-tint text-[#161e00] rounded-full shadow-2xl flex items-center justify-center z-50 neon-glow-primary active:scale-95 transition-transform group">
        <Plus size={32} strokeWidth={3} className="group-hover:rotate-90 transition-transform" />
      </button>
    </div>
  );
}
