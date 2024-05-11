import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaRegCircleUser } from "react-icons/fa6";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import ROLE from "../common/role";
import SummaryApi from "../common";
import { setUserDetails } from "../store/userSlice";
import { toast } from "react-toastify";

const AdminPanel = () => {
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchInput = useLocation();
  const URLSearch = new URLSearchParams(searchInput?.search);
  const searchQuery = URLSearch.getAll("q");
  const [search, setSearch] = useState("");
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [desktopSearch, setDesktopSearch] = useState("");

  useEffect(() => {
    if (user?.role !== ROLE.ADMIN) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    setSearch(searchQuery.join(""));
  }, [searchQuery]);

  const handleLogout = async () => {
    try {
      const fetchData = await fetch(SummaryApi.logout_user.url, {
        method: SummaryApi.logout_user.method,
        credentials: "include",
      });

      const data = await fetchData.json();

      if (data.success) {
        toast.success(data.message);
        dispatch(setUserDetails(null));
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="min-h-[calc(100vh-120px)] md:flex">
      <aside className="bg-white min-h-full w-full max-w-full md:max-w-60 customShadow md:mt-0 mt-5">
        <div className="h-32  flex justify-center items-center flex-col">
          <div className="text-5xl cursor-pointer relative flex justify-center mt-5">
            {user?.profilePic ? (
              <img
                src={user?.profilePic}
                className="w-20 h-20 rounded-full"
                alt={user?.name}
              />
            ) : (
              <FaRegCircleUser />
            )}
          </div>
          <p className="capitalize text-lg font-semibold">{user?.name}</p>
          <button
            onClick={handleLogout}
            className="px-4 rounded-full text-white bg-red-600 hover:bg-amber-500"
          >
            Logout
          </button>
        </div>

        <div>
          <nav className="grid p-4">
            {/* Conditional rendering of "All Products" link based on user role */}
            {user?.role !== ROLE.ADMIN && (
              <Link to={"all-users"} className="px-2 py-1 hover:bg-slate-100">
                All Users
              </Link>
            )}
            <Link
              to={"all-products"}
              className="px-2 py-1 hover:bg-slate-100 text-center md:text-center"
            >
              All Products
            </Link>
          </nav>
        </div>
      </aside>

      <main className="w-full h-full p-2">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminPanel;
