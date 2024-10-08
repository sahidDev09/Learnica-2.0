import Link from "next/link";
import { FaEnvelope, FaHome, FaSearch } from "react-icons/fa";

const layout = ({ children }) => {
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

                {role === "trainer" && (
                  <>
                    <li>
                      <Link href="/trainer/courses">Courses</Link>
                    </li>

                    <li>
                      <Link href="/trainer/my-reports">My Reports</Link>
                    </li>
                    <li>
                      <Link href="/trainer/comments">Comments</Link>
                    </li>
                  </>
                )}

                {role == "admin" && (
                  <>
                    <li>
                      <Link href="/admin/manage-users">Manage Users</Link>
                    </li>
                    <li>
                      <Link href="/admin/manage-courses">Manage Courses</Link>
                    </li>
                    <li>
                      <Link href="/admin/payments">Payments</Link>
                    </li>
                  </>
                )}

                <div className="divider"></div>
                <li>
                  <Link href="/">
                    <FaHome />
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/all-courses">
                    <FaSearch />
                    All Courses
                  </Link>
                </li>
                {["user", "trainer"].includes(role) && (
                  <li>
                    <Link href="/contact">
                      <FaEnvelope />
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

          {children}
        </div>
      </div>
    </div>
  );
};

export default layout;
