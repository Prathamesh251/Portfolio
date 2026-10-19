import React from 'react';

export default function Button({
  children,
  href,
  onClick,
  variant = 'filled',
  className = '',
  external = false,
  ...props
}) {
  const baseStyles =
    'inline-flex items-center justify-center font-mono text-xs uppercase tracking-wider min-h-[44px] px-6 py-3 transition-colors duration-200 focus-visible:outline-none';

  const variants = {
    filled:
      'bg-text text-bg hover:bg-accent hover:text-bg border border-transparent font-medium',
    outline:
      'border border-border text-text hover:border-accent hover:text-accent bg-transparent',
    accent:
      'bg-accent text-bg hover:bg-accent/90 border border-transparent font-medium',
  };

  const combinedStyles = `${baseStyles} ${variants[variant] || variants.filled} ${className}`;

  if (href) {
    return (
      <a
        href={href}
        className={combinedStyles}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={combinedStyles} {...props}>
      {children}
    </button>
  );
}
