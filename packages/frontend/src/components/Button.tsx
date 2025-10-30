import { cn } from "@/utils";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function Button({ children, className, ...props }: Props) {
  return (
    <button
      className={cn(
        "bg-green-100 text-green-900 rounded-full p-2 font-normal cursor-pointer",
        className
      )}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
}
