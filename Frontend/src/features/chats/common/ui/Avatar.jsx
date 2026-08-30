export default function Avatar({ src, alt, size = 40, online }) {
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full rounded-full object-cover"
      />
      {online && (
        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[#111318]" />
      )}
    </div>
  );
}