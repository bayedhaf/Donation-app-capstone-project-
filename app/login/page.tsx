"use client";
import Link from "next/link";
  import { Button } from "@/components/ui/button";
  import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import { Input } from "@/components/ui/input";
  import { Label } from "@/components/ui/label";


  import { apiPost } from "@/lib/api";
  import { useState } from "react";

  export default function LoginPage() {
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function handleLogin(formData: FormData) {
      setError(null);
      setSuccess(null);
      setLoading(true);
      const payload = {
        email: String(formData.get("email") || ""),
        password: String(formData.get("password") || ""),
      };

      try {
        await apiPost("/users/login", payload);
        setSuccess("Login successful.");
        // Optional: redirect after login
        // setTimeout(() => (window.location.href = "/"), 400);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Login failed";
        setError(message);
      }
      setLoading(false);
    }

    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-indigo-50 to-indigo-100 px-4">
        <Card className="max-w-md w-full bg-white shadow-lg rounded-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-indigo-700">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-indigo-600">
              Sign in to continue
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form action={handleLogin} className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-indigo-700">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  className="border-indigo-300 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password" className="text-indigo-700">
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="border-indigo-300 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-60"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </Button>

              {error && (
                <p className="text-red-600 text-sm" role="alert">
                  {error}
                </p>
              )}
              {success && (
                <p className="text-green-600 text-sm" role="status">
                  {success}
                </p>
              )}
            </form>
          </CardContent>

          <CardFooter className="flex flex-col gap-3">
            <CardAction>
              <Link href="/signup">
                <Button variant="link" className="text-indigo-600 hover:text-indigo-800">
                  New here? Create an account
                </Button>
              </Link>
            </CardAction>
          </CardFooter>
        </Card>
      </div>
    );
  }
 
