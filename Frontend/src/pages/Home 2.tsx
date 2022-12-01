import { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import LoanInfo from "../components/LoanInfo";
import Sponsor from "../components/SponsorsInfo";
import { useNavigate } from "react-router-dom";
import { Context } from "../context/Context";
import axios from 'axios';
axios.defaults.baseURL = "http://localhost:8080/sloanBuddy";

export default function Home(): JSX.Element {
    const { user } = useContext(Context);
    const [username, setUsername] = useState();
    const [sponsors, setSponsors] = useState<any>()
    const navigate = useNavigate();
    useEffect(() => {
        async function fetchSponsors() {
            const sponsors = (await axios.get(`/allSponsors`)).data.data;
            setSponsors(sponsors);
        }
        if (user) {
            setUsername(user.data.user.Firstname);
            fetchSponsors();
        } else {
            navigate("/login");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [username]);
    return (
        <>
            <Header homeLink="/home" profileLink="/profile" paymentLink="/payment" currentPage="Home" username={username} />
            <div className="bg-gradient-to-r from-cyan-700 to-teal-600 text-center text-white p-3">
                <h2 className="text-3xl font-extrabold p-3 font-sans subpixel-antialiased">Student Loan Repayment Calculator</h2>
                <p className="text-base font-sans">Not sure what you’ll be paying for your student loan every month? Find out with this easy-to-use calculator.<br />
                    Just enter the amount of your loan, the interest rate, and how long you have to pay it back. We’ll estimate what your monthly bill will be,<br /> plus show you how much interest you’ll be paying over the life of your loan.
                </p>
            </div>
            <main className="flex justify-center">
                <div className="grid grid-cols-3 gap-3 my-10 mx-10">
                    <div className="col-span-2">
                        <LoanInfo />
                    </div>
                    <div className="col-span-1 border-2 border-gray-300 h-fit p-3 rounded">
                        <div className="text-xl font-serif mb-2 font-bold text-emerald-800 text-center">Checkout our sponsors</div>
                        {sponsors ? sponsors.map((sponsor: any, index: number) => {
                            return <Sponsor key={index} sponsor={sponsor} />
                        }) : "No Sponsors avaialable"}
                    </div>
                </div>
            </main>

        </>
    )
}