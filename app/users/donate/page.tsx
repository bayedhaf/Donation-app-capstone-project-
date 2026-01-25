"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { apiPost } from "@/lib/api";
import { useState } from "react";

export default function DonatePage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleDonate(formData: FormData) {
    setLoading(true);
    setError(null);
    setSuccess(null);

  const payload = new FormData();
  payload.set("itemName", String(formData.get("itemName") || ""));
  payload.set("itemType", String(formData.get("itemType") || ""));
  payload.set("numberOfItems", String(formData.get("numberOfItems") || ""));
  payload.set("description", String(formData.get("description") || ""));
  const file = formData.get("file") as File | null;
  if (file) payload.set("file", file);
    payload.set("street", String(formData.get("street") || ""));
    payload.set("city", String(formData.get("city") || ""));
    payload.set("region", String(formData.get("region") || ""));
    payload.set("latitude", String(formData.get("latitude") || ""));
    payload.set("longitude", String(formData.get("longitude") || ""));

    try {
      await apiPost("/users/donate", payload);
      setSuccess("Donation submitted successfully!");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Donation failed";
      setError(message);
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-20">
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6 sm:p-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-indigo-700 mb-6 text-center sm:text-left">
          Donate Items
        </h1>

        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const formEl = e.currentTarget as HTMLFormElement;
            const fd = new FormData(formEl);
            await handleDonate(fd);
          }}
          className="space-y-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <Label htmlFor="itemName">Item Name<strong className="text-red-600">*</strong> *</Label>
              <Input id="itemName" name="itemName" type="text" required placeholder="e.g., Winter Jacket" />
            </div>

            <div className="flex flex-col">
              <Label htmlFor="itemType">Item Type<strong className="text-red-600">*</strong> </Label>
              <Input id="itemType" name="itemType" type="text" required placeholder="e.g., Clothing" />
            </div>

            <div className="flex flex-col">
              <Label htmlFor="numberOfItems">Number Of Items <strong className="text-red-600">*</strong></Label>
              <Input id="numberOfItems" name="numberOfItems" type="number" min={1} required placeholder="3" />
            </div>

            <div className="flex flex-col">
              <Label htmlFor="file">Image (optional)</Label>
              <Input id="file" name="file" type="file" accept="image/*" />
            </div>

            <div className="flex flex-col col-span-full">
              <Label htmlFor="description">Description <strong className="text-red-600">*</strong></Label>
              <Textarea id="description" name="description" required placeholder="Brief description of the items" />
            </div>

            <div className="flex flex-col">
              <Label htmlFor="street">Street <strong className="text-red-600">*</strong></Label>
              <Input id="street" name="street" type="text" required placeholder="123 Main St" />
            </div>

            <div className="flex flex-col">
              <Label htmlFor="city">City <strong className="text-red-600">*</strong></Label>
              <Input id="city" name="city" type="text" required placeholder="Addis Ababa" />
            </div>

            <div className="flex flex-col">
              <Label htmlFor="region">Region <strong className="text-red-600">*</strong></Label>
              <Input id="region" name="region" type="text" required placeholder="Oromia" />
            </div>

            <div className="flex flex-col">
              <Label htmlFor="latitude">Latitude <strong className="text-red-600">*</strong></Label>
              <Input id="latitude" name="latitude" type="text" required placeholder="8.9806" />
            </div>

            <div className="flex flex-col">
              <Label htmlFor="longitude">Longitude <strong className="text-red-600">*</strong></Label>
              <Input id="longitude" name="longitude" type="text" required placeholder="38.7578" />
            </div>
          </div>

          <Button type="submit" className="w-full mt-2 bg-indigo-600 hover:bg-indigo-700 text-white">
            {loading ? "Submitting..." : "Donate"}
          </Button>

          {error && (
            <p className="text-red-600 text-sm mt-2 text-center" role="alert">{error}</p>
          )}
          {success && (
            <p className="text-green-600 text-sm mt-2 text-center" role="status">{success}</p>
          )}
        </form>
      </div>
    </div>
  );
}
