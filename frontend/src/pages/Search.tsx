import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import client from "@/lib/axios";
import { ShoppingCart } from "lucide-react";
import productDefaultImage from "../assets/product_default.jpg";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
};

type SearchFilters = {
  category: string;
  minPrice: number;
  maxPrice: number;
};

export default function ProductSearchPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    category: "All",
    minPrice: 0,
    maxPrice: 1000,
  });
  const [searchParams] = useSearchParams();

  const fetchProducts = async (filters: SearchFilters) => {
    setIsLoading(true);

    const queryParams = new URLSearchParams({
      category: filters.category !== "All" ? filters.category : "",
      minPrice: filters.minPrice.toString(),
      maxPrice: filters.maxPrice.toString(),
    });

    try {
      const response = await client.get(`/api/products?${queryParams}`);
      const products = response.data.products;

      setProducts(products);

      const uniqueCategories: Array<string> = Array.from(
        new Set(products.map((product: Product) => product.category))
      );

      setCategories(["All", ...uniqueCategories]);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const query = searchParams.get("query") || "";
    fetchProducts({ ...filters, category: query });
  }, [searchParams]);

  useEffect(() => {
    fetchProducts(filters);
  }, [filters]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64 space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                className="w-full p-2 border rounded-md mt-1"
                value={filters.category}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, category: e.target.value }))
                }
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label htmlFor="minPrice">Minimum Price</Label>
              <Input
                id="minPrice"
                type="number"
                value={filters.minPrice}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    minPrice: Number(e.target.value),
                  }))
                }
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="maxPrice">Maximum Price</Label>
              <Input
                id="maxPrice"
                type="number"
                value={filters.maxPrice}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    maxPrice: Number(e.target.value),
                  }))
                }
                className="mt-1"
              />
            </div>
          </div>
        </aside>

        <main className="flex-1">
          <div className="space-y-4">
            {isLoading
              ? Array(3)
                  .fill(null)
                  .map((_, i) => (
                    <Card key={i}>
                      <CardContent className="p-4">
                        <div className="flex gap-4">
                          <Skeleton className="h-[100px] w-[100px]" />
                          <div className="flex-1 space-y-2">
                            <Skeleton className="h-4 w-[250px]" />
                            <Skeleton className="h-4 w-[200px]" />
                            <Skeleton className="h-4 w-[150px]" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
              : products.map((product) => (
                  <Card key={product.id}>
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <img
                          src={productDefaultImage}
                          alt={product.name}
                          className="h-[100px] w-[100px] object-cover rounded-md"
                        />
                        <div className="flex-1">
                          <h2 className="text-xl font-semibold">
                            {product.name}
                          </h2>
                          <p className="text-gray-600">{product.description}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-lg font-bold">
                              ${product.price}
                            </span>
                            <Button>
                              <ShoppingCart className="mr-2 h-4 w-4" />
                              Add to Cart
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

            {!isLoading && products.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No products found matching your criteria.
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
