import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Heart, ShoppingCart } from "lucide-react";

// Mock data for wishlist items
const initialWishlistItems = [
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
];

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState(initialWishlistItems);

  const removeFromWishlist = (id: number) => {
    setWishlistItems((items) => items.filter((item) => item.id !== id));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>
      {wishlistItems.length === 0 ? (
        <div className="text-center">
          <p className="mb-4">Your wishlist is empty.</p>
          <Button asChild>
            <a href="/">Continue Shopping</a>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-4">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="w-full h-48 object-cover mb-4"
                />
                <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
                <p className="text-gray-600">${item.price.toFixed(2)}</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => removeFromWishlist(item.id)}
                >
                  <Heart className="h-4 w-4 mr-2" />
                  Remove
                </Button>
                <Button>
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
