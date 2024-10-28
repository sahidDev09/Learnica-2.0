"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
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
  const { user, isLoaded } = useUser();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchOrders(userEmail) {
    try {
      const response = await fetch("/api/get-orders");
      if (response.ok) {
        const data = await response.json();
        const filteredOrders = data.filter((order) => order.email === userEmail);
        setOrders(filteredOrders);
        setLoading(false);
      } else {
        setError("Failed to fetch data");
        setLoading(false);
      }
    } catch (error) {
      setError("Error fetching data");
      setLoading(false);
    }
  }

  useEffect(() => {
    if (isLoaded && user) {
      const userEmail = user.email || user.primaryEmailAddress?.emailAddress;
      if (userEmail) {
        fetchOrders(userEmail);
      } else {
        setError("Email not available");
        setLoading(false);
      }
    }
  }, [isLoaded, user]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container mx-auto p-4 h-screen mt-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg md:text-2xl">My Payment History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table className="min-w-full">
              <TableCaption>A list of your recent invoices.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center py-2 px-4">Serial #</TableHead>
                  <TableHead className="text-center py-2 px-4">Course Title</TableHead>
                  <TableHead className="text-center py-2 px-4">Total Amount</TableHead>
                  <TableHead className="text-center py-2 px-4">Created Date</TableHead>
                  <TableHead className="text-center py-2 px-4">Payment Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.length > 0 ? (
                  orders.map((order, index) => (
                    <TableRow key={order._id} className="hover:bg-gray-50">
                      <TableCell className="text-center py-2 px-4">{index + 1}</TableCell>
                      <TableCell className="text-center py-2 px-4">{order.title}</TableCell>
                      <TableCell className="text-center py-2 px-4">{order.finalAmount}</TableCell>
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
  