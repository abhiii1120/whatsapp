import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "../utils/cn";

/**
 * Usage:
 *   <Input
 *     label="Email"
 *     type="email"
 *     error={errors.email}
 *     {...register("email", { required: "Email is required" })}
 *   />
 */
export default function Input({
  label,
  type = "text",
  error,
  hint,
  id,
  className,
  ...rest
}) {
  const [show, setShow] = useState(false);
  const inputId = id || rest.name;
  const isPassword = type === "password";
  const resolvedType = isPassword ? (show ? "text" : "password") : type;

  return (
      <div className="w-full">
        <label
          htmlFor={inputId}
          className="mb-1.5 block text-[13px] font-medium tracking-wide text-stone-600"
        >
          {label}
        </label>

        <div className="relative">
          <input
            id={inputId}
            type={resolvedType}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : undefined}
            className={cn(
              "w-full rounded-lg border bg-white px-3.5 py-2.5 text-[15px] text-stone-900",
              "placeholder:text-stone-400 outline-none transition-all duration-150",
              "focus:ring-2 focus:ring-offset-0",
              error
                ? "border-rose-400 focus:border-rose-400 focus:ring-rose-100"
                : "border-stone-300 focus:border-emerald-600 focus:ring-emerald-100",
              isPassword && "pr-10",
              className
            )}
            {...rest}
          />

          {isPassword && (
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              tabIndex={-1}
              className="absolute inset-y-0 right-0 flex w-10 items-center justify-center text-stone-400 hover:text-stone-600"
              aria-label={show ? "Hide password" : "Show password"}
            >
              {show ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          )}
        </div>

        {error ? (
          <p id={`${inputId}-error`} className="mt-1.5 text-[13px] text-rose-500">
            {error.message}
          </p>
        ) : hint ? (
          <p className="mt-1.5 text-[13px] text-stone-400">{hint}</p>
        ) : null}
      </div>
  );
}