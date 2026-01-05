"use client";

import { useState } from "react";
import { Input } from "@/client/primatives/input";
import { Button } from "@/client/primatives/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/client/primatives/card";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/client/primatives/tabs";
import { Label } from "@/client/primatives/label";
import { authClient } from "@/lib/auth-client"; //import the auth client
import { useRouter } from "next/navigation";
export default function LoginPage() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [signupLoading, setSignupLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [signupError, setSignupError] = useState<string | null>(null);
  const router = useRouter();
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignupLoading(true);
    setSignupError(null);


    
    const { data, error } = await authClient.signUp.email(
      {
        email: signupEmail,
        password: signupPassword,
        name: signupEmail,
      },
      {
        onRequest: (ctx) => {
          //show loading
          console.log(ctx);
          console.log("loading");
        },
        onSuccess: (ctx) => {
          //redirect to the dashboard or sign in page
          console.log(ctx);
          console.log("success");
          router.push("/dashboard");
        },
        onError: (ctx) => {
          // display the error message
          console.log(ctx);
          console.log("error");
          setSignupError(ctx.error.message ?? "Unknown error");
        },
      }
    );

    setSignupLoading(false);
    if (error) {
      setSignupError(error.message ?? "Unknown error");
    }
    // Optionally, redirect or clear form on success
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError(null);
    const { data, error } = await authClient.signIn.email(
      {
        email: loginEmail,
        password: loginPassword,
      },
      {
        onRequest: (ctx) => {
          console.log(ctx);
          console.log("login loading");
        },
        onSuccess: (ctx) => {
          console.log(ctx);
          console.log("login success");
        },
        onError: (ctx) => {
          console.log(ctx);
          console.log("login error");
          setLoginError(ctx.error.message ?? "Unknown error");
        },
      }
    );

    setLoginLoading(false);
    if (error) {
      setLoginError(error.message ?? "Unknown error");
    }
    // Optionally, redirect or clear form on success
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Tabs defaultValue="login" className="w-full max-w-sm">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>

        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Login</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={handleLogin}>
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    autoComplete="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <Input
                    id="login-password"
                    type="password"
                    autoComplete="current-password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                  />
                </div>
                {loginError && (
                  <div className="text-red-500 text-sm">{loginError}</div>
                )}
                <Button
                  className="w-full mt-2"
                  type="submit"
                  disabled={loginLoading}
                >
                  {loginLoading ? "Logging in..." : "Login"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Sign Up</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={handleSignUp}>
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    autoComplete="email"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    autoComplete="new-password"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    placeholder="Create a password"
                    required
                  />
                </div>
                {signupError && (
                  <div className="text-red-500 text-sm">{signupError}</div>
                )}
                <Button
                  className="w-full mt-2"
                  type="submit"
                  disabled={signupLoading}
                >
                  {signupLoading ? "Signing up..." : "Sign Up"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
