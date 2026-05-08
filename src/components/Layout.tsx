import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, Dumbbell, Utensils, Users, User, Bell, Star } from 'lucide-react';
import { cn } from '../lib/utils';
import { useAuth } from '../hooks/useAuth';

export function Layout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const location = useLocation();

  const navItems = [
    { icon: LayoutDashboard, label: 'Home', path: '/' },
    { icon: Dumbbell, label: 'Workouts', path: '/workouts' },
    { icon: Utensils, label: 'Nutrition', path: '/nutrition' },
    { icon: Users, label: 'Social', path: '/social' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  const isAdminPath = location.pathname.startsWith('/admin');

  if (isAdminPath) {
     return (
      <div className="min-h-screen bg-[#0A0A0A] text-slate-100 flex overflow-hidden">
        {/* Navigation Rail for Admin */}
        <aside className="w-64 flex flex-col border-r border-white/10 bg-[#0F0F0F] shrink-0">
           <div className="p-8">
             <div className="flex items-center gap-2">
               <div className="w-8 h-8 bg-surface-tint rounded-lg flex items-center justify-center">
                 <div className="w-4 h-4 bg-black rotate-45"></div>
               </div>
               <h1 className="text-xl font-bold tracking-tight uppercase">FitForge<span className="text-surface-tint">Pro</span></h1>
             </div>
           </div>
           
           <nav className="flex-1 px-4 space-y-2">
             <NavLink 
               to="/admin" 
               end 
               className={({isActive}) => cn(
                 "px-4 py-3 rounded-xl flex items-center gap-3 transition-all", 
                 isActive ? "bg-surface-tint/10 text-surface-tint border border-surface-tint/20" : "hover:bg-white/5 text-slate-400"
               )}
             >
               <LayoutDashboard size={20} className={cn("opacity-80")} />
               <span className="font-medium">Dashboard</span>
             </NavLink>
             <NavLink 
               to="/admin/users" 
               className={({isActive}) => cn(
                 "px-4 py-3 rounded-xl flex items-center gap-3 transition-all", 
                 isActive ? "bg-surface-tint/10 text-surface-tint border border-surface-tint/20" : "hover:bg-white/5 text-slate-400"
               )}
             >
               <Users size={20} className="opacity-80" />
               <span className="font-medium">Users</span>
             </NavLink>
             <div className="mt-10 pt-10 border-t border-white/5 px-4">
               <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-4 font-bold">Admin controls</div>
               <div className="px-4 py-3 hover:bg-white/5 text-slate-400 rounded-xl flex items-center gap-3 cursor-pointer">
                 <Star size={18} className="opacity-50" />
                 <span>Subscriptions</span>
               </div>
             </div>
           </nav>

           <div className="p-6">
             <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 p-4 rounded-2xl border border-white/10">
               <p className="text-xs text-slate-400 mb-1">Current Plan</p>
               <p className="text-sm font-bold text-surface-tint">Enterprise Admin</p>
             </div>
           </div>
        </aside>

        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Admin Header */}
          <header className="h-20 border-b border-white/10 flex items-center justify-between px-8 bg-[#0A0A0A]/80 backdrop-blur-md shrink-0">
            <div>
              <h2 className="text-2xl font-semibold">Morning Overview</h2>
              <p className="text-sm text-slate-500">Wednesday, October 25th</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="bg-white/5 px-4 py-2 rounded-full border border-white/10 flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-surface-tint opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-surface-tint"></span>
                </span>
                <span className="text-xs font-medium text-slate-300 italic uppercase tracking-wider">AI Engine Active</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-surface-tint to-cyan-400 p-[1px]">
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-xs font-bold">JD</div>
              </div>
            </div>
          </header>
          
          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </main>
      </div>
     );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col">
      {/* Top Bar */}
      <header className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-xl border-b border-white/10 px-container-padding h-16 flex items-center justify-between">
        <div className="flex items-center gap-md">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-surface-tint rounded-md flex items-center justify-center scale-90">
              <div className="w-3 h-3 bg-black rotate-45"></div>
            </div>
            <h1 className="font-display text-lg font-bold tracking-tight uppercase">FitForge<span className="text-surface-tint">Pro</span></h1>
          </div>
        </div>
        <div className="flex items-center gap-md">
          <button className="text-white hover:opacity-80 transition-opacity">
            <Bell size={20} />
          </button>
          {user?.photoURL ? (
            <img src={user.photoURL} className="w-8 h-8 rounded-full border border-white/20" alt="Avatar" />
          ) : (
            <div className="w-8 h-8 rounded-full bg-surface-tint/20 flex items-center justify-center text-surface-tint border border-surface-tint/30 text-xs font-bold">
              {user?.displayName?.[0] || 'A'}
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-16 pb-24 overflow-auto">
        {children}
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 w-full z-50 bg-black/40 backdrop-blur-3xl border-t border-white/10 h-20 flex justify-around items-center px-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isItemActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "flex flex-col items-center justify-center gap-1 transition-all duration-300",
                  isActive 
                    ? "text-surface-tint scale-110 drop-shadow-[0_0_8px_rgba(171,214,0,0.6)]" 
                    : "text-on-surface-variant/60"
                )
              }
            >
              <Icon size={24} strokeWidth={isItemActive ? 2.5 : 2} />
              <span className="text-[10px] font-medium uppercase tracking-wider">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
}
