import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-r from-indigo-50 to-indigo-100 px-4">
      <div className="text-center max-w-md">
        <h1 className="text-7xl font-extrabold text-indigo-700 tracking-tight">
          404
        </h1>

        <h2 className="mt-4 text-2xl font-semibold text-indigo-800">
          Page Not Found
        </h2>

        <p className="mt-2 text-sm text-indigo-600">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>

        <div className="mt-6 flex justify-center">
          <Link href="/">
            <Button className="bg-indigo-600 hover:bg-indigo-700">
              Return Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
