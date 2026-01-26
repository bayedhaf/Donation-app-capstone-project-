"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { apiPost } from "@/lib/api";
import { useState } from "react";

export default function OrganizationFormPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    setSuccess(null);
    const trim = (v: FormDataEntryValue | null) => String(v || "").trim();
    const email = trim(formData.get("email"));
    // Email is optional; validate only if provided
    if (email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setError("Invalid email address");
      setLoading(false);
      return;
    }
    // Build minimal payload with required fields first to avoid backend crashes
    const payload = {
      organization_name: trim(formData.get("organization_name")),
      license_number: trim(formData.get("license_number")),
      registrationNumber: trim(formData.get("registrationNumber")),
      about: trim(formData.get("about")),
      email,
      phone: trim(formData.get("phone")),
      website: trim(formData.get("website")),
      street: trim(formData.get("street")),
      city: trim(formData.get("city")),
      region: trim(formData.get("region")),
      latitude: trim(formData.get("latitude")),
      longitude: trim(formData.get("longitude")),
      logoUrl: trim(formData.get("logoUrl")),
      isVerified: true,
      isActive: true,
    };

    try {
  await apiPost("/admin/register-orgs", payload);
  setSuccess("Organization registered successfully.");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Registration failed";
      setError(message || "Registration failed");
    }
    setLoading(false);
  }

  return (
  <div className="min-h-screen p-10 bg-linear-to-r from-indigo-50 to-indigo-100 flex items-center justify-center px-4 py-10">
      <Card className="w-full max-w-3xl bg-white border border-indigo-200 shadow-lg rounded-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-indigo-700">
            Organization Registration
          </CardTitle>
          <CardDescription className="text-indigo-600">
            Provide accurate details to register your organization
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form action={handleSubmit} className="grid max-w-lg mx-auto mt-12 space-y-4 gap-6 sm:grid-cols-2">
            {/* Organization Name */}
            <div className="grid gap-2 sm:col-span-2">
              <Label className="text-indigo-700">Organization Name<strong className="text-red-500">*</strong></Label>
              <Input name="organization_name" required />
            </div>

            {/* License & Registration */}
            <div className="grid gap-2">
              <Label className="text-indigo-700">License Number <strong className="text-red-500">*</strong></Label>
              <Input name="license_number" required />
            </div>

            <div className="grid gap-2">
              <Label className="text-indigo-700">Registration Number<strong className="text-red-500">*</strong></Label>
              <Input name="registrationNumber" required />
            </div>

            {/* About */}
            <div className="grid gap-2 sm:col-span-2">
              <Label className="text-indigo-700">About Organization</Label>
              <Textarea name="about" rows={4} />
            </div>

            {/* Contact */}
            <div className="grid gap-2">
              <Label className="text-indigo-700">Email (optional)</Label>
              <Input type="email" name="email" />
            </div>

            <div className="grid gap-2">
              <Label className="text-indigo-700">Phone<strong className="text-red-500">*</strong></Label>
              <Input name="phone" required />
            </div>

            <div className="grid gap-2 sm:col-span-2">
              <Label className="text-indigo-700">Website</Label>
              <Input name="website" />
            </div>

            {/* Address */}
            <div className="grid gap-2">
              <Label className="text-indigo-700">Street<strong className="text-red-500">*</strong></Label>
              <Input name="street" required />
            </div>

            <div className="grid gap-2">
              <Label className="text-indigo-700">City<strong className="text-red-500">*</strong></Label>
              <Input name="city" required />
            </div>

            <div className="grid gap-2 sm:col-span-2">
              <Label className="text-indigo-700">Region<strong className="text-red-500">*</strong></Label>
              <Input name="region" required />
            </div>

            {/* Location */}
            <div className="grid gap-2">
              <Label className="text-indigo-700">Latitude<strong className="text-red-500">*</strong></Label>
              <Input name="latitude" required />
            </div>

            <div className="grid gap-2">
              <Label className="text-indigo-700">Longitude<strong className="text-red-500">*</strong></Label>
              <Input name="longitude" required />
            </div>

            {/* Logo */}
            <div className="grid gap-2 sm:col-span-2">
              <Label className="text-indigo-700">Logo URL</Label>
              <Input name="logoUrl" />
            </div>

            {/* Submit */}
            <CardFooter className="sm:col-span-2 pt-6 flex flex-col gap-3">
              <Button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-60"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Register Organization"}
              </Button>
              {error && (
                <div className="rounded-md border border-red-200 bg-red-50 p-2">
                  <p className="text-red-700 text-sm" role="alert">{error}</p>
                  <p className="text-xs text-red-600 mt-1">Ensure you are logged in and fields are valid.</p>
                </div>
              )}
              {success && (
                <p className="text-green-600 text-sm" role="status">{success}</p>
              )}
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
