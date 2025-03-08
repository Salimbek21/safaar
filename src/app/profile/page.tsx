"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import Header from "@/components/header";
import BottomNavigation from "@/components/bottom-navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  User,
  Settings,
  CreditCard,
  HelpCircle,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { ThemeSwitcher } from "@/components/theme-switcher";

export default function ProfilePage() {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth/login");
    }
  }, [user, isLoading, router]);

  const handleLogout = () => {
    logout();
    router.push("/auth/login");
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
      <Header title="Profile" />

      <main className="p-4">
        <div className="flex items-center mb-8">
          <div className="relative h-20 w-20 mr-4">
            <Image
              src={user.avatar || "/placeholder.svg?height=100&width=100"}
              alt={user.name}
              fill
              className="rounded-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-xl font-bold">{user.name}</h2>
            <p className="text-muted-foreground">{user.email}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-background rounded-lg shadow border border-border overflow-hidden">
            <div className="p-4 border-b border-border">
              <h3 className="font-semibold">Account Settings</h3>
            </div>
            <div className="divide-y divide-border">
              <button className="w-full flex items-center justify-between p-4 hover:bg-muted/50">
                <div className="flex items-center">
                  <User className="h-5 w-5 text-muted-foreground mr-3" />
                  <span>Personal Information</span>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </button>
              <button className="w-full flex items-center justify-between p-4 hover:bg-muted/50">
                <div className="flex items-center">
                  <Settings className="h-5 w-5 text-muted-foreground mr-3" />
                  <span>Settings</span>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </button>
              <button className="w-full flex items-center justify-between p-4 hover:bg-muted/50">
                <div className="flex items-center">
                  <CreditCard className="h-5 w-5 text-muted-foreground mr-3" />
                  <span>Payment Methods</span>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </button>
              <ThemeSwitcher />
            </div>
          </div>

          <div className="bg-background rounded-lg shadow border border-border overflow-hidden">
            <div className="p-4 border-b border-border">
              <h3 className="font-semibold">Support</h3>
            </div>
            <div className="divide-y divide-border">
              <button className="w-full flex items-center justify-between p-4 hover:bg-muted/50">
                <div className="flex items-center">
                  <HelpCircle className="h-5 w-5 text-muted-foreground mr-3" />
                  <span>Help Center</span>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>
          </div>

          <Button
            variant="destructive"
            className="w-full mt-6"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5 mr-2" />
            Log Out
          </Button>
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
}
