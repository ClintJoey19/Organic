"use client";
import { UserButton, useAuth } from "@clerk/nextjs";
import { Button } from "../ui/button";
import Link from "next/link";
import { LogIn } from "lucide-react";

const UserAuth = () => {
  const user = useAuth();

  return (
    <div className="flex items-center">
      {!user.isSignedIn ? (
        <Button size="sm">
          <Link href="/sign-in">Sign In</Link>
          <LogIn className="ml-2 h-4 w-4" />
        </Button>
      ) : (
        <UserButton />
      )}
    </div>
  );
};

export default UserAuth;
