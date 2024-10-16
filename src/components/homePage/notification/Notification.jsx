"use client";

import Link from "next/link";
import { FaRegBell } from "react-icons/fa6";
import { TbBellFilled } from "react-icons/tb";

const Notification = () => {
  const data = [];
  // data will be dynamic
  const count = data?.length;

  const read = (id) => {
    // remove the item
    console.log("clicked", id);
  };

  return (
    <span className="relative dropdown dropdown-end">
      <FaRegBell className="text-2xl lg:text-3xl" tabIndex={0} role="button" />
      {count > 0 && (
        <>
          <span className="absolute -top-2 left-3 py-0 px-1 font-medium text-sm bg-green-700 text-white rounded-full">
            {count}
          </span>
        </>
      )}

      <ul
        tabIndex={0}
        className="space-y-1 py-1 dropdown-content rounded-lg z-[1] w-64 shadow bg-card-light"
      >
        {data?.length > 0 ? (
          data.map((item) => (
            <div key={item._id}>
              <Link
                onClick={() => read(item._id)}
                href={``}
                className="px-1 font-medium hover:underline flex gap-1 text-black"
              >
                <TbBellFilled className="mt-1" />
                <span>{item?.title}</span>
              </Link>
            </div>
          ))
        ) : (
          <p className="px-1 font-medium text-btn">
            No notifications available
          </p>
        )}
      </ul>
    </span>
  );
};

export default Notification;
