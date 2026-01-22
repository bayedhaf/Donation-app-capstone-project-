// app/page.tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-indigo-50 to-indigo-100">
      
      {/* Header */}
      <header className="w-full flex justify-between items-center px-8 py-6 bg-white shadow-md sticky top-0 z-50">
        <h1 className="text-2xl font-bold text-indigo-600">Donation App</h1>
        <nav className="flex gap-4">
          <Link href="/users/login" className="text-indigo-600 font-medium hover:text-indigo-800">
            Login
          </Link>
          <Link href="/users/signup">
            <Button variant="default" className="bg-indigo-600 hover:bg-indigo-700 text-white">
              Sign Up
            </Button>
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center text-center mt-20 px-6 md:px-20">
        <h2 className="text-4xl md:text-5xl font-extrabold text-indigo-700 mb-4">
          Welcome to Donation App
        </h2>
        <p className="text-lg text-indigo-600 max-w-2xl mb-8">
          Build, manage, and grow your projects efficiently with our modern tools.
        </p>
        <div className="flex gap-4">
          <Link href="/users/signup">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg">
              Get Started
            </Button>
          </Link>
          <Link href="/users/login">
            <Button variant="outline" className="text-indigo-600 border-indigo-600 hover:bg-indigo-50 px-6 py-3 rounded-lg">
              Login
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="mt-20 grid gap-8 md:grid-cols-3 px-6 md:px-20">
        <Card className="bg-white shadow-md hover:shadow-lg transition-all">
          <CardContent>
            <h3 className="text-xl font-bold text-indigo-700 mb-2">Feature One</h3>
            <p className="text-indigo-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-md hover:shadow-lg transition-all">
          <CardContent>
            <h3 className="text-xl font-bold text-indigo-700 mb-2">Feature Two</h3>
            <p className="text-indigo-600">Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-md hover:shadow-lg transition-all">
          <CardContent>
            <h3 className="text-xl font-bold text-indigo-700 mb-2">Feature Three</h3>
            <p className="text-indigo-600">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="mt-20 w-full py-6 bg-white border-t border-indigo-100 text-center text-indigo-600">
        &copy; 2026 Donation App. All rights reserved.
      </footer>

    </main>
  );
}
