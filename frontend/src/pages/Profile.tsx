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
  const setUser = useAuthStore((state) => state.setUser);

  const [isSigningOut, setIsSigningOut] = useState(false);
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username,
    email: user?.email,
  });

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

  const handleUpdateProfile = async () => {
    try {
      const response = await client.put("/api/auth/account", formData);
      if (response.status === 200) {
        const updatedUserData = response.data.user;
        setUser(updatedUserData);
        // Add Toast here
        setIsModalOpen(false);
      }
    } catch (error) {
      alert("Failed to update profile"); // Replace with Toast
    }
  };

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
                <strong>Username:</strong> {user?.username}
              </p>
              <p>
                <strong>Email:</strong> {user?.email}
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex gap-2">
            <Button variant="outline" onClick={() => setIsModalOpen(true)}>
              Update Profile
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
              <a href="/payments">View Payments</a>
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
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Update Profile</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdateProfile();
              }}
            >
              <div className="mb-4">
                <label
                  className="block text-sm font-medium mb-2"
                  htmlFor="username"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Save</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
