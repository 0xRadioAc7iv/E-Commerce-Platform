import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import client from "@/lib/axios";
import { useAuthStore } from "@/store";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const user = useAuthStore((state) => state.user);
  const reset = useAuthStore((state) => state.resetAuth);

  const [isSigningOut, setIsSigningOut] = useState(false);
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);

  const navigate = useNavigate();

  const handleDeleteAccount = async () => {
    setIsDeletingAccount(true);

    try {
      const data = { id: user?.id };
      const response = await client.delete("/api/auth/account", {
        data,
      });

      if (response.status === 204) {
        reset();
        navigate("/", { replace: true });
      }
    } catch (error) {
      alert("Failed to delete account");
    }

    setIsDeletingAccount(false);
  };

  const handleSignOutOfAllDevices = async () => {
    setIsSigningOut(true);

    try {
      const response = await client.post("/api/auth/logout/all");

      if (response.status === 204) {
        reset();
        navigate("/", { replace: true });
      }
    } catch (error) {
      alert("Failed to sign out!");
    }

    setIsSigningOut(false);
  };

  const handleUpdateEmail = async () => {};

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Profile</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p>
                <strong>Name:</strong> John Doe
              </p>
              <p>
                <strong>Email:</strong> john.doe@example.com
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex gap-2">
            <Button variant="outline" onClick={handleUpdateEmail}>
              Update Email
            </Button>
            <Button variant="outline">Change Password</Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Account Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full" asChild>
              <a href="/orders">View Past Orders</a>
            </Button>
            <Button className="w-full" asChild>
              <a href="/payments">View Payment Methods</a>
            </Button>
            <Button
              variant="destructive"
              disabled={isSigningOut}
              className="w-full"
              onClick={handleSignOutOfAllDevices}
            >
              {isSigningOut ? "Signing Out..." : "Sign out of All Devices"}
            </Button>
            <Button
              variant="destructive"
              disabled={isDeletingAccount}
              className="w-full"
              onClick={handleDeleteAccount}
            >
              {isDeletingAccount ? "Deleting..." : "Delete Account"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
