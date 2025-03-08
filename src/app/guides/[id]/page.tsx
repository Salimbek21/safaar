"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import Header from "@/components/header";
import BottomNavigation from "@/components/bottom-navigation";
import { guides } from "@/lib/mock-data";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Star,
  Users,
  Clock,
  Globe,
  Mountain,
  Building,
  Landmark,
  Utensils,
  MessageCircle,
  PencilLine,
} from "lucide-react";

export default function GuideDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const guide = guides.find((g) => g.id === params.id);

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

  if (!guide) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header title="Guide not found" showBack />
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">Guide not found</h2>
            <p className="text-muted-foreground mb-6">
              The guide you are looking for does not exist or has been removed.
            </p>
            <Button onClick={() => router.push("/")}>Go back to home</Button>
          </div>
        </div>
        <BottomNavigation />
      </div>
    );
  }

  const getIconForSpecialty = (iconName: string) => {
    switch (iconName) {
      case "mountain":
        return <Mountain className="h-6 w-6" />;
      case "building":
        return <Building className="h-6 w-6" />;
      case "landmark":
        return <Landmark className="h-6 w-6" />;
      case "utensils":
        return <Utensils className="h-6 w-6" />;
      default:
        return <Globe className="h-6 w-6" />;
    }
  };

  return (
    <div className="relative pb-20">
      <Header title={guide.name} showBack />

      <main>
        <div className="p-4 border-b border-border">
          <div className="flex items-center mb-2">
            <div className="relative h-16 w-16 mr-4">
              <Image
                src={guide.avatar || "/placeholder.svg"}
                alt={guide.name}
                fill
                className="rounded-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-xl font-bold">{guide.name}</h2>
              <p className="text-sm text-muted-foreground">
                {guide.languages.join(", ")}
              </p>
            </div>
          </div>
          <p className="text-sm mb-4">{guide.description}</p>
          <div className="flex space-x-4 text-sm">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
              <span>
                {guide.rating} ({guide.reviewCount})
              </span>
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 text-muted-foreground mr-1" />
              <span>{guide.visitedCount} visited</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 text-muted-foreground mr-1" />
              <span>Since {guide.since}</span>
            </div>
          </div>
        </div>

        <div className="p-4">
          <Button className="w-full bg-safarim-green text-white hover:bg-safarim-green/90">
            <MessageCircle className="h-5 w-5 mr-2" />
            Contact {guide.name}
          </Button>
        </div>

        <div className="p-4 border-t border-border">
          <div className="flex items-center mb-2">
            <div className="h-10 w-10 bg-safarim-blue/10 rounded-full flex items-center justify-center mr-3">
              <Globe />
            </div>
            <h3 className="font-semibold">
              Fluent in {guide.languages.join(", ")}
            </h3>
          </div>
          <p className="text-sm text-muted-foreground">
            You can travel with me to Chimgan, Humsan, Beldersay, and many other
            mountains.
          </p>
        </div>

        {guide.specialties.map((specialty) => (
          <div key={specialty.id} className="p-4 border-t border-border">
            <div className="flex items-center mb-2">
              <div className="h-10 w-10 bg-safarim-blue/10 rounded-full flex items-center justify-center mr-3">
                {getIconForSpecialty(specialty.icon)}
              </div>
              <h3 className="font-semibold">{specialty.name}</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              {specialty.description}
            </p>
          </div>
        ))}

        <div className="p-4 border-t border-border">
          <h3 className="font-semibold mb-4">What My Travelers Say</h3>
          {guide.reviews.map((review) => (
            <div
              key={review.id}
              className="mb-4 p-4 border border-border rounded-lg"
            >
              <div className="flex justify-between mb-2">
                <h4 className="font-medium">{review.author}</h4>
                <span className="text-sm text-muted-foreground">
                  {review.date}
                </span>
              </div>
              <div className="flex mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground"}`}
                  />
                ))}
              </div>
              <p className="text-sm">{review.comment}</p>
            </div>
          ))}
        </div>

        <div className="fixed bottom-20 right-4">
          <Button className="w-full bg-safarim-lightGreen/50 text-white hover:bg-safarim-lightGreen/75">
            <PencilLine className={"h-4 w-4"} />
            <span>Book a Tour!</span>
          </Button>
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
}
