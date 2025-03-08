"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import Header from "@/components/header";
import BottomNavigation from "@/components/bottom-navigation";
import { guides, tours } from "@/lib/mock-data";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { TourCard } from "@/components/tour-card";
import { HikingIcon } from "../../public/svg";

export default function HomePage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth/login");
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-safarim-orange"></div>
      </div>
    );
  }

  return (
    <div className="pb-20">
      <Header showNotification />

      <main className="p-4">
        <div className="max-h-32 h-full flex justify-center items-center flex-col mb-6">
          <p className="text-muted-foreground font-semibold mb-8">
            Hey, {user.name}!
          </p>
          <h1 className="text-[26px] font-semibold">Ready to explore</h1>
        </div>

        <section className="mb-6">
          <h2 className="text-base font-semibold mb-2.5">List of guides</h2>
          <div className="flex space-x-4 overflow-x-auto pb-2">
            {guides.map((guide) => (
              <Link
                key={guide.id}
                href={`/guides/${guide.id}`}
                className="flex-shrink-0 max-w-60 bg-background rounded-lg shadow p-3 border border-border"
              >
                <div className="flex items-start gap-5">
                  <div className="flex flex-col">
                    <h3 className="font-medium text-center">{guide.name}</h3>
                    <p className="flex items-center gap-2 text-xs text-foreground mt-1.5">
                      <HikingIcon />
                      {guide.visitedCount} visited
                    </p>
                    <div className="flex items-center mt-3.5">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm ml-1">
                        {guide.rating} ({guide.reviewCount})
                      </span>
                    </div>
                  </div>
                  <div className="relative w-12 h-12 mb-2">
                    <Image
                      src={guide.avatar || "/placeholder.svg"}
                      alt={guide.name}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-base font-semibold">Recommended</h2>
            <Link href="/explore" className="text-xs text-safarim-blue">
              Show all
            </Link>
          </div>
          <div className="space-y-4">
            {tours.slice(0, 2).map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        </section>
      </main>

      <BottomNavigation />
    </div>
  );
}
