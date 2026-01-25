"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function UsersSignupPage() {
	// This users-scoped signup page defers to the main /signup route.
	return (
		<main className="min-h-screen flex items-center justify-center bg-linear-to-r from-indigo-50 to-indigo-100">
			<div className="bg-white shadow-md rounded-lg p-6 text-center">
				<h1 className="text-xl font-semibold text-indigo-700 mb-4">Users Signup</h1>
				<p className="text-indigo-600 mb-6">Please use the main signup page.</p>
				<Link href="/signup">
					<Button className="bg-indigo-600 hover:bg-indigo-700 text-white">Go to Signup</Button>
				</Link>
			</div>
		</main>
	);
}

