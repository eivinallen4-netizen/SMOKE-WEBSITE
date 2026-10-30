import { site } from "@/data/site";
import { Logo } from "./Header";

export default function Footer() {
  const f = site.footer;
  const b = site.brand;
  return (
    <footer className="footer">
      <div className="container narrow footer-grid">
        <div className="footer-brand">
          <Logo />
          <p>{b.tagline}</p>
          <small>{b.hours}</small>
          <small>{b.address}</small>
          <small><a href={b.tel}>{b.phone}</a></small>
          {b.email && <small>Email: {b.email}</small>}
        </div>
        {f.columns.map((col) => (
          <div key={col.title} className="footer-col">
            <h4>{col.title}</h4>
            {col.links.map((l) => (
              <a key={l.label} href={l.href} {...(l.href.startsWith("http") ? { target: "_blank", rel: "noopener" } : {})}>
                <span className="u-link">{l.label}</span>
              </a>
            ))}
          </div>
        ))}
        <div className="footer-news">
          <h4>{f.newsletter.title}</h4>
          <form className="news-form">
            <input type="email" placeholder="Email" aria-label="Email" />
            <button type="submit" className="btn btn-accent"><span>Sign up</span></button>
          </form>
          <small>{f.newsletter.text}</small>
        </div>
      </div>
      <div className="container narrow footer-legal">
        <p>{f.legal}</p>
        <small>{f.copyright}</small>
      </div>
    </footer>
  );
}
