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
      const { products } = response.data;

      setWishlistItems(products);
    } catch (error) {
      console.log(error);
      alert("Failed to fetch wishlist items");
    }
  };

  const removeFromWishlist = async (productId: number) => {
    setWishlistItems((prevItems) =>
      prevItems.filter((item) => item.product_id !== productId)
    );

    try {
      const response = await client.delete("/api/wishlist", {
        data: { productId: productId },
      });

      if (response.status !== 204) {
        alert("Failed to remove item from wishlist");
        await getWishlistItems();
      }
    } catch (error) {
      alert("Error removing item from wishlist");
      await getWishlistItems();
    }
  };

  const addToCart = async (productId: number) => {
    setWishlistItems((prevItems) =>
      prevItems.map((item) =>
        item.product_id === productId ? { ...item, inCart: true } : item
      )
    );

    try {
      const response = await client.post("/api/cart", {
        productId: productId,
        productQuantity: 1,
      });

      if (response.status !== 201) {
        alert("Failed to add item to cart");
        await getWishlistItems();
      }
    } catch (error) {
      alert("Error adding item to cart");
      await getWishlistItems();
    }
  };

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
                <Button onClick={() => addToCart(item.product_id)}>
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
