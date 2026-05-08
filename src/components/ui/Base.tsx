import React, { HTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  glow?: boolean;
}

export function GlassCard({ children, className, glow = false, ...props }: any) {
  return (
    <div 
      className={cn(
        "glass-card rounded-2xl p-md overflow-hidden transition-all duration-300",
        glow && "neon-glow-primary",
        className
      )} 
      {...props}
    >
      {children}
    </div>
  );
}

export function Button({ children, className, variant = 'primary', size = 'md', ...props }: any) {
  const variants = {
    primary: "bg-surface-tint text-[#161e00] font-display font-semibold hover:opacity-90 shadow-lg neon-glow-primary active:scale-95",
    secondary: "bg-secondary-fixed-dim text-[#002022] font-display font-semibold hover:opacity-90 active:scale-95",
    ghost: "bg-transparent text-white hover:bg-white/5",
    outline: "border border-white/20 text-white hover:bg-white/5"
  };

  const sizes = {
    sm: "px-sm py-xs text-xs",
    md: "px-md py-sm text-sm",
    lg: "px-lg py-md text-base"
  };

  return (
    <button 
      className={cn(
        "rounded-xl transition-all duration-200 flex items-center justify-center gap-xs disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function ProgressRing({ progress, size = 100, strokeWidth = 8, label, subLabel }: { 
  progress: number, 
  size?: number, 
  strokeWidth?: number,
  label?: string,
  subLabel?: string
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="var(--color-surface-tint)"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-500 ease-out"
        />
      </svg>
      {(label || subLabel) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {label && <span className="font-display text-lg font-bold leading-none">{label}</span>}
          {subLabel && <span className="text-[10px] text-on-surface-variant uppercase tracking-widest">{subLabel}</span>}
        </div>
      )}
    </div>
  );
}
