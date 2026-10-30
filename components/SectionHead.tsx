export default function SectionHead({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <div className="section-head">
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="scroll-trigger animate--slide-in">{title}</h2>
      {text && <p className="scroll-trigger animate--slide-in">{text}</p>}
    </div>
  );
}
