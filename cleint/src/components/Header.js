import React, { useState, useEffect } from "react";
import Logo from "./Logo";
import { GrSearch } from "react-icons/gr";
import { FaSearch, FaUserCircle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";

const Header = () => {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchInput = useLocation();
  const URLSearch = new URLSearchParams(searchInput?.search);
  const searchQuery = URLSearch.getAll("q");
  const [search, setSearch] = useState("");
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [desktopSearch, setDesktopSearch] = useState("");

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

  const handleMobileSearch = (value) => {
    setSearch(value);

    if (value) {
      navigate(`/search?q=${value}`);
    } else {
      navigate("/search");
    }
  };

  const handleDesktopSearch = (value) => {
    setDesktopSearch(value);

    if (value) {
      navigate(`/search?q=${value}`);
    } else {
      navigate("/search");
    }
  };

  const toggleMobileSearch = () => {
    setShowMobileSearch((prev) => !prev);
    setSearch(""); // Clear search when toggling
  };

  return (
    <header className="h-16 shadow-md bg-white py-2 fixed w-full z-40">
      <div className="container mx-auto flex items-center px-4 justify-between">
        <div>
          <Link to={"/"}>
            <Logo w={120} h={50} />
          </Link>
        </div>

        <div className="lg:hidden">
          <button
            onClick={toggleMobileSearch}
            className="text-2xl relative flex items-center justify-center"
          >
            <FaSearch className="text-fuchsia-600" />
          </button>
        </div>

        {showMobileSearch && (
          <div className="lg:hidden absolute top-12 left-0 w-full bg-white z-50 mt-4 mb-4">
            <input
              type="text"
              className="w-full bg-fuchsia-600 text-white placeholder-white px-2 outline-none border border-gray-300"
              placeholder="Search..."
              onChange={(e) => handleMobileSearch(e.target.value)}
              value={search}
            />
          </div>
        )}

        <div className="hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2">
          <input
            type="text"
            placeholder="Search product here..."
            className="w-full outline-none"
            onChange={(e) => handleDesktopSearch(e.target.value)}
            value={desktopSearch}
          />
          <div className="text-lg min-w-[50px] h-8 bg-fuchsia-600 flex items-center justify-center rounded-r-full text-white">
            <GrSearch />
          </div>
        </div>

        <div className="flex items-center gap-7">
          <div>
            {user?._id ? (
              <button
                onClick={handleLogout}
                className="px-3 py-1 rounded-full text-white bg-fuchsia-600 hover:bg-amber-500"
              >
                Logout
              </button>
            ) : (
              <Link
                to={"/login"}
                className="px-3 py-1 rounded-full text-white bg-fuchsia-600 hover:bg-amber-500"
              >
                Login
              </Link>
            )}
          </div>
          
          <div className="relative flex justify-center">
            {user?._id && (
              <div className="text-3xl cursor-pointer relative flex justify-center">
                <Link to="/admin-panel/all-products">
                  {user?.profilePic ? (
                    <img
                      src={user?.profilePic}
                      className="w-10 h-10 rounded-full"
                      alt={user?.name}
                    />
                  ) : (
                    <FaUserCircle />
                  )}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
