import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Heart, ShoppingCart } from "lucide-react";
import client from "@/lib/axios";
import productDefaultImage from "../assets/product_default.jpg";

type ProductData = {
  product_id: number;
  name: string;
  price: number;
  category: string;
};

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState<Array<ProductData>>([]);

  const getWishlistItems = async () => {
    try {
      const response = await client.get("/api/wishlist");
      console.log(response.data);
      const { products } = response.data;

      setWishlistItems(products);
    } catch (error) {
      console.log(error);
      alert("Failed to fetch wishlist items");
    }
  };

  const removeFromWishlist = async (productId: number) => {};

  useEffect(() => {
    getWishlistItems();
  }, []);

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
            <Card key={item.product_id}>
              <CardContent className="p-4">
                <img
                  src={productDefaultImage}
                  alt={item.name}
                  className="w-full h-48 object-cover mb-4"
                />
                <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
                <p className="text-gray-600">${item.price}</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => removeFromWishlist(item.product_id)}
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
