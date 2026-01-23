"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { apiPut } from "@/lib/api";
import { useState } from "react";

export default function AcceptDonationPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleApprove(formData: FormData) {
    setLoading(true);
    setError(null);
    setSuccess(null);

    const donationReqId = String(formData.get("donationReqId") || "");
    const orgId = String(formData.get("orgId") || "");
    const query = new URLSearchParams({ donationReqId, orgId }).toString();

    try {
      await apiPut(`/admin/accept-donation?${query}`);
      setSuccess("Donation request approved.");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Approval failed";
      setError(message);
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen w-full bg-linear-to-r from-indigo-50 to-indigo-100 px-4 sm:px-6 md:px-10 py-6 sm:py-10">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-6 text-indigo-700">Accept Donations</h1>

        <Card className="border border-indigo-200 bg-white">
          <CardHeader>
            <CardTitle className="text-indigo-700 font-semibold">Approve a Donation Request</CardTitle>
          </CardHeader>
          <CardContent>
            <form action={handleApprove} className="grid gap-4 max-w-md">
              <div className="grid gap-2">
                <Label htmlFor="donationReqId">Donation Request ID *</Label>
                <Input id="donationReqId" name="donationReqId" type="text" required placeholder="e.g., req_123" />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="orgId">Organization ID *</Label>
                <Input id="orgId" name="orgId" type="text" required placeholder="e.g., org_456" />
              </div>

              <Button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-60"
                disabled={loading}
              >
                {loading ? "Approving..." : "Approve"}
              </Button>

              {error && (
                <p className="text-red-600 text-sm" role="alert">{error}</p>
              )}
              {success && (
                <p className="text-green-600 text-sm" role="status">{success}</p>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
