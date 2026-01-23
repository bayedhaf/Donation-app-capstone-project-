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

  useEffect(() => {
    async function fetchOrgs() {
      try {
        const res = await fetch(
          "https://dummyjson.com/c/9fc2-9a7c-40f1-938d" // /admin/orgs
        );
        if (!res.ok) throw new Error("Failed to fetch organizations");

        const data = await res.json();
        setOrgs(data);
      } catch {
        setError("Unable to load organizations");
      } finally {
        setLoading(false);
      }
    }

    fetchOrgs();
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-indigo-50 to-indigo-100 px-4 sm:px-6 md:px-10 py-8">
      <h1 className="text-3xl font-bold mb-6 text-indigo-700">
        Registered Organizations
      </h1>

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

      {/* Table */}
      {!loading && orgs.length > 0 && (
        <div className="bg-white border border-indigo-200 rounded-lg shadow-sm overflow-x-auto">
          <Table>
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
