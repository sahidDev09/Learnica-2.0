"use client";
import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs'; 
import Loading from '../loading';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TiTickOutline } from 'react-icons/ti';
import { format } from 'date-fns';


const Page = () => {
  const { user, isLoaded } = useUser(); 
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  async function fetchOrders(userEmail) {
    try {
      const response = await fetch('/api/get-orders');
      if (response.ok) {
        const data = await response.json();
        const filteredOrders = data.filter(order => order.email === userEmail);
        setOrders(filteredOrders);
        setLoading(false);
      } else {
        setError('Failed to fetch data');
        setLoading(false);
      }
    } catch (error) {
      setError('Error fetching data');
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
    <div className="container mx-auto text-center">
        <Card>
          <CardHeader>
            <CardTitle>My Payment History</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableCaption>A list of your recent invoices.</TableCaption>
              <TableHeader>
                    <TableRow className="text-center">
                  <TableHead>Serial #</TableHead>
                  <TableHead>Course Title</TableHead>
                  <TableHead>Total Amount</TableHead>
                  <TableHead>Created Date</TableHead>
                  <TableHead className="text-right">Payment Status</TableHead>
                </TableRow>
                
              </TableHeader>
              <TableBody className="text-center">
              {
                 orders.length > 0 ? (
                  orders.map((order, index) =>(
                    <TableRow key={order._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{order.title}</TableCell>
                  <TableCell>{order.totalAmount}</TableCell>
                  <TableCell>{format(new Date(order.createdAt), 'PPpp')}</TableCell>
                  <TableCell className="text-right"><div className="flex items-center gap-x-2 justify-center">
                      <span>{order.status}</span>
                      <TiTickOutline />
                    </div></TableCell>
                </TableRow>
                  ))):
                  (
                    <TableRow>
                    <TableHead colSpan="5" className="text-center py-3 px-4">
                      No orders found
                    </TableHead>
                  </TableRow> 
                  )
                }
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
   
  );
};

export default Page;
