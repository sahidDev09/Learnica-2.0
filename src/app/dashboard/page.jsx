import Admin from "@/components/dashboard/admin";
import Owner from "@/components/dashboard/Owner";
import Trainer from "@/components/dashboard/Trainer";
import User from "@/components/dashboard/User";
import Link from "next/link";
import { FaEnvelope, FaHome, FaSearch } from "react-icons/fa";

const page = () => {
  const role = "admin";
  return (
    <div>
      <div className="min-h-screen md:flex">
        {/* Sidebar */}
        <div className="bg-card">
          <div className="drawer lg:drawer-open z-20">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

            <div className="drawer-side">
              <label
                htmlFor="my-drawer-2"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <ul className="menu z-20 p-4 w-80 min-h-full bg-base-200 text-base-content">
                {/* Sidebar content here */}
                <li>
                  <Link href="/dashboard/profile">Profile</Link>
                </li>
                {role == "user" && (
                  <>
                    <li>
                      <Link href="/dashboard/user/courses">Courses</Link>
                    </li>

                    <li>
                      <Link href="/dashboard/user/my-reports">My Reports</Link>
                    </li>
                  </>
                )}

                {role == "trainer" && (
                  <>
                    <li>
                      <Link href="/dashboard/trainer/courses">Courses</Link>
                    </li>

                    <li>
                      <Link href="/dashboard/trainer/my-reports">
                        My Reports
                      </Link>
                    </li>
                    <li>
                      <Link href="/dashboard/trainer/comments">Comments</Link>
                    </li>
                  </>
                )}

                {role == "admin" && (
                  <>
                    <li>
                      <Link href="/dashboard/admin/manage-users">
                        Manage Users
                      </Link>
                    </li>
                    <li>
                      <Link href="/dashboard/admin/manage-courses">
                        Manage Courses
                      </Link>
                    </li>
                    <li>
                      <Link href="/dashboard/admin/payments">Payments</Link>
                    </li>
                  </>
                )}

                {role == "owner" && (
                  <>
                    <li>
                      <Link href="/dashboard/admin/manage-users">
                        Manage Users
                      </Link>
                    </li>
                    <li>
                      <Link href="/dashboard/admin/manage-courses">
                        Manage Courses
                      </Link>
                    </li>
                    <li>
                      <Link href="/dashboard/admin/payments">Payments</Link>
                    </li>
                  </>
                )}

                <div className="divider"></div>
                <li>
                  <Link href="/">
                    <FaHome></FaHome>
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/all-courses">
                    <FaSearch></FaSearch>
                    All Courses
                  </Link>
                </li>
                {role == ("user" || "trainer") && (
                  <li>
                    <Link href="/contact">
                      <FaEnvelope></FaEnvelope>
                      Contact
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Outlet */}
        <div className="w-full m-2">
          <div className="drawer-content flex flex-col items-center justify-center">
            {/* Page content here */}
            <label
              htmlFor="my-drawer-2"
              className="btn my-10 bg-primary text-white drawer-button lg:hidden"
            >
              Open Menu
            </label>
          </div>

          {/* ----------------------------- Outlet ------------------------------- */}

          {/* for owner */}
          {role == "owner" && (
            <div>
              <Owner></Owner>
            </div>
          )}

          {/* for admin */}
          {role == "admin" && (
            <div>
              <Admin></Admin>
            </div>
          )}

          {/* for trainer */}
          {role == "trainer" && (
            <div>
              <Trainer></Trainer>
            </div>
          )}

          {/* for user */}
          {role == "user" && (
            <div>
              <User></User>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
