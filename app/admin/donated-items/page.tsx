"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { apiGet } from "@/lib/api";

type DonatedItem = {
  _id?: string;
  donationRequestId: string;
  organizationId: string;
  donatedAt?: string; // ISO date
};

export default function DonatedItemsPage() {
  const [items, setItems] = useState<DonatedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE || "https://capstone-api-dwzu.onrender.com";
      const tokenMatch = typeof document !== "undefined" ? document.cookie.match(/(?:^|; )accessToken=([^;]+)/) : null;
      const token = tokenMatch ? decodeURIComponent(tokenMatch[1]) : undefined;
      const res = await apiGet<unknown>("/admin/donated-items", { baseUrl, token });
      console.log("/admin/donated-items response:", res);
  type Wrapped = { data?: unknown; results?: unknown; items?: unknown; donatedItems?: unknown };
      const isWrapped = (x: unknown): x is Wrapped => typeof x === "object" && x !== null;
      let list: unknown = [];
      if (Array.isArray(res)) list = res;
      else if (isWrapped(res)) {
        if (Array.isArray(res.data)) list = res.data;
        else if (Array.isArray(res.results)) list = res.results;
        else if (Array.isArray(res.items)) list = res.items;
  else if (Array.isArray(res.donatedItems)) list = res.donatedItems;
      }
      setItems(list as DonatedItem[]);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to load";
      if (msg.includes("401") || msg.toLowerCase().includes("access denied")) {
        setError("Access denied. Please log in as admin.");
      } else {
        setError(msg);
      }
    }
    setLoading(false);
  }

  useEffect(() => {
    const t = setTimeout(() => void load(), 0);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen min-w-full bg-linear-to-r from-indigo-50 to-indigo-100 px-4 sm:px-6 md:px-10 py-6 sm:py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-indigo-700">Donated Items</h1>
        <Button onClick={load} className="bg-indigo-600 hover:bg-indigo-700 text-white" disabled={loading}>
          {loading ? "Refreshing..." : "Refresh"}
        </Button>
      </div>

      {error && (
        <p className="text-red-600 text-sm mb-3" role="alert">{error}</p>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        {loading && (
          Array.from({ length: 6 }).map((_, i) => (
            <Card key={`skeleton-${i}`} className="border border-indigo-200 bg-white">
              <CardHeader>
                <Skeleton className="h-6 w-40" />
              </CardHeader>
            </Card>
          ))
        )}

        {!loading && items.length === 0 && (
          <p className="text-muted-foreground">No items found.</p>
        )}

        {!loading && items.map((item, idx) => (
          <Card
            key={item._id ?? idx.toString()}
            className="transition-all hover:shadow-lg hover:-translate-y-1 border border-indigo-200 bg-white"
          >
            <CardHeader>
              <CardTitle className="text-indigo-700 font-semibold">
                Donated Item
              </CardTitle>
              <div className="text-sm text-gray-700 space-y-1">
                <div><span className="font-medium">Donation Request:</span> {item.donationRequestId}</div>
                <div><span className="font-medium">Organization:</span> {item.organizationId}</div>
                {item.donatedAt ? (
                  <div><span className="font-medium">Donated At:</span> {new Date(item.donatedAt).toLocaleString()}</div>
                ) : null}
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
