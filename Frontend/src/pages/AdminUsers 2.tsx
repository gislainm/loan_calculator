import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:8080/sloanBuddy";
const customClass = "block mt-1 sm:inline-block sm:mt-0 font-bold text-yellow-500 mr-4 py-1 px-14 hover:bg-teal-100 cursor-pointer";

export default function Users() {
    const navigate = useNavigate();
    const [adminAuth, setAdminAuth] = useState<boolean>(false)
    const [allUsers, setAllUsers] = useState<any>([]);
    useEffect(() => {
        const role = localStorage.getItem("role");
        async function fetchUsers() {
            const users = (await axios.get(`/allUsers`)).data.data;
            setAllUsers(users);
        }
        if (role === "admin") {
            setAdminAuth(true);
            fetchUsers();
        } else {
            navigate("/login");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function Logout() {
        localStorage.removeItem("role");
        navigate("/login")
    }
    async function deleteUser(email: string) {
        const newUsers = allUsers.filter((user: any) => user["email-address"] !== email);
        setAllUsers(newUsers);
        try {
            await axios.delete(`/deleteUser/${email}`)
        } catch (error) {
            alert("delete user failed");
        }
    }
    return (
        <>
            {
                adminAuth ? <div>
                    <nav className='flex items-center justify-between flex-wrap bg-gray-800 py-1 px-4'>
                        <div className='flex items-center'>
                            <img
                                alt=""
                                className="h-14 w-14 cursor-pointer"
                                src="/img/logo.png" />
                            <label className='text-amber-400 font-bold'>Admin</label>
                        </div>
                        <div className='flex sm:flex sm:items-center sm:auto'>
                            <a href="/admin/users" className={customClass + " bg-emerald-100 rounded"}>
                                Users
                            </a>
                            <a href="/admin/sponsors" className={customClass}>
                                Sponsors
                            </a>
                        </div>
                        <div>
                            <button className='inline-block text-sm px-3 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-cyan-400 hover:bg-yellow-600 mt-4 md:mt-0' onClick={Logout}>
                                Logout
                            </button>
                        </div>
                    </nav>
                    <div className="border-2 border-gray-300 h-fit p-3 rounded w-2/4 m-5">
                        <div className="flex items-center justify-center flex-col">
                            <div className="text-xl font-serif mb-2 font-bold text-emerald-800">Users</div>
                            {allUsers.map((user: any, index: any) => {
                                return <div key={index} className="bg-slate-100 py-2 px-4 rounded-lg w-3/4 flex justify-between my-1">
                                    <label className="font-bold text-sky-700 text-lg leading-none">
                                        {user.Firstname + " " + user.Lastname}<br /><label className='font-normal text-gray-500 text-sm m-0'>{user["email-address"]}</label>
                                    </label>
                                    <button
                                        className="rounded-full bg-red-700 p-2 text-white uppercase text-[11px] hover:bg-red-500 font-medium w-1/5 tracking-tighter font-sans"
                                        onClick={() => deleteUser(user["email-address"])}
                                    >
                                        Delete User</button>
                                </div>
                            })}
                        </div>
                    </div>
                </div>
                    : <div>Admin Unauthorized</div>
            }
        </>
    )
}