"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Header from "./_components/Header";
import { useUser } from "@clerk/nextjs";
import AdminSidebar from "./_components/AdminSidebar";
import TeacherSidebar from "./_components/TeacherSidebar";
import { FiMenu, FiX } from "react-icons/fi"; // For the menu and close icons

const Layout = ({ children }) => {
  const [mainRole, setMainRole] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for toggling sidebar in mobile view
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const { user, isLoaded } = useUser();

  const currUser = user?.primaryEmailAddress?.emailAddress;

  useEffect(() => {
    const fetchUserData = async () => {
      if (currUser) {
        try {
          const response = await fetch(
            `/api/users/user?email=${currUser}`
          );
          const data = await response.json();
          const currData = data;
          setMainRole(currData.mainRole);
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [currUser]);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev); // Toggle the sidebar state
  };

  // Check if current path is admin route
  const isAdminRoute = pathname?.includes('/dashboard/admin');

  useEffect(() => {
    if (isLoaded && !loading && isAdminRoute && mainRole !== "admin") {
      router.push("/");
    }
  }, [isAdminRoute, mainRole, loading, isLoaded, router]);

  if (!isLoaded || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  return (
    <div className="">
      {/* Menu Icon for Mobile View */}
      <div className="sm:hidden fixed z-50 top-2 left-2">
        {/* Toggle between Menu and Close icons */}
        <button onClick={toggleSidebar}>
          {isSidebarOpen ? (
            <FiX size={24} className=" text-primary" />
          ) : (
            <FiMenu size={24} className="text-primary" />
          )}
        </button>
      </div>
      <div
        className={`fixed sm:w-72 h-full sm:block transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0 bg-white z-40 -mt-10 md:mt-0 `}>
        {mainRole === "admin" ? <AdminSidebar /> : <TeacherSidebar />}
      </div>

      <div className={`sm:ml-72 transition-all`}>
        <Header />
        {children}
      </div>

      {/* Overlay when sidebar is open on mobile view */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 sm:hidden"
          onClick={toggleSidebar}></div>
      )}
    </div>
  );
};

export default Layout;
