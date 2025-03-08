"use client";

import type React from "react";

import Image from "next/image";
import Link from "next/link";
import type { Tour } from "@/lib/mock-data";
import { Star, MapPin, Tag, BadgePercent, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface TourCardProps {
  tour: Tour;
  isWishlisted?: boolean;
  onWishlistToggle?: (tourId: string) => void;
  showWishlistButton?: boolean;
  className?: string;
}

export function TourCard({
  tour,
  isWishlisted = false,
  onWishlistToggle,
  showWishlistButton = false,
  className,
}: TourCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onWishlistToggle) {
      onWishlistToggle(tour.id);
    }
  };

  return (
    <Link
      href={`/tours/${tour.id}`}
      className={cn(
        "w-full flex justify-between gap-2.5 bg-background rounded-2xl shadow border border-border overflow-hidden p-3",
        isHovered && "border-safarim-orange/50",
        className,
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full rounded-md max-w-20 h-20 flex-grow-0 max-sm:max-w-16 max-sm:h-16">
        <Image
          src={tour.image || "/placeholder.svg"}
          alt={tour.title}
          fill
          className="object-cover rounded-md"
        />
      </div>
      <div className="relative w-full flex flex-col flex-1 flex-shrink-0 ml-auto">
        <h3 title={tour.title} className="font-semibold text-sm mb-1">
          {tour.title.length > 20
            ? tour.title.slice(0, 20) + "..."
            : tour.title}
        </h3>
        <div className="flex items-center mb-2">
          <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
          <span className="text-xs ml-1">
            {tour.rating} ({tour.reviewCount})
          </span>
        </div>
        <div className="flex items-center text-muted-foreground mb-2.5">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-xs">
            {tour.location}, {tour.country}
          </span>
          <div className="flex items-center ml-2">
            <span className="font-bold text-base text-foreground">
              ${tour.price}
            </span>
            <span className="text-xs text-muted-foreground ml-1">/night</span>
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <div className="w-fit bg-safarim-green/10 text-safarim-green text-xs px-2 py-1 rounded-full flex items-center">
            <Tag className="h-3 w-3 mr-1" />
            <span>Book now pay later</span>
          </div>
          {tour.discount && (
            <div className="w-fit bg-safarim-blue/10 text-safarim-blue text-xs px-2 py-1 rounded-full flex items-center">
              <BadgePercent className="h-3 w-3 mr-1" />
              <span>{tour.discount}% discount</span>
            </div>
          )}
        </div>
        {showWishlistButton && (
          <button
            className="absolute bottom-0 right-0 p-1.5 bg-white rounded-full shadow-sm"
            onClick={handleWishlistToggle}
          >
            <Heart
              className={`h-3.5 w-3.5 ${
                isWishlisted
                  ? "text-safarim-orange fill-safarim-orange"
                  : "text-muted-foreground"
              }`}
            />
          </button>
        )}
      </div>
    </Link>
  );
}
