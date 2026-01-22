"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const orgs = [
  { id: "1", name: "Helping Hands NGO" },
  { id: "2", name: "Food for All Foundation" },
];

export default function OrgsPage() {
  return (
    <div className="p-10 min-h-screen bg-gradient-to-r from-indigo-50 to-indigo-100">
      <h1 className="text-3xl font-bold mb-6 text-indigo-700">
        Organizations
      </h1>

      <div className="space-y-4">
        {orgs.map((org) => (
          <Card
            key={org.id}
            className="transition-all hover:shadow-lg hover:-translate-y-1 border border-indigo-200 bg-white"
          >
            <CardHeader>
              <CardTitle className="text-indigo-700 font-semibold">
                {org.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-indigo-600">
                Registered organization
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
