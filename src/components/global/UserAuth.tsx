import { UserButton } from "@clerk/nextjs";
import { Button } from "../ui/button";
import Link from "next/link";
import { LogIn } from "lucide-react";
import Transactions from "./Transactions";
import Cart from "./Cart";
import { auth } from "@clerk/nextjs/server";

const UserAuth = () => {
  const { userId } = auth();

  return (
    <div className="flex items-center gap-4">
      {!userId ? (
        <Button size="sm" asChild>
          <Link href="/sign-in">
            Sign In <LogIn className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      ) : (
        <>
          <Transactions />
          <Cart />
          <UserButton />
        </>
      )}
    </div>
  );
};

export default UserAuth;
