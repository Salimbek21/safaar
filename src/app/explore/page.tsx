"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import Header from "@/components/header";
import BottomNavigation from "@/components/bottom-navigation";
import { tours } from "@/lib/mock-data";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { TourCard } from "@/components/tour-card";
import ExploreLoading from "@/app/explore/loading"; // Fixed import path

export default function ExplorePage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTours, setFilteredTours] = useState(tours);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth/login");
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (searchQuery) {
      const filtered = tours.filter(
        (tour) =>
          tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tour.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tour.country.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setFilteredTours(filtered);
    } else {
      setFilteredTours(tours);
    }
  }, [searchQuery]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-safarim-orange"></div>
      </div>
    );
  }

  return (
    <div className="pb-20">
      <Header title="Explore" />

      <main className="p-4">
        <div className="mb-6">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search destinations, tours..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex space-x-2 overflow-x-auto pb-2">
            <button className="px-4 py-2 bg-safarim-blue text-white rounded-full text-sm whitespace-nowrap">
              All Tours
            </button>
            <button className="px-4 py-2 bg-background border border-border rounded-full text-sm whitespace-nowrap">
              Samarkand
            </button>
            <button className="px-4 py-2 bg-background border border-border rounded-full text-sm whitespace-nowrap">
              Tashkent
            </button>
            <button className="px-4 py-2 bg-background border border-border rounded-full text-sm whitespace-nowrap">
              Bukhara
            </button>
            <button className="px-4 py-2 bg-background border border-border rounded-full text-sm whitespace-nowrap">
              Khiva
            </button>
          </div>
        </div>

        <Suspense fallback={<ExploreLoading />}>
          <section>
            {filteredTours.length > 0 ? (
              <div className="space-y-4">
                {filteredTours.map((tour) => (
                  <TourCard key={tour.id} tour={tour} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-[70vh]">
                <h2 className="text-xl font-semibold mb-2">No tours found</h2>
                <p className="text-muted-foreground text-center mb-6">
                  Try searching for another destination or tour
                </p>
              </div>
            )}
          </section>
        </Suspense>
      </main>

      <BottomNavigation />
    </div>
  );
}
