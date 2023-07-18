import CloseIcon from "./ui/icons/CloseIcon";

interface PostModalProps {
  onClose: () => void;
  children: React.ReactNode;
}
export default function PostModal({ onClose, children }: PostModalProps) {
  return (
    <section
      className="fixed top-0 left-0 z-50 flex flex-col items-center justify-center w-full h-full bg-neutral-900/70"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <button
        className="fixed top-0 right-0 p-8 text-white"
        onClick={() => onClose()}
      >
        <CloseIcon />
      </button>
      {children}
    </section>
  );
}
