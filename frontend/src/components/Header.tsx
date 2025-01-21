import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Search, Heart, User } from "lucide-react";

export default function Header() {
  return (
    <header className="border-b">
      <div className="px-4 py-4 flex gap-4 items-center justify-between space-x-12">
        <a href="/" className="text-2xl font-bold">
          Store
        </a>
        <nav className="hidden md:flex items-center space-x-6">
          <a href="/products" className="text-gray-600 hover:text-gray-900">
            All Products
          </a>
          <a href="/sale" className="text-gray-600 hover:text-gray-900">
            Sale
          </a>
        </nav>
        <div className="hidden md:flex items-center space-x-4 flex-1 max-w-2xl mx-auto">
          <div className="relative w-full">
            <Input
              type="search"
              placeholder="Search..."
              className="w-full pr-10"
            />
            <Button
              size="icon"
              variant="ghost"
              className="absolute right-0 top-0"
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          </div>
        </div>
        <div className="flex items-center space-x-6">
          <a href="/wishlist" className="flex items-center">
            <Heart className="h-6 w-6" />
            <span className="ml-2 text-sm font-medium hidden md:inline">
              Wishlist
            </span>
          </a>
          <a href="/cart" className="flex items-center">
            <ShoppingBag className="h-6 w-6" />
            <span className="ml-2 text-sm font-medium hidden md:inline">
              Cart
            </span>
          </a>
          <a href="/profile" className="flex items-center">
            <User className="h-6 w-6" />
            <span className="ml-2 text-sm font-medium hidden md:inline">
              Profile
            </span>
          </a>
          <Button size="icon" variant="ghost" className="md:hidden">
            <Search className="h-6 w-6" />
            <span className="sr-only">Search</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
