"use client";
import React, { useEffect, useState } from "react";
import { 
  ShoppingCart, 
  CreditCard, 
  Loader2, 
  Search, 
  TrendingUp, 
  Users, 
  DollarSign,
  Calendar,
  ChevronRight,
  Filter
} from "lucide-react";
import { format } from "date-fns";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("/api/admin/orders");
        const data = await response.json();
        setOrders(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Filter orders based on search
  const filteredOrders = orders.filter((order) =>
    order.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = [
    {
      label: "Total Revenue",
      value: `$${orders.reduce((acc, curr) => acc + (curr.finalAmount || 0), 0).toFixed(2)}`,
      icon: DollarSign,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      label: "Total Orders",
      value: orders.length,
      icon: ShoppingCart,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Unique Buyers",
      value: new Set(orders.map(o => o.email)).size,
      icon: Users,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      label: "Growth",
      value: "+12.5%",
      icon: TrendingUp,
      color: "text-orange-600",
      bg: "bg-orange-50",
    }
  ];

  const getPaymentInfo = (id) => {
    const lastChar = id ? id.toString().slice(-1) : '0';
    const isVisa = parseInt(lastChar, 16) % 2 === 0;
    return {
      type: isVisa ? "Visa" : "MasterCard",
      last4: Math.floor(1000 + Math.random() * 9000)
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 animate-spin text-purple-600" />
          <p className="text-gray-500 font-medium animate-pulse">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Successful Orders</h1>
            <p className="text-gray-500 mt-1 font-medium">Monitor your sales performance and customer activity</p>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by course or email..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-purple-500/10 focus:border-purple-500 transition-all bg-white text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="p-2.5 rounded-xl border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 transition-colors shadow-sm">
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.bg} ${stat.color} p-3 rounded-xl`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Course Information</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Transaction</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Payment Method</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => {
                    const payment = getPaymentInfo(order._id);
                    return (
                      <tr key={order._id} className="group hover:bg-purple-50/30 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center flex-shrink-0 text-white shadow-sm ring-1 ring-white/20">
                              <ShoppingCart className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex flex-col">
                              <p className="font-bold text-gray-900 line-clamp-1">{order.title}</p>
                              <div className="flex items-center gap-1.5 mt-0.5">
                                <Calendar className="w-3 h-3 text-gray-400" />
                                <span className="text-[11px] font-medium text-gray-400">
                                  {order.createdAt ? format(new Date(order.createdAt), "MMM dd, yyyy • HH:mm") : "Recently"}
                                </span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-gray-900">${order.finalAmount?.toFixed(2)}</span>
                            <span className="text-[11px] font-medium text-gray-500 uppercase tracking-tight">Net Amount</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="text-sm font-semibold text-gray-900">{order.email?.split('@')[0]}</span>
                            <span className="text-xs text-gray-500 font-medium">{order.email}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className={`p-1.5 rounded-lg border ${payment.type === 'Visa' ? 'bg-blue-50 border-blue-100' : 'bg-red-50 border-red-100'}`}>
                              <CreditCard className={`w-4 h-4 ${payment.type === 'Visa' ? 'text-blue-600' : 'text-red-600'}`} />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm font-semibold text-gray-900">{payment.type}</span>
                              <span className="text-[10px] font-bold text-gray-400">**** {payment.last4}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold shadow-sm ${
                            order.status?.toLowerCase() === 'success' || order.status?.toLowerCase() === 'completed'
                              ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100'
                              : 'bg-amber-50 text-amber-700 ring-1 ring-amber-100'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full mr-2 ${
                               order.status?.toLowerCase() === 'success' ? 'bg-emerald-500' : 'bg-amber-500'
                            }`} />
                            {order.status || 'Success'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button className="p-2 rounded-lg hover:bg-white hover:shadow-sm text-gray-400 hover:text-purple-600 transition-all">
                            <ChevronRight className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-24 text-center">
                      <div className="flex flex-col items-center justify-center max-w-xs mx-auto">
                        <div className="bg-gray-50 p-6 rounded-full mb-4">
                          <ShoppingCart className="w-12 h-12 text-gray-200" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">No orders found</h3>
                        <p className="text-gray-500 mt-1 text-sm">We couldn&apos;t find any orders matching your current search criteria.</p>
                        {searchTerm && (
                          <button 
                            onClick={() => setSearchTerm("")}
                            className="mt-4 text-sm font-bold text-purple-600 hover:text-purple-700 underline underline-offset-4"
                          >
                            Clear search
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {/* Footer of Table */}
          <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
            <p className="text-xs font-medium text-gray-500">
              Showing <span className="text-gray-900">{filteredOrders.length}</span> of <span className="text-gray-900">{orders.length}</span> results
            </p>
            <div className="flex items-center gap-2">
               <button disabled className="px-3 py-1.5 text-xs font-bold text-gray-400 bg-white border border-gray-200 rounded-lg cursor-not-allowed">Previous</button>
               <button disabled className="px-3 py-1.5 text-xs font-bold text-gray-400 bg-white border border-gray-200 rounded-lg cursor-not-allowed">Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
