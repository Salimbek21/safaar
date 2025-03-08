"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, Heart, User } from "lucide-react";

export default function BottomNavigation() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 max-w-3xl mx-auto bg-background border-t border-border h-16 flex items-center justify-around">
      <Link
        href="/"
        className={`flex flex-col items-center justify-center w-1/4 ${isActive("/") ? "text-safarim-orange" : "text-muted-foreground"}`}
      >
        <Home size={24} />
        <span className="text-xs mt-1">Home</span>
      </Link>
      <Link
        href="/explore"
        className={`flex flex-col items-center justify-center w-1/4 ${isActive("/explore") ? "text-safarim-orange" : "text-muted-foreground"}`}
      >
        <Search size={24} />
        <span className="text-xs mt-1">Explore</span>
      </Link>
      <Link
        href="/wishlist"
        className={`flex flex-col items-center justify-center w-1/4 ${isActive("/wishlist") ? "text-safarim-orange" : "text-muted-foreground"}`}
      >
        <Heart size={24} />
        <span className="text-xs mt-1">Wishlist</span>
      </Link>
      <Link
        href="/profile"
        className={`flex flex-col items-center justify-center w-1/4 ${isActive("/profile") ? "text-safarim-orange" : "text-muted-foreground"}`}
      >
        <User size={24} />
        <span className="text-xs mt-1">Profile</span>
      </Link>
    </div>
  );
}
