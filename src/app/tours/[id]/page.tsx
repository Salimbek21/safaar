"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import Header from "@/components/header";
import BottomNavigation from "@/components/bottom-navigation";
import { tours, guides } from "@/lib/mock-data";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Star,
  MapPin,
  Clock,
  Globe,
  Tag,
  Heart,
  CheckCircle,
  Phone,
} from "lucide-react";
import Link from "next/link";

export default function TourDetailPage({ params }: { params: { id: string } }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const tour = tours.find((t) => t.id === params.id);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth/login");
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    const wishlist = localStorage.getItem("safarim-wishlist");
    if (wishlist && tour) {
      const wishlistItems = JSON.parse(wishlist);
      setIsWishlisted(wishlistItems.includes(tour.id));
    }
  }, [tour]);

  const toggleWishlist = () => {
    if (!tour) return;

    const wishlist = localStorage.getItem("safarim-wishlist");
    let wishlistItems = wishlist ? JSON.parse(wishlist) : [];

    if (isWishlisted) {
      wishlistItems = wishlistItems.filter((id: string) => id !== tour.id);
    } else {
      wishlistItems.push(tour.id);
    }

    localStorage.setItem("safarim-wishlist", JSON.stringify(wishlistItems));
    setIsWishlisted(!isWishlisted);
  };

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-safarim-orange"></div>
      </div>
    );
  }

  if (!tour) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header title="Tour not found" showBack />
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">Tour not found</h2>
            <p className="text-muted-foreground mb-6">
              The tour you are looking for does not exist or has been removed.
            </p>
            <Button onClick={() => router.push("/")}>Go back to home</Button>
          </div>
        </div>
        <BottomNavigation />
      </div>
    );
  }

  const guide = guides.find((g) => g.id === tour.guideId);

  return (
    <div className="pb-20">
      <Header title={tour.title} showBack />

      <main>
        <div className="relative h-64 w-full">
          <Image
            src={tour.image || "/placeholder.svg"}
            alt={tour.title}
            fill
            className="object-cover"
          />
          <button
            className="absolute top-4 right-4 p-2 bg-white rounded-full shadow"
            onClick={toggleWishlist}
          >
            <Heart
              className={`h-6 w-6 ${isWishlisted ? "text-safarim-orange fill-safarim-orange" : "text-muted-foreground"}`}
            />
          </button>
        </div>

        <div className="p-4">
          <h1 className="text-xl font-bold mb-2">{tour.title}</h1>
          <div className="flex items-center mb-4">
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
            <span className="mr-4 text-sm whitespace-nowrap">
              {tour.rating} ({tour.reviewCount})
            </span>
            <MapPin className="h-3 w-3 text-muted-foreground mr-1" />
            <span className="text-xs whitespace-nowrap">
              {tour.location}, {tour.country}
            </span>
          </div>

          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <span className="font-bold text-2xl">${tour.price}</span>
              <span className="text-sm text-muted-foreground ml-1">
                Per person
              </span>
            </div>
            {tour.discount && (
              <div className="bg-safarim-green/10 text-safarim-green px-3 py-1 rounded-full flex items-center">
                <Tag className="h-3 w-3 mr-1" />
                <span className="text-xs">{tour.discount}% discount</span>
              </div>
            )}
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-muted-foreground mr-3" />
              <span>{tour.duration} (approx.)</span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-5 w-5 text-muted-foreground mr-3" />
              <span>Pickup offered</span>
            </div>
            <div className="flex items-center">
              <Globe className="h-5 w-5 text-muted-foreground mr-3" />
              <span>Offered in {tour.languages.join(" and ")} more</span>
            </div>
          </div>

          <div className="border-t border-border pt-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Overview</h2>
            <p className="text-sm mb-4">{tour.description}</p>
            <ul className="space-y-2 mb-4">
              {tour.highlights.map((highlight, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-safarim-green mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{highlight}</span>
                </li>
              ))}
            </ul>
            <span>Read more about -</span>
            <Link
              href={`/tours/${tour.id}`}
              className="text-safarim-blue p-0 h-auto mt-2"
            >
              {" "}
              {tour.title}
            </Link>
          </div>

          {/* {guide && (
            <div className="border-t border-border pt-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Your Guide</h2>
              <Link href={`/guides/${guide.id}`} className="flex items-center">
                <div className="relative h-12 w-12 mr-3">
                  <Image 
                    src={guide.avatar || "/placeholder.svg"} 
                    alt={guide.name} 
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium">{guide.name}</h3>
                  <div className="flex items-center">
                    <Star className="h-3 w-3 text-yellow-500 fill-yellow-500 mr-1" />
                    <span className="text-xs">{guide.rating} ({guide.reviewCount})</span>
                  </div>
                </div>
              </Link>
            </div>
          )} */}

          <div className="border-t border-border pt-6 mb-6">
            <p className="text-sm mb-4">
              If you need to Tour guide contact with us!
            </p>
            <div className="space-y-3">
              <Button className="w-full bg-primary text-foreground hover:bg-primary/90">
                Call via phone
              </Button>
              <Button variant="outline" className="w-full">
                Safarim call center
              </Button>
            </div>
          </div>

          <div className="border-t border-border pt-6 mb-6">
            <p className="text-sm mb-4">If you want to travel on your own</p>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <Button variant="outline" className="w-full">
                Map
              </Button>
              <Button variant="outline" className="w-full">
                Navigator
              </Button>
            </div>
            <Button className="w-full bg-safarim-pink text-white hover:bg-safarim-pink/90">
              <Phone className="h-4 w-4 mr-2" />
              Call taxi
            </Button>
          </div>
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
}
