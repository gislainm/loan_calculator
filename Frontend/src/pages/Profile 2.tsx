import Header from "../components/Header";
import { useContext, useState } from "react";
import { Context } from "../context/Context";
import FormAction from "../components/FormAction";
import Input from "../components/Input"; 
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:8080/sloanBuddy";

export default function ProfilePage() {
    const { user, dispatch } = useContext(Context);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [updatedUser, setUpdatedUser] = useState<any>({});
    const [saveMsg, setSaveMsg] = useState<string>("");
    const handleSave = async (e: any) => {
        e.preventDefault();
        setIsEdit(false);
        try {
            let newUser = await axios.post("/update", { email: user.data.user["email-address"], paymentInfo: updatedUser });
            dispatch({
                type: "UPDATE_USER", payload: {
                    error: false,
                    message: null,
                    data: {
                        accessToken: user.data.accessToken,
                        user: newUser.data.data
                    }
                }
            });
            setSaveMsg("Profile successfully updated")
            setTimeout(() => { setSaveMsg("") }, 3000)
        } catch (error) {
            setSaveMsg("Updating profile failed,try again")
        }
    }
    const handleChange = (e: any) => {
        setUpdatedUser({ ...updatedUser, [e.target.id]: e.target.value });
    }
    return (
        <>
            <Header homeLink="/home" profileLink="/profile" paymentLink="/payment" currentPage="Profile" username={user.data.user.Firstname} />
            <div className="container mx-auto mt-32 mb-10">
                <div>
                    <div className="bg-gray-100 relative shadow rounded-lg w-5/6 md:w-4/6  lg:w-3/6 xl:w-2/6 mx-auto">
                        <div className="flex justify-center pb-1">
                            <img src="/img/graduate.png" alt="" className="rounded-full mx-auto absolute -top-20 w-32 h-32 shadow-md border-4 border-white transition duration-200 transform hover:scale-110" />
                        </div>
                        <div className="mt-16">
                            <h1 className="font-bold text-center text-3xl text-gray-900">{user.data.user.Firstname} {user.data.user.Lastname}</h1>
                            <p className="text-center text-sm text-gray-400 font-medium">{user.data.user["email-address"]}</p>
                            <p>
                                <span>

                                </span>
                            </p>
                            <div className="my-5 px-6 pb-4" onClick={() => { setIsEdit(true) }}>
                                <a href="#" className="text-gray-200 block rounded-lg text-center font-medium leading-6 px-6 py-3 bg-gray-900 hover:bg-black hover:text-white font-bold">Update Profile</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-center mb-3 text-green-700 font-base font-serif font-semibold tracking-tight">{saveMsg}</div>
            {isEdit ?
                <div className="flex items-center justify-center w-full mt-5">
                    <form className=" space-y-6 bg-blue-100 rounded p-10 shadow-sm shadow-slate-800 w-1/4">
                        <Input
                            key={1}
                            handleChange={handleChange}
                            value={updatedUser.Firstname ? updatedUser.Firstname : user.data.user.Firstname}
                            labelText="Firstname"
                            labelFor="Firstname"
                            id="Firstname"
                            name="Firstname"
                            type="text"
                            isRequired={true}
                            placeholder={user.data.user.Firstname}
                        />
                        <Input
                            key={2}
                            handleChange={handleChange}
                            value={updatedUser.Lastname ? updatedUser.Lastname : user.data.user.Lastname}
                            labelText="Lastname"
                            labelFor="Lastname"
                            id="Lastname"
                            name="Lastname"
                            type="text"
                            isRequired={true}
                            placeholder={user.data.user.Lastname}
                        />
                        <Input
                            key={3}
                            handleChange={handleChange}
                            value={updatedUser["email-address"] ? updatedUser["email-address"] : user.data.user["email-address"]}
                            labelText="email-address"
                            labelFor="email-address"
                            id="email-address"
                            name="email-address"
                            type="text"
                            isRequired={true}
                            placeholder={user.data.user["email-address"]}
                        />
                        <FormAction handleSubmit={handleSave} text="Save" type="Button" action="submit" isFetching={false} />
                    </form>
                </div> :
                ""}
        </>
    )
}