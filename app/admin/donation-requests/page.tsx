"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell, TableCaption } from "@/components/ui/table";
import { apiGet } from "@/lib/api";

type DonationRequest = {
  id?: string;
  itemName: string;
  itemType: string;
  numberOfItems: number;
  description: string;
  item?: string; // URL or filename of uploaded image
  street: string;
  city: string;
  region: string;
  latitude: string;
  longitude: string;
};

export default function DonationRequestsPage() {
  const [data, setData] = useState<DonationRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE || "https://capstone-api-dwzu.onrender.com";
  const tokenMatch = typeof document !== "undefined" ? document.cookie.match(/(?:^|; )accessToken=([^;]+)/) : null;
  const token = tokenMatch ? decodeURIComponent(tokenMatch[1]) : undefined;
  type Wrapped = { data?: DonationRequest[]; results?: DonationRequest[] } | DonationRequest[];
  const res = await apiGet<Wrapped>("/admin/donation-requests", { baseUrl, token });
      const list: DonationRequest[] = Array.isArray(res)
        ? res
        : Array.isArray(res?.data)
          ? res.data
          : Array.isArray(res?.results)
            ? res.results
            : [];
      console.log("donation-requests response", res);
      setData(list);
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
    const t = setTimeout(() => {
      void load();
    }, 0);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen mx-auto bg-linear-to-r from-indigo-50 to-indigo-100 px-4 sm:px-6 md:px-10 py-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4 sm:gap-0">
        <h1 className="text-2xl sm:text-3xl font-bold text-indigo-700">Donation Requests</h1>
        <Button
          onClick={load}
          className="bg-indigo-600 hover:bg-indigo-700 text-white"
          disabled={loading}
        >
          {loading ? "Refreshing..." : "Refresh"}
        </Button>
      </div>

      <Card className="border border-indigo-200 bg-white overflow-x-auto">
        <CardHeader>
          <CardTitle className="text-indigo-700 font-semibold text-lg sm:text-xl">
            All Requests
          </CardTitle>
        </CardHeader>
        <CardContent className="p-2 sm:p-4">
          {error && (
            <div className="mb-3 rounded-md border border-red-200 bg-red-50 p-2">
              <p className="text-red-700 text-sm" role="alert">{error}</p>
              <p className="text-xs text-red-600 mt-1">If this is an authorization error, please log in and retry.</p>
            </div>
          )}
          {/* Mobile list (visible on small screens), table hidden */}
          <div className="sm:hidden space-y-3">
            {!loading && data.length === 0 && !error && (
              <div className="text-center text-muted-foreground">
                <p>No requests found.</p>
                <p className="text-xs mt-1">Make sure you are logged in and there are donation requests on the server.</p>
              </div>
            )}
            {data.map((r, idx) => (
              <div key={r.id ?? idx.toString()} className="rounded-md border border-indigo-100 p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-indigo-700">{r.itemName}</p>
                    <p className="text-xs text-gray-500">{r.itemType} • Qty: {r.numberOfItems}</p>
                  </div>
                  {r.item ? (
                    <button
                      type="button"
                      className="text-indigo-600 text-sm hover:underline"
                      onClick={() => setImagePreview(r.item as string)}
                    >
                      View
                    </button>
                  ) : (
                    <span className="text-gray-400 text-sm">No image</span>
                  )}
                </div>
                <p className="mt-2 text-sm text-gray-700 line-clamp-3">{r.description}</p>
                <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-gray-600">
                  <span><span className="font-medium">Street:</span> {r.street}</span>
                  <span><span className="font-medium">City:</span> {r.city}</span>
                  <span><span className="font-medium">Region:</span> {r.region}</span>
                  <span><span className="font-medium">Lat:</span> {r.latitude}</span>
                  <span><span className="font-medium">Long:</span> {r.longitude}</span>
                </div>
              </div>
            ))}
            <div className="text-right text-xs text-gray-500">{loading ? "Loading requests..." : `Total: ${data.length}`}</div>
          </div>
          {/* Desktop table (hidden on small screens) */}
          <Table className="min-w-200 sm:min-w-full">
            <TableHeader>
              <TableRow>
                <TableHead>Item Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Qty</TableHead>
                <TableHead className="hidden sm:table-cell">Description</TableHead>
                <TableHead className="hidden md:table-cell">Street</TableHead>
                <TableHead className="hidden md:table-cell">City</TableHead>
                <TableHead className="hidden lg:table-cell">Region</TableHead>
                <TableHead className="hidden lg:table-cell">Lat</TableHead>
                <TableHead className="hidden lg:table-cell">Long</TableHead>
                <TableHead>Image</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!loading && data.length === 0 && !error && (
                <TableRow>
                  <TableCell colSpan={10} className="text-center text-muted-foreground">
                    No requests found.
                  </TableCell>
                </TableRow>
              )}
              {data.map((r, idx) => (
                <TableRow key={r.id ?? idx.toString()}>
                  <TableCell>{r.itemName}</TableCell>
                  <TableCell>{r.itemType}</TableCell>
                  <TableCell>{r.numberOfItems}</TableCell>
                  <TableCell className="hidden sm:table-cell max-w-37.5 truncate" title={r.description}>
                    {r.description}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{r.street}</TableCell>
                  <TableCell className="hidden md:table-cell">{r.city}</TableCell>
                  <TableCell className="hidden lg:table-cell">{r.region}</TableCell>
                  <TableCell className="hidden lg:table-cell">{r.latitude}</TableCell>
                  <TableCell className="hidden lg:table-cell">{r.longitude}</TableCell>
                  <TableCell>
                    {r.item ? (
                      <button
                        type="button"
                        className="text-indigo-600 hover:underline"
                        onClick={() => setImagePreview(r.item as string)}
                      >
                        View
                      </button>
                    ) : (
                      "-"
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableCaption className="text-right">
              {loading ? "Loading requests..." : `Total: ${data.length}`}
            </TableCaption>
          </Table>
        </CardContent>
      </Card>

      {imagePreview && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-2"
          onClick={() => setImagePreview(null)}
        >
          <div className="max-w-full sm:max-w-4xl max-h-[85vh] p-2" onClick={(e) => e.stopPropagation()}>
            <Image
              src={imagePreview}
              alt="Donation item"
              width={1600}
              height={900}
              className="object-contain w-full h-[80vh] rounded-md shadow-lg"
              sizes="(max-width: 1024px) 90vw, 1024px"
            />
            <div className="mt-3 flex justify-center">
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white" onClick={() => setImagePreview(null)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
