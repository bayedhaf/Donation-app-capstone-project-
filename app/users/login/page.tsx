"use client";

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
import Link from "next/link";
import { apiPost } from "@/lib/api";

export default function LoginPage() {
  async function handleLogin(formData: FormData) {
    await apiPost("/users/login", {
      email: formData.get("email"),
      password: formData.get("password"),
    });
    alert("Login success (placeholder)");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-50 to-indigo-100 px-4">
      <Card className="max-w-md w-full bg-white shadow-lg rounded-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-indigo-700">
            Login to Your Account
          </CardTitle>
          <CardDescription className="text-indigo-600">
            Enter your email below to login
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
                type="email"
                placeholder="m@example.com"
                required
                className="border-indigo-300 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password" className="text-indigo-700">
                  Password
                </Label>
                <a
                  href="#"
                  className="ml-auto text-sm text-indigo-600 underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                required
                className="border-indigo-300 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-3">
          <Button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            Login
          </Button>

          <CardAction>
            <Link href="/users/signup">
              <Button variant="link" className="text-indigo-600 hover:text-indigo-800">
                Don't have an account? Sign Up
              </Button>
            </Link>
          </CardAction>

          <Button
            variant="outline"
            className="w-full text-indigo-600 border-indigo-600 hover:bg-indigo-50"
          >
            Login with Google
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
