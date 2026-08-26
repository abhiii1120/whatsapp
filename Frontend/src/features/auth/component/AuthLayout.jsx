/**
 * Shared shell for auth screens: editorial panel on the left,
 * form content (passed as children) on the right.
 */
export default function AuthLayout({ eyebrow, title, subtitle, children }) {
  return (
    <div className="flex min-h-screen w-full bg-stone-50">
      {/* Left: editorial / brand panel */}
      <div className="relative hidden w-[42%] flex-col justify-between overflow-hidden bg-emerald-950 px-12 py-12 text-stone-50 lg:flex">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)",
            backgroundSize: "22px 22px",
          }}
        />
        <div className="relative">
          <div className="flex items-center gap-2 text-sm font-medium tracking-[0.2em] text-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-300" />
            LEDGER
          </div>
        </div>

        <div className="relative max-w-sm">
          <p className="font-serif text-[28px] leading-[1.35] text-stone-50">
            "The best account of your work is the one you keep honestly,
            every single day."
          </p>
          <div className="mt-6 flex items-center gap-3 text-sm text-emerald-200">
            <div className="h-8 w-8 rounded-full bg-amber-300/90" />
            <div>
              <p className="font-medium text-stone-50">Mira Osei</p>
              <p className="text-emerald-300/80">Studio founder</p>
            </div>
          </div>
        </div>

        <p className="relative text-xs text-emerald-400/70">
          © {new Date().getFullYear()} Ledger, Inc.
        </p>
      </div>

      {/* Right: form panel */}
      <div className="flex w-full flex-1 items-center justify-center px-6 py-12">
        <div className="w-full max-w-95">
          {eyebrow && (
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
              {eyebrow}
            </p>
          )}
          <h1 className="font-serif text-[30px] leading-tight text-stone-900">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-2 text-[15px] text-stone-500">{subtitle}</p>
          )}
          <div className="mt-8">{children}</div>
        </div>
      </div>
    </div>
  );
}