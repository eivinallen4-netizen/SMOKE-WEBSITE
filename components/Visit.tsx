import { site } from "@/data/site";
import SectionHead from "./SectionHead";
import Icon from "./Icons";

export default function Visit() {
  const v = site.visit;
  const b = site.brand;
  return (
    <section className="section" id="visit">
      <div className="container narrow">
        <SectionHead eyebrow={v.eyebrow} title={v.title} />
        <div className="visit-grid scroll-trigger animate--slide-in">
          <div className="visit-info">
            <div>
              <h4>Address</h4>
              <p>{b.address}</p>
              <small>{b.addressNote}</small>
            </div>
            <div>
              <h4>Hours</h4>
              {v.hours.map((h) => (
                <p key={h.day} className="visit-hours"><span>{h.day}</span><b>{h.time}</b></p>
              ))}
            </div>
            <div>
              <h4>Phone</h4>
              <p><a href={b.tel}>{b.phone}</a></p>
            </div>
            <ul className="visit-amenities">
              {v.amenities.map((a) => <li key={a}>{a}</li>)}
            </ul>
            <div className="visit-ctas">
              <a href={b.directions} target="_blank" rel="noopener" className="btn"><span>Get Directions</span></a>
              <a href={b.tel} className="btn btn-outline"><span>Call Now</span></a>
            </div>
            <a href={b.reviewLink} target="_blank" rel="noopener" className="text-link">
              <span className="u-link">Leave us a Google review</span> <Icon name="right" size={12} />
            </a>
          </div>
          <div className="visit-map">
            <iframe
              src={b.mapEmbed}
              title={`Map to ${b.name}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}
