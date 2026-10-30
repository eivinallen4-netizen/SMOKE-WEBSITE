// All page content lives here. Swap text, links and images to rebrand.
// For any `image` field, drop a file in /public and set e.g. image: "/hero.png".
// Leave image empty to show a gray placeholder box.
// NOTE: everything under /og/ is a stand-in scraped from the reference site — replace before launch.

export type Product = {
  name: string;
  price: string;
  href: string;
  image?: string;
  rating?: number;
  reviews?: number;
  badge?: string;
  fromPrice?: boolean;
};

const phone = "(702) 546-0856";
const tel = "tel:+17025460856";
const directions =
  "https://www.google.com/maps/dir/?api=1&destination=20+Below+Smoke+and+Vape&destination_place_id=ChIJu9OyfhrFyIAREi6nP4yNVh4";
const reviewLink = "https://search.google.com/local/writereview?placeid=ChIJu9OyfhrFyIAREi6nP4yNVh4";

export const site = {
  brand: {
    name: "20 Below Smoke & Vape",
    tagline: "Cool vibes, hot deals! Premium vapes, smokes & accessories in Las Vegas.",
    logo: "/logo.png",
    hours: "Open 7 days | 8:00am - Midnight",
    schedule: { opensHour: 8, closesHour: 24, timeZone: "America/Los_Angeles" }, // drives the live "Open now" badge
    phone,
    tel,
    email: "", // ❓ ask owner
    address: "2730 S Maryland Pkwy, Las Vegas, NV 89109",
    addressNote: "S Maryland Pkwy & E Karen Ave, next to KFC — near Sahara Towne Square",
    directions,
    reviewLink,
    instagram: "https://www.instagram.com/20belowsmokeandvape/",
    yelp: "https://www.yelp.com/biz/20-below-smoke-and-vape-las-vegas",
    mapEmbed:
      "https://www.google.com/maps?q=20+Below+Smoke+and+Vape,+2730+S+Maryland+Pkwy,+Las+Vegas,+NV+89109&output=embed",
  },

  announcement: "❄️ Open 7 days · 8AM – Midnight · Order ahead for pickup ❄️",

  // Pickup orders go to the store as a text message; customer pays + shows ID at the counter.
  // ❓ Confirm with the owner that this number can receive texts (if not, swap in a cell number).
  pickup: {
    sms: "+17025460856",
    title: "Order for Pickup",
    intro: "Pick what you want, send it to us by text, and we'll have it bagged at the counter. Pay and show your 21+ ID when you pick up.",
    notesPlaceholder: "e.g. Geek Bar Pulse X, any frozen flavor · 2 packs of Raw cones",
    times: ["As soon as possible", "In about 30 minutes", "In about 1 hour", "Later today", "Tomorrow"],
    fine: "We'll text you back to confirm stock and when it's ready. No payment online, no shipping or delivery.",
  },
  warning: "WARNING: This product contains nicotine. Nicotine is an addictive chemical. 21+ only.",

  nav: [
    { label: "Shop", href: "#categories" },
    { label: "New In", href: "#new" },
    { label: "Deals", href: "#deals" },
    { label: "Brands", href: "#brands" },
    { label: "Reviews", href: "#reviews" },
    { label: "Visit Us", href: "#visit" },
  ],

  // Hero slideshow: autoplays every `autoplaySeconds`, round logo buttons on the right switch slides.
  hero: {
    autoplaySeconds: 10,
    slides: [
      {
        badge: "Geek Bar",
        badgeColor: "#d7f0ff",
        badgeLogo: "/og/hero-badge-geekbar.png",
        ratingText: "5.0 on Google",
        reviewCount: "(10 Reviews)",
        title: "Cool Vibes, Hot Deals",
        subtitle: "Las Vegas' premier destination for vaping and smoking essentials.",
        cta: { label: "Get Directions", href: directions },
        quote: "“The best smoke and vape shop in town! Great service!”",
        author: "Dustin A., Google review",
        image: "/og/hero-geekbar.png",
      },
      {
        badge: "Vuse",
        badgeColor: "#e9e9e9",
        badgeLogo: "/og/hero-badge-vuse.jpg",
        ratingText: "5.0 on Google",
        reviewCount: "(10 Reviews)",
        title: "Open Till Midnight, Every Day",
        subtitle: "Stop in 8AM – 12AM, 7 days a week on S Maryland Pkwy.",
        cta: { label: `Call ${phone}`, href: tel },
        quote: "“Great selection and vibe. Highly recommend!”",
        author: "Lit Temple, Google review",
        image: "/og/hero-vuse.png",
      },
    ],
  },

  categories: {
    eyebrow: "What we carry",
    title: "Shop Top Categories",
    items: [
      { name: "Disposables", href: "#new", image: "/og/cat-disposables.jpg" },
      { name: "E-Liquids", href: "#new", image: "/og/cat-eliquids.jpg" },
      { name: "Nicotine Pouches", href: "#new", image: "/og/cat-pouches.jpg" },
      { name: "Smoke Shop", href: "#new", image: "/og/cat-smoke-shop.jpg" },
      { name: "Pods", href: "#favorites", image: "/og/cat-pods.jpg" },
      { name: "Vape Devices", href: "#favorites", image: "/og/cat-devices.jpg" },
    ],
  },

  newProducts: {
    id: "new",
    eyebrow: "Fresh picks, just in",
    title: "New In Store",
    link: { label: "See new drops on Instagram", href: "https://www.instagram.com/20belowsmokeandvape/" },
    items: [
      { name: "Pod Juice TFN Salt Nic – Strawberry Ice Cream (30ml)", price: "$11.99", href: "#", image: "/og/p-podjuice-sbic.jpg" },
      { name: "LUCY Breakers – Espresso", price: "$5.00", href: "#", fromPrice: true, image: "/og/p-lucy-breakers-espresso.png" },
      { name: "LUCY – Wintergreen", price: "$5.00", href: "#", fromPrice: true, image: "/og/p-lucy-wintergreen.png" },
      { name: "LUCY – Mint", price: "$5.00", href: "#", fromPrice: true, image: "/og/p-lucy-mint.png" },
      { name: "LUCY – Mango", price: "$5.00", href: "#", fromPrice: true, image: "/og/p-lucy-mango.png" },
      { name: "BLVK MINT – Melon Spearmint", price: "$13.99", href: "#", image: "/og/p-blvk-melon.png" },
      { name: "Blazy Susan Rolling Papers", price: "$4.99", href: "#", fromPrice: true, image: "/og/p-blazy-papers.jpg" },
      { name: "Bambu Rolling Papers", price: "$5.49", href: "#", fromPrice: true, image: "/og/p-bambu.png" },
    ] as Product[],
  },

  promo: {
    eyebrow: "In-store special",
    title: "Hot Deals, Ice Cold Prices",
    text: "Ask at the counter about this week's specials.\nShop in store or order ahead for pickup.",
    cta: { label: "Get Directions", href: directions },
    image: "/og/promo.png",
  },

  bestsellers: {
    id: "favorites",
    eyebrow: "Most popular",
    title: "Customer Favorites",
    link: { label: "Call to check stock", href: tel },
    items: [
      { name: "JUUL Pods – Menthol", price: "$19.99", href: "#", rating: 5, reviews: 10, image: "/og/p-juul-menthol.jpg" },
      { name: "JUUL Pods – Virginia Tobacco", price: "$19.99", href: "#", rating: 5, reviews: 10, image: "/og/p-juul-vt.jpg" },
      { name: "JUUL Slate Basic Kit", price: "$14.99", href: "#", rating: 5, reviews: 10, image: "/og/p-juul-slate.jpg" },
      { name: "VGOD Salt Nic – Mighty Mint (30ml)", price: "$16.99", href: "#", fromPrice: true, rating: 5, reviews: 10, image: "/og/p-vgod-mint.png" },
      { name: "SMOK Novo 2 Pods", price: "$12.99", href: "#", rating: 5, reviews: 10, image: "/og/p-smok-novo.jpg" },
      { name: "Vaporesso XROS Pods", price: "$10.99", href: "#", rating: 5, reviews: 10, image: "/og/p-xros.jpg" },
    ] as Product[],
  },

  brands: {
    eyebrow: "Find your favorites",
    title: "Brands We Carry",
    link: { label: "Ask about a brand", href: tel },
    items: [
      { name: "JUUL", href: "#", logo: "/og/brand-juul.png" },
      { name: "Vue", href: "#", logo: "/og/brand-vue.png" },
      { name: "Myle", href: "#", logo: "/og/brand-myle.png" },
      { name: "Uwell", href: "#", logo: "/og/brand-uwell.png" },
      { name: "Vuse", href: "#", logo: "/og/brand-vuse.png" },
      { name: "SMOK", href: "#", logo: "/og/brand-smok.png" },
      { name: "Geek Bar", href: "#", logo: "/og/brand-geek-bar.png" },
      { name: "Suorin", href: "#", logo: "/og/brand-suorin.png" },
    ],
  },

  testimonials: {
    eyebrow: "5.0 on Google",
    title: "What our customers are saying",
    link: { label: "Leave us a review", href: reviewLink },
    items: [
      { text: "Joey is the absolute goat. Extremely helpful and knowledgable and great prices for vapes and accesories! Now that ive gotten to know the rest of the guys who work here, everybody else is awesome too! Love this place", author: "Taylor Crawford", product: "Google review · Local Guide" },
      { text: "Everyone that works there is amazing and has great customer service.. Great selection and vibe. Highly recommend!", author: "Lit Temple", product: "Google review" },
      { text: "This spot is dope they have a wide selection of vapes, bongs, pipes and all kinds of other stuff. Darius hooks it up", author: "Joey Day", product: "Google review" },
      { text: "This place is pretty great! They have what I want; it doesn't get better than that. They also have great customer service (no matter who's working)", author: "Miguel Kennedy", product: "Google review" },
      { text: "I came in and was assisted by darius he was very helpful and polite. We definitely be coming back because of his service!", author: "Lexi Wiod", product: "Google review" },
      { text: "Joey, is the best with customers and products knowledge. Thank you Joey for your service", author: "Luz Ortega", product: "Google review" },
    ],
  },

  bogo: {
    eyebrow: "Hot deals",
    title: "Ice Cold Steals",
    text: "Rotating in-store deals. Stop by, or add them to a pickup order and grab them on your way.",
    link: { label: "Call for today's deals", href: tel },
    items: [
      { name: "Pod Mesh Nano 1000 – Aloe Grape", price: "$11.99", href: "#", badge: "In store", image: "/og/p-podmesh-aloe.jpg" },
      { name: "Pod Mesh Nano 1000 – Strawberry Guava Freeze", price: "$11.99", href: "#", badge: "In store", image: "/og/p-podmesh-sgf.jpg" },
      { name: "VGOD Salt Nic – Lush Ice (30ml)", price: "$16.99", href: "#", badge: "In store", image: "/og/p-vgod-lush.png" },
      { name: "LUCY Breakers – Espresso", price: "$5.00", href: "#", badge: "In store", fromPrice: true, image: "/og/p-lucy-breakers-espresso.png" },
    ] as Product[],
  },

  visit: {
    eyebrow: "Visit us",
    title: "Come Chill With Us",
    hours: [
      { day: "Monday – Sunday", time: "8:00 AM – 12:00 AM" },
    ],
    amenities: ["Wheelchair-accessible entrance & parking", "Credit & debit cards accepted", "Quick in-and-out visits"],
  },

  footer: {
    columns: [
      { title: "Shop", links: [
        { label: "Categories", href: "#categories" },
        { label: "New In Store", href: "#new" },
        { label: "Customer Favorites", href: "#favorites" },
        { label: "Deals", href: "#deals" },
        { label: "Brands", href: "#brands" },
      ] },
      { title: "Store", links: [
        { label: "Get Directions", href: directions },
        { label: "Order for Pickup", href: "#pickup" },
        { label: "Call Us", href: tel },
        { label: "Leave a Review", href: reviewLink },
        { label: "Hours & Location", href: "#visit" },
      ] },
      { title: "Follow", links: [
        { label: "Instagram", href: "https://www.instagram.com/20belowsmokeandvape/" },
        { label: "Yelp", href: "https://www.yelp.com/biz/20-below-smoke-and-vape-las-vegas" },
        { label: "Google", href: "https://maps.google.com/?cid=2186090302637813266" },
      ] },
    ],
    newsletter: {
      title: "Get the hot deals first",
      text: "Drop your email for in-store specials and new arrivals. 21+ only.",
    },
    legal:
      "WARNING: Products sold at 20 Below Smoke & Vape may contain nicotine. Nicotine is an addictive chemical. You must be 21 or older to purchase tobacco and vapor products in Nevada; valid ID required. Products are sold in store only; pickup orders are paid for and ID-checked at the counter. No shipping or delivery. Product images and brand logos shown are placeholders. Prices and availability may vary.",
    copyright: "© 2026, 20 Below Smoke & Vape. All rights reserved.",
  },
};
