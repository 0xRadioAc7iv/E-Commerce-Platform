import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Minus, Plus, X } from "lucide-react";
import client from "@/lib/axios";
import productDefaultImage from "../assets/product_default.jpg";

type ProductData = {
  product_id: number;
  name: string;
  price: number;
  quantity: number;
};

export default function CartPage() {
  const [cartItems, setCartItems] = useState<Array<ProductData>>([]);

  const updateQuantity = async (id: number, newQuantity: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.product_id === id
          ? { ...item, quantity: Math.max(0, newQuantity) }
          : item
      )
    );

    try {
      const response = await client.patch("/api/cart", {
        productId: id,
        productQuantity: newQuantity,
      });

      if (response.status !== 201) {
        alert("Failed to update item quantity cart");
        getCartItems();
      }
    } catch (error) {
      alert(error);
      getCartItems();
    }
  };

  const removeItemFromCart = async (id: number) => {
    setCartItems((items) => items.filter((item) => item.product_id !== id));

    try {
      const response = await client.delete("/api/cart", {
        data: { productId: id },
      });

      if (response.status !== 204) {
        alert("Failed to remove item from cart");
        getCartItems();
      }
    } catch (error) {
      alert(error);
      getCartItems();
    }
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const getCartItems = async () => {
    try {
      const response = await client.get("/api/cart");
      const products = response.data.products;

      console.log(products);

      if (response.status === 200) {
        setCartItems(products);
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getCartItems();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div className="text-center">
          <p className="mb-4">Your cart is empty.</p>
          <Button asChild>
            <a href="/">Continue Shopping</a>
          </Button>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {cartItems.map((item) => (
              <Card key={item.product_id} className="mb-4">
                <CardContent className="flex items-center p-4">
                  <img
                    src={productDefaultImage}
                    alt={item.name}
                    className="w-20 h-20 object-cover mr-4"
                  />
                  <div className="flex-grow">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-gray-600">${item.price}</p>
                    <div className="flex items-center mt-2">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() =>
                          updateQuantity(item.product_id, item.quantity - 1)
                        }
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input
                        type="number"
                        min="0"
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(
                            item.product_id,
                            parseInt(e.target.value)
                          )
                        }
                        className="w-16 mx-2 text-center"
                      />
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() =>
                          updateQuantity(item.product_id, item.quantity + 1)
                        }
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => removeItemFromCart(item.product_id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Proceed to Checkout</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
