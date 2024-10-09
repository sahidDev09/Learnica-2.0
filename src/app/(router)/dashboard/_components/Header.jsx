import { Button } from "@/components/ui/button";
import { BellDot, Search } from "lucide-react";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div className="p-4 flex items-center justify-between">
      <div className="flex gap-2 border p-2 rounded-md">
        <Search className="h-5 w-5" />
        <input
          className="focus:outline-none"
          type="text"
          placeholder="Search something"
        />
      </div>
      <div className="flex items-center gap-4">
        <BellDot />
        <Link href="/">
          <Button>Exit Dashboard</Button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
