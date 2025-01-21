import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuthStore } from "@/store";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("signin");

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const signInUser = useAuthStore((state) => state.signInUser);
  const signUpUser = useAuthStore((state) => state.signUpUser);

  const navigate = useNavigate();

  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  });

  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  });

  const handleSignInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignInData({
      ...signInData,
      [e.target.id.replace("signin-", "")]: e.target.value,
    });
  };

  const handleSignUpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpData({
      ...signUpData,
      [e.target.id.replace("signup-", "")]: e.target.value,
    });
  };

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    await signInUser(signInData.email, signInData.password);

    if (useAuthStore.getState().isAuthenticated) {
      navigate("/", { replace: true });
    } else {
      console.log("ERROR: Sign in failed"); // Replace with Toasts
      setIsLoading(false);
    }
  };

  const handleSignUp = async (_event: React.FormEvent<HTMLFormElement>) => {
    const { name, email, password, confirmPassword } = signUpData;

    if (password.length < 8 || password !== confirmPassword) {
      alert("Passwords do not match"); // Replace with Toasts
      return;
    }

    setIsLoading(true);
    const result = await signUpUser(email, name, password);
    console.log(result);

    if (result) {
      navigate("/", { replace: true });
    } else {
      console.log("ERROR: Sign up failed"); // Replace with Toasts
    }

    setIsLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Welcome to Store</CardTitle>
          <CardDescription>Sign up or sign in to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="signin">
              <form onSubmit={handleSignIn}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email">Email</Label>
                    <Input
                      id="signin-email"
                      type="email"
                      placeholder="m@example.com"
                      required
                      value={signInData.email}
                      onChange={handleSignInChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signin-password">Password</Label>
                    <Input
                      id="signin-password"
                      type="password"
                      required
                      value={signInData.password}
                      onChange={handleSignInChange}
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Signing In..." : "Sign In"}
                  </Button>
                </div>
              </form>
            </TabsContent>
            <TabsContent value="signup">
              <form onSubmit={handleSignUp}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Name</Label>
                    <Input
                      id="signup-name"
                      placeholder="John Doe"
                      required
                      value={signUpData.name}
                      onChange={handleSignUpChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="m@example.com"
                      required
                      value={signUpData.email}
                      onChange={handleSignUpChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      required
                      value={signUpData.password}
                      onChange={handleSignUpChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-confirmPassword">
                      Confirm Password
                    </Label>
                    <Input
                      id="signup-confirmPassword"
                      type="password"
                      required
                      value={signUpData.confirmPassword}
                      onChange={handleSignUpChange}
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Signing Up..." : "Sign Up"}
                  </Button>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-center">
          <a href="/" className="text-sm text-gray-600 hover:text-gray-900">
            Back to Home
          </a>
        </CardFooter>
      </Card>
    </div>
  );
}
