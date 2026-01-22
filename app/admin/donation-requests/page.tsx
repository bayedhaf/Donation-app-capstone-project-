"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const requests = [
  { id: "1", item: "Clothes", quantity: 10 },
  { id: "2", item: "Food Packs", quantity: 25 },
];

export default function DonationRequestsPage() {
  return (
    <div className="min-h-screen min-w-full bg-gradient-to-r from-indigo-50 to-indigo-100 px-4 sm:px-6 md:px-10 py-6 sm:py-10">
      <h1 className="text-3xl font-bold mb-6 text-indigo-700">
        Donation Requests
      </h1>

      <div className="space-y-4">
        {requests.map((req) => (
          <Card
            key={req.id}
            className="transition-all hover:shadow-lg hover:-translate-y-1 border border-indigo-200 bg-white"
          >
            <CardHeader>
              <CardTitle className="text-indigo-700 font-semibold">
                {req.item}
              </CardTitle>
            </CardHeader>

            <CardContent className="flex justify-between items-center">
              <p className="text-indigo-600">Quantity: {req.quantity}</p>
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                Review
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
