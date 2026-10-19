import React from 'react';

export default function Tag({ children, className = '' }) {
  return (
    <span
      className={`inline-block font-mono text-[11px] uppercase tracking-wider text-muted border border-border px-2.5 py-1 bg-surface/60 select-none ${className}`}
    >
      {children}
    </span>
  );
}
