import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FaRegCircleUser } from "react-icons/fa6";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import ROLE from '../common/role';

const AdminPanel = () => {
    const user = useSelector(state => state?.user?.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (user?.role !== ROLE.ADMIN) {
            navigate("/");
        }
    }, [user, navigate]);

    return (
        <div className='min-h-[calc(100vh-120px)] md:flex'>
           <aside className='bg-white min-h-full w-full max-w-full md:max-w-60 customShadow md:mt-0 mt-5'>
                <div className='h-32  flex justify-center items-center flex-col'>
                    <div className='text-5xl cursor-pointer relative flex justify-center mt-5'>
                        {
                            user?.profilePic ? (
                                <img src={user?.profilePic} className='w-20 h-20 rounded-full' alt={user?.name} />
                            ) : (
                                <FaRegCircleUser />
                            )
                        }
                    </div>
                    <p className='capitalize text-lg font-semibold'>{user?.name}</p>
                </div>

                <div>
                    <nav className='grid p-4'>
                        {/* Conditional rendering of "All Products" link based on user role */}
                        {user?.role !== ROLE.ADMIN && (
                            <Link to={"all-users"} className='px-2 py-1 hover:bg-slate-100'>All Users</Link>
                        )}
                        <Link to={"all-products"} className='px-2 py-1 hover:bg-slate-100 text-center md:text-center'>All Products</Link>
                    </nav>
                </div>
            </aside>

            <main className='w-full h-full p-2'>
                <Outlet />
            </main>
        </div>
    );
}

export default AdminPanel;
