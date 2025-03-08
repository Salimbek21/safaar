"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import Header from "@/components/header";
import BottomNavigation from "@/components/bottom-navigation";
import { tours, wishlist as initialWishlist } from "@/lib/mock-data";
import Link from "next/link";
import { Heart } from "lucide-react";
import { TourCard } from "@/components/tour-card";

export default function WishlistPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [wishlist, setWishlist] = useState(initialWishlist);
  const wishlistTours = tours.filter((tour) => wishlist.includes(tour.id));

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth/login");
    }
  }, [user, isLoading, router]);

  const removeFromWishlist = (tourId: string) => {
    setWishlist((prev) => prev.filter((id) => id !== tourId));
  };

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-safarim-orange"></div>
      </div>
    );
  }

  return (
    <div className="pb-20">
      <Header title="Wishlist" />

      <main className="p-4">
        {wishlistTours.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[70vh]">
            <Heart className="h-16 w-16 text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-muted-foreground text-center mb-6">
              Save your favorite tours and destinations to plan your next
              adventure
            </p>
            <Link
              href="/explore"
              className="px-6 py-3 bg-safarim-orange text-white rounded-lg font-medium"
            >
              Explore Tours
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {wishlistTours.map((tour) => (
              <TourCard
                key={tour.id}
                tour={tour}
                isWishlisted={true}
                showWishlistButton={true}
                onWishlistToggle={removeFromWishlist}
              />
            ))}
          </div>
        )}
      </main>

      <BottomNavigation />
    </div>
  );
}
