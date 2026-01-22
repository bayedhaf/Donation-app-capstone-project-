"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const items = [
  { id: "1", name: "Blankets", quantity: 40 },
  { id: "2", name: "Books", quantity: 100 },
];

export default function DonatedItemsPage() {
  return (
    <div className="min-h-screen min-w-full bg-gradient-to-r from-indigo-50 to-indigo-100 px-4 sm:px-6 md:px-10 py-6 sm:py-10">
      <h1 className="text-3xl font-bold mb-6 text-indigo-700">
        Donated Items
      </h1>

      <div className="grid gap-4 sm:grid-cols-2">
        {items.map((item) => (
          <Card
            key={item.id}
            className="transition-all hover:shadow-lg hover:-translate-y-1 border border-indigo-200 bg-white"
          >
            <CardHeader>
              <CardTitle className="text-indigo-700 font-semibold">
                {item.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-indigo-600">
                Total Quantity: {item.quantity}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
