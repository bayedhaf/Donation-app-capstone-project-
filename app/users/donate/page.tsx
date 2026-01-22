"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apiPost } from "@/lib/api";

export default function DonatePage() {
  async function handleDonate(formData: FormData) {
    await apiPost("/users/donate", {
      item: formData.get("item"),
      quantity: formData.get("quantity"),
    });
    alert("Donation submitted");
  }

  return (
    <form action={handleDonate} className="max-w-md mx-auto mt-20 space-y-4">
      <h1 className="text-2xl font-bold">Donate Items</h1>
      <Input name="item" placeholder="Item name" />
      <Input name="quantity" placeholder="Quantity" />
      <Button className="w-full">Donate</Button>
    </form>
  );
}
