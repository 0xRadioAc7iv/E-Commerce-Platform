import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const products = [
  {
    id: 1,
    name: "Minimal Watch",
    price: 99.99,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 2,
    name: "Sleek Backpack",
    price: 79.99,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 3,
    name: "Wireless Earbuds",
    price: 129.99,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 4,
    name: "Minimalist Wallet",
    price: 39.99,
    image: "/placeholder.svg?height=200&width=200",
  },
];

export default function FeaturedProducts() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-8 text-center">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="flex flex-col">
              <CardContent className="p-4">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-48 object-cover mb-4"
                />
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600">${product.price.toFixed(2)}</p>
              </CardContent>
              <CardFooter className="mt-auto">
                <Button className="w-full">Add to Cart</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
