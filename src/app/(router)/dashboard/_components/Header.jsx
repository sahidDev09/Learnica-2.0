import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { TbBellFilled } from "react-icons/tb";
import { BellDot, Search } from "lucide-react";
import Link from "next/link";
import React from "react";
import { FaRegBell } from "react-icons/fa6";

const Header = () => {
  const {
    data: pending,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/courses/pending`
      );
      return res.json();
    },
  });

  const count = pending?.length;
  if (isLoading) {
    refetch();
  }
  return (
    <div className="p-4 items-center justify-between hidden md:flex">
      <div className="flex gap-2 border p-2 rounded-md">
        <Search className="h-5 w-5" />
        <input
          className="focus:outline-none"
          type="text"
          placeholder="Search something"
        />
      </div>
      <div className="flex items-center gap-4">
        {/* <BellDot /> */}
        <span className="relative dropdown dropdown-end">
          <FaRegBell
            className="text-2xl lg:text-3xl"
            tabIndex={0}
            role="button"
          />
          {count > 0 && (
            <>
              <span className="absolute -top-2 left-3 py-0 px-1 font-medium text-sm bg-green-700 text-white rounded-full">
                {count}
              </span>
            </>
          )}

          <ul
            tabIndex={0}
            className="space-y-1 py-1 dropdown-content bg-base-300 rounded-lg z-[1] w-64 shadow"
          >
            {pending?.map((item) => (
              <>
                <Link
                  href={`/all-courses/${item._id}`}
                  className="px-1 font-medium hover:underline flex gap-1"
                >
                  <TbBellFilled className="mt-1" />
                  <span>{item?.title}</span>
                </Link>
              </>
            ))}
          </ul>
        </span>

        <Link href="/">
          <Button className="bg-primary">Exit Dashboard</Button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
