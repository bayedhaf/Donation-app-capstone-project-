"use client";

import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { items } from "@/lib/admin-nav";

export default function AdminPage() {
  return (
    <div className="p-10 min-h-screen bg-gradient-to-r from-indigo-50 to-indigo-100">
      <h1 className="text-3xl font-bold mb-2 tracking-tight text-indigo-700">
        Admin Overview
      </h1>
      <p className="text-indigo-600 mb-8">
        Manage donations, organizations, and platform operations
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <Link key={item.title} href={item.url}>
            <Card
              className="
                h-full cursor-pointer
                border border-indigo-200
                transition-all
                hover:shadow-lg
                hover:-translate-y-1
                hover:border-indigo-400
                bg-white
              "
            >
              <CardHeader className="flex flex-row items-center gap-4">
                <div
                  className="
                    flex h-10 w-10 items-center justify-center
                    rounded-lg
                    bg-indigo-100
                    text-indigo-600
                  "
                >
                  <item.icon className="h-5 w-5" />
                </div>

                <div>
                  <CardTitle className="text-base font-semibold text-indigo-700">
                    {item.title}
                  </CardTitle>
                  <CardDescription className="text-indigo-600">
                    {item.description}
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-sm text-indigo-500">
                  Click to view and manage{" "}
                  <span className="text-indigo-700 font-medium">
                    {item.title.toLowerCase()}
                  </span>
                  .
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
