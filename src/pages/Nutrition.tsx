import React, { useState } from 'react';
import { GlassCard, ProgressRing, Button } from '../components/ui/Base';
import { Utensils, Plus, Droplet, ScanLine, Clock, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';

export function Nutrition() {
  const navigate = useNavigate();
  const [meals, setMeals] = useState([
    { id: 1, type: 'Breakfast', name: 'Avocado Toast & Eggs', kcal: 420, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCOrdf4TQ7AlrxhQiegchrkBqdNAVnwcS6gBrzpOQwvCxV3amuXqAStAa1uceBTFRVKHvqZeILc8DveFAWZKS827Dwtoziykf1Az1Eq-9Nj0xwHIFjvTkll9m32ymI0MhgzQo19rm2NLIPymsu7O4yJnzT8puIJjnt-8KmJWx7sW7et7GIUioKLIu1WnncEXf2RX-j8e3LuN4kjUEQAOh6g_u5cmRrX6LZXCJ26SMUHQEGs4PnC1rbMcqeAf8VeZ2_hCWJY_8stBhc' },
    { id: 2, type: 'Lunch', name: 'Grilled Salmon Bowl', kcal: 580, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDdU8taMp_0cGAbMLIn0P74m8Nj2cyTwlBp3unXg8_0DIAUcmhyzDkuvdcL7w0KCQYlb_YrOEX88rTt31DA_uTtNKnHJW2IKG9gxf0ZPDUtOt28b2yRjTgOhzvDMg6NttV9zff9XuEDCqdB2VdVgPIM-zPqKAEbES_sVgyCkjoly3ZGf7YCpgSUCPShtYBj2Sesgefq20uMZQv77vyWpS8i3lOwn2dXJRWB6aG19rbPtzxysYeoDaJJascsLTdtzdg7AJSMYNr5q94' },
    { id: 3, type: 'Dinner', name: 'Steak & Asparagus', kcal: 650, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBw_0pbu1j6poJPcgORIMjRAJa7MCK1oPQfP9fpkrFKXCrm7KMP_t3-_ElgoaAJoztdeF1Tc2PYwf0Ix-fn8JoaXpuN91A3sxNRUNC9YPQoDqfc6WhnaqPoRB9hvm_wJQEL-uX3sIPbwi-hYmaK9tkTO9XuhOIt3AUs22RJv56-EPymrJ2g86GuFhA8gl9_spWxR-5THKVWVDB3z4OU8r-o0aYIzrYWTkTIZxumirWGo-8_bsdL-a3j-EaXYfLmn7tszfVK21Uijyw' },
  ]);

  const macros = [
    { label: 'Protein', current: 142, goal: 180, color: 'var(--color-surface-tint)' },
    { label: 'Carbs', current: 210, goal: 250, color: 'var(--color-secondary-fixed-dim)' },
    { label: 'Fats', current: 45, goal: 70, color: '#ffdad5' },
  ];

  return (
    <div className="px-container-padding py-lg space-y-lg max-w-2xl mx-auto">
      {/* Overview */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-lg">
        <GlassCard className="flex flex-col items-center justify-center p-lg gap-md">
          <h3 className="text-[10px] uppercase font-bold tracking-[0.2em] text-on-surface-variant self-start">Daily Energy</h3>
          <ProgressRing 
            progress={74} 
            size={160} 
            strokeWidth={12}
            label="1,842" 
            subLabel="kcal left" 
          />
          <p className="text-xs text-on-surface-variant">Goal: 2,500 kcal</p>
        </GlassCard>

        <GlassCard className="p-lg space-y-md flex flex-col justify-center">
          <h3 className="text-[10px] uppercase font-bold tracking-[0.2em] text-on-surface-variant">Macronutrients</h3>
          <div className="space-y-md">
            {macros.map(m => (
              <div key={m.label} className="space-y-xs">
                <div className="flex justify-between text-xs">
                   <span className="font-bold">{m.label}</span>
                   <span className="opacity-60">{m.current}g / {m.goal}g</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                   <motion.div 
                     initial={{ width: 0 }}
                     animate={{ width: `${(m.current / m.goal) * 100}%` }}
                     className="h-full rounded-full"
                     style={{ backgroundColor: m.color }}
                   />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </section>

      {/* Water */}
      <section>
        <GlassCard className="flex items-center justify-between p-md">
          <div className="flex items-center gap-md">
            <div className="p-md rounded-xl bg-secondary-container/10 text-secondary-fixed-dim">
              <Droplet size={24} fill="currentColor" />
            </div>
            <div>
              <h3 className="font-bold">Water Intake</h3>
              <p className="text-xs text-on-surface-variant">1.8L / 3.0L</p>
            </div>
          </div>
          <Button variant="secondary" size="md" className="h-10 w-10 p-0 rounded-full">
            <Plus size={20} />
          </Button>
        </GlassCard>
      </section>

      {/* Daily Meals */}
      <section className="space-y-md">
        <div className="flex justify-between items-end">
          <h2 className="font-display text-2xl font-bold">Daily Meals</h2>
          <span className="text-xs text-on-surface-variant uppercase font-bold tracking-widest">{meals.length} logged</span>
        </div>
        
        <div className="space-y-md">
          {meals.map((meal, i) => (
            <motion.div
              key={meal.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <GlassCard className="flex items-center gap-md p-sm group cursor-pointer border-l-4 border-transparent hover:border-surface-tint/50 transition-all">
                <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-white/5">
                  <img src={meal.img} className="w-full h-full object-cover" alt={meal.name} />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] font-bold text-surface-tint uppercase tracking-widest">{meal.type}</p>
                  <h4 className="font-bold text-sm">{meal.name}</h4>
                </div>
                <div className="text-right pr-md">
                  <span className="block font-display text-lg font-bold">{meal.kcal}</span>
                  <span className="text-[10px] text-on-surface-variant uppercase">kcal</span>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAB AI */}
      <button 
        onClick={() => navigate('/ai-coach')}
        className="fixed right-6 bottom-24 w-14 h-14 bg-surface-tint text-[#161e00] rounded-full shadow-2xl flex items-center justify-center z-50 neon-glow-primary active:scale-95 transition-transform group"
      >
        <ScanLine size={24} className="group-hover:scale-110 transition-transform" />
      </button>
    </div>
  );
}
