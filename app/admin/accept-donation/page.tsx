"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const donations = [
  { id: "1", item: "Rice Bags", donor: "John Doe" },
  { id: "2", item: "Jackets", donor: "Jane Smith" },
];

export default function AcceptDonationPage() {
  function accept(id: string) {
    alert(`Donation ${id} accepted`);
  }

  return (
    <div className=" min-h-screen w-full  bg-gradient-to-r from-indigo-50 to-indigo-100 px-4 sm:px-6 md:px-10  py-6 sm:py-10">
     <div className="max-w-3xl">
         <h1 className="text-3xl font-bold mb-6 text-indigo-700">
        Accept Donations
      </h1>

      <div className="space-y-4">
        {donations.map((donation) => (
          <Card
            key={donation.id}
            className="transition-all hover:shadow-lg hover:-translate-y-1 border border-indigo-200 bg-white"
          >
            <CardHeader>
              <CardTitle className="text-indigo-700 font-semibold">
                {donation.item}
              </CardTitle>
            </CardHeader>

            <CardContent className="flex justify-between items-center">
              <p className="text-indigo-600">Donor: {donation.donor}</p>
              <Button
                onClick={() => accept(donation.id)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                Accept
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
     </div>
    </div>
  );
}
