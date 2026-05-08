import React from 'react';
import { GlassCard, Button } from '../components/ui/Base';
import { Search, MoreHorizontal, UserPlus, Filter } from 'lucide-react';

export function AdminUsers() {
  return (
    <div className="p-xl space-y-lg">
      <div className="flex justify-between items-center">
         <div>
            <h2 className="text-3xl font-display font-bold">User Management</h2>
            <p className="text-on-surface-variant">Manage and monitor platform members</p>
         </div>
         <Button className="gap-sm">
           <UserPlus size={18} /> Add Member
         </Button>
      </div>

      <div className="flex gap-md">
         <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" size={18} />
            <input 
              type="text" 
              placeholder="Search by name, email or ID..." 
              className="w-full bg-white/5 border-none rounded-xl py-3 pl-12 pr-4 focus:ring-1 focus:ring-white/20"
            />
         </div>
         <Button variant="outline" className="gap-sm">
            <Filter size={18} /> Filter
         </Button>
      </div>

      <GlassCard className="p-0 border-none overflow-hidden">
         <table className="w-full text-left text-sm">
            <thead className="bg-white/5 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
               <tr>
                  <th className="px-lg py-md">User</th>
                  <th className="px-lg py-md">Role</th>
                  <th className="px-lg py-md">Joined</th>
                  <th className="px-lg py-md">Streak</th>
                  <th className="px-lg py-md text-right">Actions</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
                {[
                  { name: 'Alex Rivers', email: 'alex.rivers@forge.com', role: 'User', joined: 'Oct 2025', streak: '12 Days' },
                  { name: 'Sarah Miller', email: 's.miller@web.com', role: 'Trainer', joined: 'Nov 2025', streak: '45 Days' },
                  { name: 'Jordan Dax', email: 'jordan.d@fitforge.com', role: 'Admin', joined: 'Jan 2025', streak: '120 Days' },
                  { name: 'Ryan Kaine', email: 'kaine.r@mail.com', role: 'User', joined: 'Feb 2026', streak: '5 Days' },
                ].map(user => (
                  <tr key={user.email} className="hover:bg-white/5 transition-colors group">
                    <td className="px-lg py-md">
                        <div className="flex items-center gap-md">
                           <div className="w-8 h-8 rounded-full bg-surface-tint text-black flex items-center justify-center font-bold text-xs">{user.name[0]}</div>
                           <div>
                              <p className="font-bold">{user.name}</p>
                              <p className="text-[10px] opacity-40">{user.email}</p>
                           </div>
                        </div>
                    </td>
                    <td className="px-lg py-md opacity-60">{user.role}</td>
                    <td className="px-lg py-md opacity-40">{user.joined}</td>
                    <td className="px-lg py-md">
                       <span className="text-surface-tint font-bold">{user.streak}</span>
                    </td>
                    <td className="px-lg py-md text-right">
                       <button className="opacity-20 group-hover:opacity-100 transition-opacity"><MoreHorizontal size={18} /></button>
                    </td>
                  </tr>
                ))}
            </tbody>
         </table>
      </GlassCard>
    </div>
  );
}
