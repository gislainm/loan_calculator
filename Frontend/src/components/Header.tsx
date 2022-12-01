import { useNavigate } from 'react-router-dom';
const customClass = "block mt-1 sm:inline-block sm:mt-0 font-bold text-yellow-500 mr-4 py-1 px-14 hover:bg-teal-100 cursor-pointer";
interface HeaderInfo {
    homeLink: string,
    profileLink?: string,
    paymentLink?: string,
    currentPage?: string,
    username?: string
}
export default function Header({
    homeLink,
    profileLink,
    paymentLink,
    currentPage,
    username

}: HeaderInfo): JSX.Element {
    const navigate = useNavigate();
    function Logout() {
        localStorage.removeItem("user");
        navigate("/login")
    }
    return (
        <nav className='flex items-center justify-between flex-wrap bg-gray-800 py-1 px-4'>
            <div className='flex items-center'>
                <img
                    onClick={() => { navigate(homeLink + "/" + username) }}
                    alt=""
                    className="h-14 w-14 cursor-pointer"
                    src="/img/logo.png" />
                <label className='text-amber-400 font-bold'>{username}</label>
            </div>
            <div className='flex sm:flex sm:items-center sm:auto'>
                <a href={homeLink + "/" + username} className={currentPage === "Home" ? customClass + " bg-emerald-100 rounded" : customClass}>
                    Home
                </a>
                <a href={paymentLink + "/" + username} className={currentPage === "Payment Plan" ? customClass + " bg-emerald-100 rounded" : customClass}>
                    Payment Plan
                </a>
                <a href={profileLink + "/" + username} className={currentPage === "Profile" ? customClass + " bg-emerald-100 rounded" : customClass}>
                    Profile
                </a>
            </div>
            <div>
                <button className='inline-block text-sm px-3 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-cyan-400 hover:bg-yellow-600 mt-4 md:mt-0' onClick={Logout}>
                    Logout
                </button>
            </div>

        </nav>
    )
}