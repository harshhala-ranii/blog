interface HighlightProps {
  children: React.ReactNode;
  className?: string;
}

export default function Highlight({ children, className = "" }: HighlightProps) {
  return (
    <span 
      className={`
        inline-block px-2 py-1 mx-1
        bg-blue-400/20 border-l-4 border-blue-400/60
        italic text-blue-200 font-medium text-xl
        rounded-sm shadow-sm
        transition-all duration-200 ease-in-out
        hover:bg-blue-400/30 hover:border-blue-400/80
        ${className}
      `}
      style={{ fontSize: '1.125rem' }}
    >
      {children}
    </span>
  );
}
