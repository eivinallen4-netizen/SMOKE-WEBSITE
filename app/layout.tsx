import type { Metadata } from "next";
import { Oswald, Inter } from "next/font/google";
import "swiper/css";
import "./globals.css";
import ScrollAnimations from "@/components/ScrollAnimations";

const display = Oswald({ subsets: ["latin"], weight: ["300", "400", "500"], variable: "--font-display" });
const body = Inter({ subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
  title: "20 Below Smoke & Vape | Vape Shop on S Maryland Pkwy, Las Vegas",
  description:
    "Premium vapes, e-liquids, glass, hookah and accessories in Las Vegas. Open 7 days, 8AM to midnight at 2730 S Maryland Pkwy. Rated 5.0 on Google.",
  icons: { icon: "/logo.png" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Store",
  name: "20 Below Smoke and Vape",
  image: "/logo.png",
  telephone: "+1-702-546-0856",
  address: {
    "@type": "PostalAddress",
    streetAddress: "2730 S Maryland Pkwy",
    addressLocality: "Las Vegas",
    addressRegion: "NV",
    postalCode: "89109",
    addressCountry: "US",
  },
  geo: { "@type": "GeoCoordinates", latitude: 36.1400536, longitude: -115.1365822 },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "08:00",
      closes: "23:59",
    },
  ],
  hasMap: "https://maps.google.com/?cid=2186090302637813266",
  sameAs: [
    "https://www.instagram.com/20belowsmokeandvape/",
    "https://www.yelp.com/biz/20-below-smoke-and-vape-las-vegas",
  ],
  paymentAccepted: "Credit card, Debit card",
  aggregateRating: { "@type": "AggregateRating", ratingValue: "5.0", reviewCount: "10" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        {children}
        <ScrollAnimations />
      </body>
    </html>
  );
}
