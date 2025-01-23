import { useState } from "react";
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
import { useNavigate } from "react-router-dom";
import client from "@/lib/axios";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [resetData, setResetData] = useState({ otp: "", newPassword: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState("email"); // 'email' or 'resetPassword'

  const navigate = useNavigate();

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await client.post("/api/auth/password/request-reset", {
        email: email,
      });

      if (response.status === 200) setStep("resetPassword");
    } catch (error) {
      alert(error);
    }

    setIsLoading(false);

    // toast({
    //   title: "OTP Sent",
    //   description: "Please check your email for the OTP.",
    // })
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await client.post("/api/auth/password/reset", {
        email: email,
        ...resetData,
      });

      if (response.status === 200) {
        navigate("/auth", { replace: true });
      }
    } catch (error) {
      alert(error);
    }

    setIsLoading(false);

    // toast({
    //   title: "Password Reset",
    //   description: "Your password has been reset successfully.",
    // })
  };

  return (
    <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Reset Password</CardTitle>
          <CardDescription>
            {step === "email"
              ? "Enter your email to receive a one-time password"
              : "Enter the OTP sent to your email and your new password"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={step === "email" ? handleSendOtp : handleResetPassword}
          >
            <div className="space-y-4">
              {step === "email" ? (
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              ) : (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="otp">One-Time Password</Label>
                    <Input
                      id="otp"
                      type="text"
                      placeholder="Enter OTP"
                      required
                      value={resetData.otp}
                      onChange={(e) =>
                        setResetData({ ...resetData, otp: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      placeholder="Enter new password"
                      required
                      value={resetData.newPassword}
                      onChange={(e) =>
                        setResetData({
                          ...resetData,
                          newPassword: e.target.value,
                        })
                      }
                    />
                  </div>
                </>
              )}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading
                  ? "Processing..."
                  : step === "email"
                  ? "Send OTP"
                  : "Reset Password"}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <a href="/auth" className="text-sm text-gray-600 hover:text-gray-900">
            Back to Sign In
          </a>
        </CardFooter>
      </Card>
    </div>
  );
}
