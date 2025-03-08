"use client";

import { ArrowLeft, Bell } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LogoIcon } from "../../public/svg";

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  showNotification?: boolean;
}

export default function Header({
  title,
  showBack = false,
  showNotification = false,
}: HeaderProps) {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-10 bg-background p-4 flex items-center justify-between border-b border-border">
      <div className="flex items-center">
        {showBack && (
          <button
            onClick={() => router.back()}
            className="mr-2 p-1 rounded-full hover:bg-muted"
          >
            <ArrowLeft size={24} />
          </button>
        )}
        {title ? (
          <h1 className="text-xl font-bold">{title}</h1>
        ) : (
          <Link href={"/"} className="flex items-center">
            <LogoIcon className="mr-2 text-foreground" />
          </Link>
        )}
      </div>
      {showNotification && (
        <button className="p-1 rounded-full hover:bg-muted">
          <Bell size={24} />
        </button>
      )}
    </header>
  );
}
