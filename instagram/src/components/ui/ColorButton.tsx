interface ColorButtonProps {
  text: string;
  onClick: () => void;
  className?: string;
}

export default function ColorButton({
  text,
  onClick,
  className,
}: ColorButtonProps) {
  return (
    <div
      className={`rounded-md p-[0.15rem] bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300 ${className}`}
    >
      <button
        className="bg-white rounded-sm text-base p-[0.3rem] hover:opacity-90 transition-opacity"
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
}
