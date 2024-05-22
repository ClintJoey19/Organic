import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const SeeMoreButton = () => {
  return (
    <Button asChild>
      <Link href={"/products"}>See More</Link>
    </Button>
  );
};

export default SeeMoreButton;
