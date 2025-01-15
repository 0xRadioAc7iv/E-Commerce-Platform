import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="bg-gray-100 py-12 md:py-24">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Welcome to Store
        </h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Discover our curated collection of essential products for your
          everyday needs.
        </p>
        <a href="/products/all">
          <Button size="lg">Shop Now</Button>
        </a>
      </div>
    </section>
  );
}
