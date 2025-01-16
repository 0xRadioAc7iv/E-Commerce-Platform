import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";

export default function OrdersPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">My Orders</h1>
          <p className="mb-4">You have no orders yet.</p>
          <Button asChild>
            <a href="/profile">Back to Profile</a>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
