import Header from "../components/Header";
import { useContext, useEffect, useState } from "react";
import { Context } from "../context/Context";
import ReactEcharts from "echarts-for-react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:8080/sloanBuddy";

export default function PaymentPage() {
    const { user } = useContext(Context);
    const [infoReady, setInfoReady] = useState<boolean>(false);
    const navigate = useNavigate();
    useEffect(() => {
        if (user.data.user.interest && user.data.user.monthlyPayment && user.data.user.totalLoan && user.data.user.totalPayment && user.data.user.term && user.data.user.totalInterest) {
            setInfoReady(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const option = {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            top: '5%',
            left: 'center'
        },
        series: [
            {
                name: 'Student Loan Payment',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '16',
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: [
                    { value: user.data.user.totalLoan, name: 'Initial Loan' },
                    { value: user.data.user.totalInterest, name: 'Total interest' }
                ]
            }
        ]
    };

    return (
        <>
            <Header homeLink="/home" profileLink="/profile" paymentLink="/payment" currentPage="Payment Plan" username={user.data.user.Firstname} />
            <div className="bg-blue-200 p-4 w-3/5 m-10">
                <div className="bg-white flex items-center justify-center shadow-md rounded">
                    {!infoReady ? <div className="m-14 p-14 flex-cols justify-center items-center">
                        <h3 className="text-slate-500 font-extrabold text-3xl subpixel-antialiased font-sans m-1">You have no repayment plan saved</h3>
                        <button className="bg-emerald-700 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline inline-block" type="button" onClick={() => { navigate(`/home/${user.data.user.Firstname}`) }}>
                            Make a Plan
                        </button>
                    </div> : <div>
                        <ReactEcharts
                            option={option}
                            style={{ height: "40vh", left: 20, top: 10, width: "40vw" }}
                        />
                        <div className="grid grid-cols-4 gap-3 text-black-400 mx-10 mb-3">
                            <div className="text-center flex-col justify-center ">
                                <img src="/img/calendar.png" alt="monthly payment" className="h-8 inline-block" />
                                <label className="text-xl font-extrabold text-gray-600 font-sans tracking-tight block mt-3">${user.data.user.monthlyPayment}</label>
                                <label className="text-lg font-bold text-gray-500 font-sans tracking-tight block">Monthly Payment</label>
                            </div>
                            <div className="text-center">
                                <img src="/img/interest.png" alt="total interest" className="h-8 inline-block" />
                                <label className="text-xl font-extrabold text-gray-600 font-sans tracking-tight block mt-3">${user.data.user.totalInterest}</label>
                                <label className="text-lg font-bold text-gray-500 font-sans tracking-tight inline-block">Total Interest</label>
                            </div>
                            <div className="text-center">
                                <img src="/img/payment.png" alt="total interest" className="h-8 inline-block" />
                                <label className="text-xl font-extrabold text-gray-600 font-sans tracking-tight block mt-3">${user.data.user.totalPayment}</label>
                                <label className="text-lg font-bold text-gray-500 font-sans tracking-tight inline-block">Total Repayment</label>
                            </div>
                            <div className="flex items-center justify-center">
                                <button className="bg-emerald-700 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline" type="button" onClick={() => { navigate(`/home/${user.data.user.Firstname}`) }}>
                                    Make a new Plan
                                </button>
                            </div>
                        </div>
                    </div>}
                </div>
            </div>
        </>
    )
}