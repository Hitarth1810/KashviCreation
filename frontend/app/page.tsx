import { HeroSection } from "./components/hero-section";
import { FeaturedProducts } from "./components/featured-products";
import { PopularCategories } from "./components/popular-categories";
import { PopularProducts } from "./components/popular-products";
export default function Home() {
  return (
    <div>
      <HeroSection/>
      <FeaturedProducts/>
      <PopularCategories/>
      <PopularProducts/>
    </div>
  );
}
