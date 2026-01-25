"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { apiGet } from "@/lib/api";

type Organization = {
  id: string;
  organization_name: string;
  email: string;
  phone?: string;
  city?: string;
  region?: string;
  isVerified?: boolean;
  isActive?: boolean;
};

export default function AdminOrganizationsPage() {
  const [orgs, setOrgs] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    setError("");
    try {
      const data = await apiGet<Organization[]>("/admin/orgs");
      setOrgs(Array.isArray(data) ? data : []);
    } catch {
      setError("Unable to load organizations");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const t = setTimeout(() => void load(), 0);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen w-full bg-linear-to-r from-indigo-50 to-indigo-100 px-4 sm:px-6 md:px-10 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-indigo-700">Registered Organizations</h1>
        <Button onClick={load} className="bg-indigo-600 hover:bg-indigo-700 text-white" disabled={loading}>
          {loading ? "Refreshing..." : "Refresh"}
        </Button>
      </div>

      {/* Loading */}
      {loading && (
        <p className="text-indigo-600 text-sm">Loading organizations...</p>
      )}

      {/* Error */}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {/* Empty */}
      {!loading && orgs.length === 0 && (
        <p className="text-indigo-600 text-sm">No organizations found.</p>
      )}

      {/* Mobile cards */}
      {!loading && orgs.length > 0 && (
        <div className="sm:hidden space-y-3">
          {orgs.map((org) => (
            <div key={org.id} className="rounded-md border border-indigo-100 bg-white p-3">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="font-semibold text-indigo-700 truncate">{org.organization_name}</p>
                  <p className="text-xs text-gray-600 wrap-break-word">{org.email}</p>
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <Badge
                    variant="secondary"
                    className={org.isVerified ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}
                  >
                    {org.isVerified ? "Verified" : "Pending"}
                  </Badge>
                  <Badge
                    variant="secondary"
                    className={org.isActive ? "bg-blue-100 text-blue-700" : "bg-gray-200 text-gray-600"}
                  >
                    {org.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </div>
              <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-gray-700">
                <span><span className="font-medium">Phone:</span> {org.phone ?? "-"}</span>
                <span><span className="font-medium">City:</span> {org.city ?? "-"}</span>
                <span><span className="font-medium">Region:</span> {org.region ?? "-"}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Table (sm and up) */}
      {!loading && orgs.length > 0 && (
        <div className="hidden sm:block bg-white border border-indigo-200 rounded-lg shadow-sm overflow-x-auto">
          <Table className="min-w-200">
            <TableHeader>
              <TableRow className="bg-indigo-50">
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>City</TableHead>
                <TableHead>Region</TableHead>
                <TableHead>Verification</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {orgs.map((org) => (
                <TableRow key={org.id} className="hover:bg-indigo-50/50">
                  <TableCell className="font-medium text-indigo-700">
                    {org.organization_name}
                  </TableCell>
                  <TableCell>{org.email}</TableCell>
                  <TableCell>{org.phone ?? "-"}</TableCell>
                  <TableCell>{org.city ?? "-"}</TableCell>
                  <TableCell>{org.region ?? "-"}</TableCell>

                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={
                        org.isVerified
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }
                    >
                      {org.isVerified ? "Verified" : "Pending"}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={
                        org.isActive
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-200 text-gray-600"
                      }
                    >
                      {org.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
