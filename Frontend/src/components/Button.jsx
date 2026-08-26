import { Loader2 } from "lucide-react";
import { cn } from "../utils/cn";

/**
 * Reusable button. Pass `loading` to show a spinner and disable interaction.
 */
export default function Button({
  children,
  variant = "primary",
  loading = false,
  className = "",
  ...rest
}) {
  const base =
    "inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-[15px] font-semibold transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-60";

  const variants = {
    primary: "bg-emerald-800 text-white hover:bg-emerald-900",
    ghost: "bg-transparent text-stone-500 hover:text-stone-800",
  };

  return (
    <button
      className={cn(base, variants[variant], className)}
      disabled={loading || rest.disabled}
      {...rest}
    >
      {loading && <Loader2 size={16} className="animate-spin" />}
      {children}
    </button>
  );
}