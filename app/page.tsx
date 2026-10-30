import { site } from "@/data/site";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeatureStrip from "@/components/FeatureStrip";
import Categories from "@/components/Categories";
import ProductCarousel from "@/components/ProductCarousel";
import PromoBanner from "@/components/PromoBanner";
import Brands from "@/components/Brands";
import Testimonials from "@/components/Testimonials";
import Bogo from "@/components/Bogo";
import Visit from "@/components/Visit";
import AgeGate from "@/components/AgeGate";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main>
        <Hero />
        <FeatureStrip />
        <Categories />
        <ProductCarousel {...site.newProducts} />
        <PromoBanner />
        <ProductCarousel {...site.bestsellers} />
        <Brands />
        <Testimonials />
        <Bogo />
        <Visit />
      </main>
      <Footer />
      <AgeGate />
    </>
  );
}
