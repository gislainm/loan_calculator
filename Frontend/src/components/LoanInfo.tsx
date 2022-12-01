import ReactEcharts from "echarts-for-react";
import { useState, useContext } from "react";
import { Context } from "../context/Context";
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:8080/sloanBuddy";

interface loanDetails {
    loan?: number,
    interest?: number,
    term?: number
}
interface payment {
    totalPayment?: number,
    totalInterest?: number,
    totalLoan?: number,
    monthlyPayment?: number,
    interest?: number,
    term?: number
}
const inputLabelStyle = "bg-white shadow border rounded w-full px-3 text-gray-400 focus:shadow-outline block font-bold"

export default function LoanInfo(): JSX.Element {
    const [loanDets, setLoanDets] = useState<loanDetails>({});
    const [paymentInfo, setPaymentInfo] = useState<payment>({});
    const [infoReady, setInfoReady] = useState<boolean>(false);
    const [paymentSaved, setPaymentSaved] = useState<string>("");
    const { user, dispatch } = useContext(Context);
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
                    { value: paymentInfo.totalLoan!, name: 'Initial Loan' },
                    { value: paymentInfo.totalInterest!, name: 'Total interest' }
                ]
            }
        ]
    };

    function handleChange(event: any) {
        setLoanDets({ ...loanDets, [event.target.name]: Number(event.target.value) })
    }
    function calculateInt() {
        //formula to be used is a/(([(1+r)^n]-1)/[r(1+r)^n]) a=>loan amount, r=>interest rate/100*12, n=>12*loan term
        const { loan, term, interest } = loanDets;
        if (loan && term && interest) {
            let r = interest! / (100 * 12);
            let n = term! * 12;
            let monthlyPayment = loan! / ((((1 + r) ** n) - 1) / (r * (1 + r) ** n));
            let totalInterest = (monthlyPayment * 12 * term!) - loan!;
            setPaymentInfo({
                totalPayment: Math.ceil(loan! + totalInterest),
                totalInterest: Math.ceil(totalInterest),
                totalLoan: Math.ceil(loan!),
                monthlyPayment: Math.ceil(monthlyPayment!),
                interest: interest,
                term: term
            })
            setInfoReady(true);
        }
    }
    async function savePlan() {
        try {
            let updatedUser = await axios.post("/update", { email: user.data.user["email-address"], paymentInfo });
            dispatch({
                type: "UPDATE_USER", payload: {
                    // updatedUser.data
                    error: false,
                    message: null,
                    data: {
                        accessToken: user.data.accessToken,
                        user: updatedUser.data.data
                    }
                }
            });
            setPaymentSaved("Plan successfully saved")
            setTimeout(() => { setPaymentSaved("") }, 3000)
        } catch (error: any) {
            setPaymentSaved("saving plan failed,try again")
        }
    }
    return (
        <>
            <div className="grid grid-cols-3 bg-blue-200 gap-4 p-4">
                <div className="col-span-1">
                    <div className="w-full max-w-xs">
                        <div className="w-full bg-white text-center p-3 rounded font-extrabold text-gray-800">
                            Loan Info
                        </div>

                        <form className="bg-blue-100 shadow-md rounded px-8 pt-6 pb-8 my-4">
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="loan">
                                    Student Loan Balance
                                </label>
                                <label className={inputLabelStyle}>
                                    $<input id="loan" type="number" pattern="([0-9]+.{0,1}[0-9]*,{0,1})*[0-9]" placeholder="0" className="focus:outline-none leading-tight appearance-none py-2 w-11/12 font-bold" name="loan" onChange={(e) => { handleChange(e) }} required />
                                </label>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="interest">
                                    Average Interest Rate
                                </label>
                                <label className={inputLabelStyle}>
                                    <input className="focus:outline-none leading-tight appearance-none py-2 w-10/12 font-bold" id="interest" type="number" placeholder="0" name="interest" onChange={(e) => { handleChange(e) }} /> %
                                </label>
                            </div>
                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="term">
                                    Loan Term (yr)
                                </label>
                                <label className={inputLabelStyle}>
                                    <input className="focus:outline-none leading-tight appearance-none py-2 w-10/12 font-bold" id="term" type="number" placeholder="0" name="term" onChange={(e) => { handleChange(e) }} /> yr
                                </label>
                            </div>
                            <div className="flex items-center justify-center">
                                <button className="bg-sky-900 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline" type="button" onClick={() => calculateInt()}>
                                    Calculate
                                </button>
                            </div>
                        </form>
                        <p className="text-center text-gray-500 text-xs">
                            &copy;2020 S-Loan Buddy. All rights reserved.
                        </p>
                    </div>
                </div>
                <div className="col-span-2 bg-white flex items-center justify-center shadow-md rounded">
                    {!infoReady ? <div className="m-14 p-14">
                        <h3 className="text-slate-500 font-extrabold text-3xl subpixel-antialiased font-sans m-1">Know what the future holds & Make informed decision</h3>
                        <p className="font-medium font-sans text-base subpixel-antialiased my-2 mx-1 text-gray-600">Plug in a few quick numbers for an idea of what you will be paying</p>
                        <div className="flex items-center justify-center m-10">
                            <img src="/img/pie-chart.png" alt="money bag icon" className="h-24" />
                        </div>
                    </div> : <div>
                        <ReactEcharts
                            option={option}
                            style={{ height: "40vh", left: 20, top: 10, width: "40vw" }}
                        />
                        <div className="text-center mb-3 text-green-700 font-base font-serif font-semibold tracking-tight">{paymentSaved}</div>
                        <div className="grid grid-cols-4 gap-3 text-black-400 mx-10 mb-3">
                            <div className="text-center flex-col justify-center ">
                                <img src="/img/calendar.png" alt="monthly payment" className="h-8 inline-block" />
                                <label className="text-xl font-extrabold text-gray-600 font-sans tracking-tight block mt-3">${paymentInfo.monthlyPayment}</label>
                                <label className="text-lg font-bold text-gray-500 font-sans tracking-tight block">Monthly Payment</label>
                            </div>
                            <div className="text-center">
                                <img src="/img/interest.png" alt="total interest" className="h-8 inline-block" />
                                <label className="text-xl font-extrabold text-gray-600 font-sans tracking-tight block mt-3">${paymentInfo.totalInterest}</label>
                                <label className="text-lg font-bold text-gray-500 font-sans tracking-tight inline-block">Total Interest</label>
                            </div>
                            <div className="text-center">
                                <img src="/img/payment.png" alt="total interest" className="h-8 inline-block" />
                                <label className="text-xl font-extrabold text-gray-600 font-sans tracking-tight block mt-3">${paymentInfo.totalPayment}</label>
                                <label className="text-lg font-bold text-gray-500 font-sans tracking-tight inline-block">Total Repayment</label>
                            </div>
                            <div className="flex items-center justify-center">
                                <button className="bg-emerald-700 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline" type="button" onClick={() => savePlan()}>
                                    Save Plan
                                </button>
                            </div>
                        </div>
                    </div>}
                </div>
            </div>
        </>

    )
}