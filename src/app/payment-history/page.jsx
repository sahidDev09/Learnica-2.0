"use client";
import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs'; // Clerk hook to get the current user
import Loading from '../loading';
import { format } from 'date-fns'; // For date formatting
import { TiTickOutline } from "react-icons/ti";

const Page = () => {
  const { user, isLoaded } = useUser(); // Get the current user and loading status from Clerk
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch orders from the API
  async function fetchOrders(userEmail) {
    try {
      const response = await fetch('/api/get-orders');
      if (response.ok) {
        const data = await response.json();
        // Filter orders by current user's email
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

  // Call fetchOrders when the user is loaded and has an email
  useEffect(() => {
    if (isLoaded && user) {
      // Use primaryEmailAddress if available
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
      <div className="overflow-x-auto bg-secondary my-20">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="text-white text-center">
              <th>Serial</th>
              <th>Course Title</th>
              <th>Total Amount</th>
              <th>Created Date</th>
              <th>Payment Status</th>
            </tr>
          </thead>
          <tbody className="text-white text-center">
            {orders.length > 0 ? (
              orders.map((order, index) => (
                <tr key={order._id}>
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4">
                     {order.title}
                  </td>
                  <td className="py-3 px-4">{order.totalAmount}</td>
                  <td className="py-3 px-4">
                    {format(new Date(order.createdAt), 'PPpp')} {/* Format the date */}
                  </td>
                  <td>{order.status} <TiTickOutline /></td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-3 px-4">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
