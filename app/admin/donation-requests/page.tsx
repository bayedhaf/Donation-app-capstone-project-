"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "@/components/ui/table";
import { apiGet } from "@/lib/api";

type DonationRequest = {
  _id?: string;
  id?: string;
  itemName: string;
  itemType: string;
  numberOfItems: number;
  description: string;
  item?: string;
  itemUrl?: string;
  address?: {
    street?: string;
    city?: string;
    region?: string;
    latitude?: string;
    longitude?: string;
  };
  street?: string;
  city?: string;
  region?: string;
  latitude?: string;
  longitude?: string;
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
      const baseUrl =
        process.env.NEXT_PUBLIC_API_BASE ??
        "https://capstone-api-dwzu.onrender.com";

      const tokenMatch =
        typeof document !== "undefined"
          ? document.cookie.match(/(?:^|; )accessToken=([^;]+)/)
          : null;

      const token = tokenMatch
        ? decodeURIComponent(tokenMatch[1])
        : undefined;

      type Wrapped =
        | DonationRequest[]
        | {
            data?: DonationRequest[];
            results?: DonationRequest[];
            donationRequests?: DonationRequest[];
          };

      const res = await apiGet<Wrapped>(
        "/admin/donation-requests",
        { baseUrl, token }
      );

      const list: DonationRequest[] = Array.isArray(res)
        ? res
        : res?.data ??
          res?.results ??
          res?.donationRequests ??
          [];

      setData(list);
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Failed to load";
      setError(
        msg.toLowerCase().includes("401")
          ? "Access denied. Please log in as admin."
          : msg
      );
    }

    setLoading(false);
  }

  useEffect(() => {
    void load();
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-indigo-50 to-indigo-100 px-4 sm:px-6 md:px-10 py-8">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-indigo-700">
          Donation Requests
        </h1>
        <Button
          onClick={load}
          disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-700 text-white w-fit"
        >
          {loading ? "Refreshing..." : "Refresh"}
        </Button>
      </div>

      <Card className="border border-indigo-200 bg-white">
        <CardHeader>
          <CardTitle className="text-indigo-700 text-lg sm:text-xl">
            All Requests
          </CardTitle>
        </CardHeader>

        <CardContent className="p-4">
          {error && (
            <div className="mb-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* ================= MOBILE VIEW ================= */}
          <div className="sm:hidden space-y-3">
            {!loading && data.length === 0 && !error && (
              <p className="text-center text-sm text-muted-foreground">
                No donation requests found.
              </p>
            )}

            {data.map((r, idx) => (
              <div
                key={r._id ?? r.id ?? idx}
                className="rounded-lg border border-indigo-100 p-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-semibold text-indigo-700">
                      {r.itemName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {r.itemType} · Qty: {r.numberOfItems}
                    </p>
                  </div>

                  {(r.item || r.itemUrl) && (
                    <button
                      onClick={() =>
                        setImagePreview(
                          (r.itemUrl ?? r.item) as string
                        )
                      }
                      className="text-xs text-indigo-600 underline"
                    >
                      View
                    </button>
                  )}
                </div>

                <p className="mt-2 text-sm text-gray-700 line-clamp-2">
                  {r.description}
                </p>

                <div className="mt-3 space-y-1 text-xs text-gray-600">
                  <div>
                    <span className="font-medium">Street:</span>{" "}
                    {r.address?.street ?? r.street ?? "-"}
                  </div>
                  <div>
                    <span className="font-medium">City:</span>{" "}
                    {r.address?.city ?? r.city ?? "-"}
                  </div>
                  <div>
                    <span className="font-medium">Region:</span>{" "}
                    {r.address?.region ?? r.region ?? "-"}
                  </div>
                </div>
              </div>
            ))}

            <div className="text-right text-xs text-gray-500">
              {loading ? "Loading..." : `Total: ${data.length}`}
            </div>
          </div>

          {/* ================= DESKTOP / TABLET VIEW ================= */}
          <div className="hidden sm:block overflow-x-auto">
            <Table className="min-w-[900px]">
              <TableHeader className="sticky top-0 bg-white z-10">
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Qty</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Street
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    City
                  </TableHead>
                  <TableHead className="hidden lg:table-cell">
                    Region
                  </TableHead>
                  <TableHead>Image</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {!loading &&
                  data.map((r, idx) => (
                    <TableRow key={r._id ?? r.id ?? idx}>
                      <TableCell>{r.itemName}</TableCell>
                      <TableCell>{r.itemType}</TableCell>
                      <TableCell>{r.numberOfItems}</TableCell>
                      <TableCell className="max-w-[200px] truncate">
                        {r.description}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {r.address?.street ?? r.street ?? "-"}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {r.address?.city ?? r.city ?? "-"}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        {r.address?.region ?? r.region ?? "-"}
                      </TableCell>
                      <TableCell>
                        {(r.item || r.itemUrl) && (
                          <button
                            onClick={() =>
                              setImagePreview(
                                (r.itemUrl ?? r.item) as string
                              )
                            }
                            className="text-indigo-600 underline"
                          >
                            View
                          </button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>

              <TableCaption className="text-right">
                {loading
                  ? "Loading requests..."
                  : `Total: ${data.length}`}
              </TableCaption>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* ================= IMAGE PREVIEW ================= */}
      {imagePreview && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setImagePreview(null)}
        >
          <div
            className="max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={imagePreview}
              alt="Donation item"
              width={1600}
              height={900}
              className="w-full h-[80vh] object-contain rounded-lg"
            />
            <div className="mt-4 flex justify-center">
              <Button
                onClick={() => setImagePreview(null)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
