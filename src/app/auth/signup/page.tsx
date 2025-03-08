"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Mail, Lock, Loader2 } from "lucide-react";
import { GoogleIcon } from "../../../../public/svg";

export default function SignupPage() {
  const router = useRouter();
  const { signup, loginWithGoogle, isLoading } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signup(name, email, password);
      router.push("/");
    } catch (error) {
      console.error("Signup failed", error);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await loginWithGoogle();
      router.push("/");
    } catch (error) {
      console.error("Google signup failed", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-6">
      <div className="flex-1 flex flex-col justify-center">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold mb-2">Create an Account</h1>
          <p className="text-sm text-muted-foreground">
            Sign up to get started with Safarim
          </p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                className="pl-10 text-sm"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="pl-10 text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder="Create a password"
                className="pl-10 text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating account...
              </>
            ) : (
              "Sign up"
            )}
          </Button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full mt-4"
            onClick={handleGoogleSignup}
            disabled={isLoading}
          >
            <GoogleIcon />
            <span>Google</span>
          </Button>
        </div>

        <p className="text-sm text-center mt-6">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-safarim-blue font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
