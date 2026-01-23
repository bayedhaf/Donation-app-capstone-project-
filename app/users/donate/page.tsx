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

    // Build multipart/form-data for file upload compatibility
    const payload = new FormData();
    payload.set("itemName", String(formData.get("itemName") || ""));
    payload.set("itemType", String(formData.get("itemType") || ""));
    payload.set("numberOfItems", String(formData.get("numberOfItems") || ""));
    payload.set("description", String(formData.get("description") || ""));

    const file = formData.get("item") as File | null;
    if (file) payload.set("item", file);

    payload.set("street", String(formData.get("street") || ""));
    payload.set("city", String(formData.get("city") || ""));
    payload.set("region", String(formData.get("region") || ""));
    payload.set("latitude", String(formData.get("latitude") || ""));
    payload.set("longitude", String(formData.get("longitude") || ""));

    try {
      await apiPost("/users/donate", payload);
      setSuccess("Donation submitted.");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Donation failed";
      setError(message);
    }
    setLoading(false);
  }

  return (
    <form action={handleDonate} className="max-w-lg mx-auto mt-12 space-y-4">
      <h1 className="text-2xl font-bold">Donate Items</h1>

      <div className="grid gap-2">
        <Label htmlFor="itemName">Item Name *</Label>
        <Input id="itemName" name="itemName" type="text" required placeholder="e.g., Winter Jacket" />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="itemType">Item Type *</Label>
        <Input id="itemType" name="itemType" type="text" required placeholder="e.g., Clothing" />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="numberOfItems">Number Of Items *</Label>
        <Input id="numberOfItems" name="numberOfItems" type="number" min={1} required placeholder="e.g., 3" />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="description">Description *</Label>
        <Textarea id="description" name="description" required placeholder="Brief description of the items" />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="item">Image of the donated item</Label>
        <Input id="item" name="item" type="file" accept="image/*" />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="street">Street *</Label>
        <Input id="street" name="street" type="text" required placeholder="123 Main St" />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="city">City *</Label>
        <Input id="city" name="city" type="text" required placeholder="Addis Ababa" />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="region">Region *</Label>
        <Input id="region" name="region" type="text" required placeholder="Oromia" />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="latitude">Latitude *</Label>
        <Input id="latitude" name="latitude" type="text" required placeholder="e.g., 8.9806" />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="longitude">Longitude *</Label>
        <Input id="longitude" name="longitude" type="text" required placeholder="e.g., 38.7578" />
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Submitting..." : "Donate"}
      </Button>

      {error && (
        <p className="text-red-600 text-sm" role="alert">{error}</p>
      )}
      {success && (
        <p className="text-green-600 text-sm" role="status">{success}</p>
      )}
    </form>
  );
}
