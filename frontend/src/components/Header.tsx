import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Search, Heart, User, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/store";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const signOut = useAuthStore((state) => state.signOutUser);
  const reset = useAuthStore((state) => state.resetAuth);
  const user = useAuthStore((state) => state.user);

  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate("/", { replace: true });
  };

  const handleSignOut = async () => {
    await signOut();
    reset();
    navigate("/", { replace: true });
  };

  return (
    <header className="border-b">
      <div className="container mx-auto px-2 py-4 flex gap-6 items-center justify-between space-x-12">
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
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center">
                  <User className="h-6 w-6 mr-1" />
                  <span className="hidden md:inline">Profile</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{user?.email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <a href="/profile">Profile</a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="/orders">Orders</a>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <a href="/auth">
              <Button
                onClick={handleSignIn}
                variant="ghost"
                className="flex items-center"
              >
                <User className="h-6 w-6 mr-2" />
                <span className="hidden md:inline">Sign In</span>
              </Button>
            </a>
          )}
          <Button size="icon" variant="ghost" className="md:hidden">
            <Search className="h-6 w-6" />
            <span className="sr-only">Search</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
