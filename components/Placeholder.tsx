// Shows the image if provided, otherwise a labeled gray box.
export default function Placeholder({ src, alt, className = "" }: { src?: string; alt: string; className?: string }) {
  if (src) return <img src={src} alt={alt} className={`ph-img ${className}`} />;
  return (
    <div className={`ph ${className}`} aria-label={alt}>
      <span>{alt}</span>
    </div>
  );
}
