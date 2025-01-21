import { Button } from "@/components/ui/button";

export default function PaymentsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Payment Methods</h1>
      <p className="mb-4">You have no saved payment methods.</p>
      <Button asChild>
        <a href="/profile">Back to Profile</a>
      </Button>
    </div>
  );
}
