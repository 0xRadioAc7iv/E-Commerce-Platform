import Categories from "@/components/Categories";
import FeaturedProducts from "@/components/FeaturedProducts";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <div>
      <Hero />
      <FeaturedProducts />
      <Categories />
    </div>
  );
}
