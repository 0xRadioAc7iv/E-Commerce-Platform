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
import { ShoppingCart } from "lucide-react";
import productDefaultImage from "../assets/product_default.jpg";
import client from "@/lib/axios";

type ProductData = {
  id: number;
  name: string;
  price: number;
  category: string;
};

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [filterCategory, setFilterCategory] = useState("All");
  const [products, setProducts] = useState<Array<ProductData>>([]);

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

  useEffect(() => {
    getProducts()
      .then((data) => {
        setProducts(data);
      })
      .then(() => console.log(products));
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
              <SelectItem value="All">All Categories</SelectItem>
              <SelectItem value="Accessories">Accessories</SelectItem>
              <SelectItem value="Bags">Bags</SelectItem>
              <SelectItem value="Electronics">Electronics</SelectItem>
              <SelectItem value="Home">Home</SelectItem>
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
          <Card key={product.id} className="flex flex-col">
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
            <CardFooter className="mt-auto">
              <Button className="w-full">
                <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
