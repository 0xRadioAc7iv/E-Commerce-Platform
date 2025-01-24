import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ShoppingCart, HeartIcon } from "lucide-react";
import productDefaultImage from "../assets/product_default.jpg";
import client from "@/lib/axios";

type ProductData = {
  product_id: number;
  name: string;
  price: number;
  category: string;
};

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [filterCategory, setFilterCategory] = useState("All");
  const [products, setProducts] = useState<Array<ProductData>>([]);
  const [categories, setCategories] = useState<Array<string>>([]);
  const [, setWishlistItems] = useState<Array<ProductData>>([]);

  const filteredAndSortedProducts = products
    .filter(
      (product) =>
        (filterCategory === "All" || product.category === filterCategory) &&
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "priceLow") return a.price - b.price;
      if (sortBy === "priceHigh") return b.price - a.price;
      return 0;
    });

  const getProducts = async () => {
    try {
      const response = await client.get("/api/products");
      const data = response.data;

      return data.products;
    } catch (error) {
      alert("Failed to fetch products");
    }
  };

  const addToWishlist = async (productId: number) => {
    setWishlistItems((prevItems) =>
      prevItems.filter((item) => item.product_id !== productId)
    );

    try {
      const response = await client.post("/api/wishlist", {
        productId: productId,
      });

      if (response.status !== 204) {
        alert("Failed to add item to wishlist");
      }
    } catch (error) {
      alert("Error adding item to wishlist");
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
      }
    } catch (error) {
      alert("Error adding item to cart");
    }
  };

  useEffect(() => {
    getProducts()
      .then((data) => {
        if (data) {
          setProducts(data);

          const uniqueCategories: Array<string> = Array.from(
            new Set(data.map((product: ProductData) => product.category))
          );

          setCategories(["All", ...uniqueCategories]);
        }
      })
      .catch(() => alert("Error loading products"));
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Our Products</h1>

      <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0 md:space-x-4">
        <Input
          type="search"
          placeholder="Search products..."
          className="max-w-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex space-x-4">
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="priceLow">Price: Low to High</SelectItem>
              <SelectItem value="priceHigh">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredAndSortedProducts.map((product) => (
          <Card key={product.product_id} className="flex flex-col">
            <CardContent className="p-4">
              <img
                src={productDefaultImage}
                alt={product.name}
                className="w-full h-48 object-cover mb-4"
              />
              <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
              <p className="text-gray-600">${product.price}</p>
              <p className="text-sm text-gray-500 mt-1">{product.category}</p>
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button onClick={() => addToCart(product.product_id)}>
                <ShoppingCart className="h-4 w-4" /> Add to Cart
              </Button>
              <Button onClick={() => addToWishlist(product.product_id)}>
                <HeartIcon className="h-4 w-4" /> Wishlist
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
