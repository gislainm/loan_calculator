import LoginHeader from "../components/LoginHeader";
import Signup from "../components/Signup";

export default function SignupFUnc(): JSX.Element {
    return (
        <div className="bg-gradient-to-r from-slate-900 via-sky-900 to-cyan-900 w-full h-full flex items-center justify-around flex-wrap px-14 text-white absolute inset-0">
            <div className="px-6">
                <div className="text-center">
                    <h1 className="font-serif text-5xl py-3 font-extrabold text-yellow-500 animate-bounce">S-Loan Buddy</h1>
                    <label className="font-mono text-teal-300 font-semibold">The most Intuitive & Interactive<br />Student-Loan Payment Planner.</label>
                </div>
                <img src="/img/buddyLogo.png" alt="logo" />
            </div>
            <div className="bg-blue-200 rounded p-10 shadow-lg shadow-slate-800">
                <LoginHeader heading="Signup to create an  account" paragraph="Already have an account?" linkName="Login" linkUrl="/login" />
                <Signup />
            </div>
        </div>
    )
}