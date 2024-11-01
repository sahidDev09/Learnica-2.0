"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import Loading from "../loading";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TiTickOutline } from "react-icons/ti";
import { format } from "date-fns";

const Page = () => {
  const { user } = useUser();
  const [userEmail, setUserEmail] = useState(null);
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    if (user) {
      const email = user?.emailAddresses[0]?.emailAddress;
      setUserEmail(email);

      // Check localStorage for cached orders if available
      const cachedOrders = localStorage.getItem("orders");
      if (cachedOrders) {
        setOrders(JSON.parse(cachedOrders));
      }
    }
  }, [user]);

  const { isLoading } = useQuery({
    queryKey: ["order", userEmail],
    queryFn: async () => {
      if (!userEmail) return null;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/get-orders?email=${userEmail}`
      );
      const data = await res.json();
      setOrders(data);

      localStorage.setItem("orders", JSON.stringify(data));

      return data;
    },
    enabled: !!userEmail,
  });

  if (isLoading || !orders) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto p-4  my-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg md:text-2xl">
            My Payment History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table className="min-w-full">
              <TableCaption>A list of your recent invoices.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center py-2 px-4">
                    Serial #
                  </TableHead>
                  <TableHead className="text-center py-2 px-4">
                    Course Title
                  </TableHead>
                  <TableHead className="text-center py-2 px-4">
                    Total Amount
                  </TableHead>
                  <TableHead className="text-center py-2 px-4">
                    Created Date
                  </TableHead>
                  <TableHead className="text-center py-2 px-4">
                    Payment Status
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.length > 0 ? (
                  orders.map((order, index) => (
                    <TableRow key={order._id} className="hover:bg-gray-50">
                      <TableCell className="text-center py-2 px-4">
                        {index + 1}
                      </TableCell>
                      <TableCell className="text-center py-2 px-4">
                        {order.title}
                      </TableCell>
                      <TableCell className="text-center py-2 px-4">
                        {order.finalAmount}
                      </TableCell>
                      <TableCell className="text-center py-2 px-4">
                        {format(new Date(order.createdAt), "PPpp")}
                      </TableCell>
                      <TableCell className="text-center py-2 px-4">
                        <div className="inline-flex items-center bg-green-500 bg-opacity-65 rounded-full gap-x-1 py-1 px-2 text-white">
                          <span>{order.status}</span>
                          <TiTickOutline />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan="5" className="text-center py-4">
                      No orders found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
