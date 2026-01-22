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

export default function SignupPage() {
  async function handleSignup(formData: FormData) {
    await apiPost("/users/signup", {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    });
    alert("Signup successful (placeholder)");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-50 to-indigo-100 px-4">
      <Card className="max-w-md w-full bg-white shadow-lg rounded-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-indigo-700">
            Create a New Account
          </CardTitle>
          <CardDescription className="text-indigo-600">
            Enter your details below to sign up
          </CardDescription>
       </CardHeader>

        <CardContent>
          <form action={handleSignup} className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="name" className="text-indigo-700">
                Full Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Bayisa ..."
                required
                className="border-indigo-300 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

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
              <Label htmlFor="password" className="text-indigo-700">
                Password
              </Label>
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
            Sign Up
          </Button>
            <CardAction>
            <Link href="/users/login">
              <Button variant="link" className="text-indigo-600 hover:text-indigo-800">
                  Already have an account? Sign In
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
