import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from 'axios';
import Input from "../components/Input";
import FormAction from "../components/FormAction";

axios.defaults.baseURL = "http://localhost:8080/sloanBuddy";
const customClass = "block mt-1 sm:inline-block sm:mt-0 font-bold text-yellow-500 mr-4 py-1 px-14 hover:bg-teal-100 cursor-pointer";

export default function Sponsors() {
    const navigate = useNavigate();
    const [adminAuth, setAdminAuth] = useState<boolean>(false)
    const [allSponsors, setAllSponsors] = useState<any>([]);
    const [newSponsor, setNewSponsor] = useState<any>({ name: "", link: "" });

    useEffect(() => {
        const role = localStorage.getItem("role");
        async function fetchSponsors() {
            const sponsors = (await axios.get(`/allSponsors`)).data.data;
            setAllSponsors(sponsors);
        }
        if (role === "admin") {
            setAdminAuth(true);
            fetchSponsors()
        } else {
            navigate("/login");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    function Logout() {
        localStorage.removeItem("role");
        navigate("/login")
    }
    async function deleteSponsor(name: any) {
        const newSponsors = allSponsors.filter((sponsor: any) => sponsor.name !== name);
        setAllSponsors(newSponsors);
        try {
            await axios.delete(`/deleteSponsor/${name}`)
        } catch (error) {
            alert("delete user failed");
        }
    }
    const handleChange = (e: any) => {
        setNewSponsor({ ...newSponsor, [e.target.id]: e.target.value });
    }
    const handleSave = async (e: any) => {
        e.preventDefault();
        let sponsorToAdd = newSponsor;
        let newSponsorsCol = allSponsors.concat(sponsorToAdd);
        setAllSponsors(newSponsorsCol)
        try {
            await axios.post('/sponsor', sponsorToAdd);
        } catch (error) {
            alert("adding sponsor failed")
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
                            <a href="/admin/users" className={customClass}>
                                Users
                            </a>
                            <a href="/admin/sponsors" className={customClass + " bg-emerald-100 rounded"}>
                                Sponsors
                            </a>
                        </div>
                        <div>
                            <button className='inline-block text-sm px-3 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-cyan-400 hover:bg-yellow-600 mt-4 md:mt-0' onClick={Logout}>
                                Logout
                            </button>
                        </div>
                    </nav>
                    <div className="border-2 border-gray-300 h-fit p-3 rounded w-3/5 m-5">
                        <div className="flex items-center justify-center flex-col">
                            <div className="text-xl font-serif mb-2 font-bold text-emerald-800">Sponsors</div>
                            {allSponsors.map((sponsor: any, index: any) => {
                                return <div key={index} className="bg-slate-100 py-2 px-4 rounded-lg w-3/4 flex justify-between my-1">
                                    <label className="font-bold text-sky-700 text-lg leading-none">
                                        {sponsor.name}<br /><label className='font-normal text-gray-500 text-sm m-0'>{sponsor.link}</label>
                                    </label>
                                    <button
                                        className="rounded-full bg-red-700 p-2 text-white uppercase text-[11px] hover:bg-red-500 font-medium w-1/5 tracking-tighter font-sans"
                                        onClick={() => deleteSponsor(sponsor.name)}
                                    >
                                        Delete Sponsor</button>
                                </div>
                            })}
                        </div>
                    </div>
                    <div className="w-full m-5">
                        <div className='text-center w-1/4 text-lg font-semibold text-green-800'>Add a sponsor</div>
                        <form className=" space-y-6 bg-blue-100 rounded p-10 shadow-sm shadow-slate-800 w-1/4">
                            <Input
                                key={1}
                                handleChange={handleChange}
                                value={newSponsor.name}
                                labelText="Name"
                                labelFor="Name"
                                id="name"
                                name="Name"
                                type="Name"
                                isRequired={true}
                                placeholder="Name"
                            />
                            <Input
                                key={2}
                                handleChange={handleChange}
                                value={newSponsor.link}
                                labelText="Link"
                                labelFor="Link"
                                id="link"
                                name="Link"
                                type="text"
                                isRequired={true}
                                placeholder="Link"
                            />
                            <FormAction handleSubmit={handleSave} text="Save" type="Button" action="submit" isFetching={false} />
                        </form>
                    </div>
                </div>
                    : <div>Admin Unauthorized</div>
            }
        </>
    )
}