import { useState, ChangeEvent } from "react";
import { signupFields } from "../constants/formFields";
import Input from "./Input";
import FormAction from "./FormAction";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:8080/sloanBuddy";
const fields = signupFields;
let fieldsState: any = {};
fields.forEach((field) => fieldsState[field.id] = "");

export default function Signup(): JSX.Element {
    const [signupState, setSignupState] = useState(fieldsState);
    const [validationMsg, setValidationMsg] = useState("");
    const navigate = useNavigate();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => setSignupState({ ...signupState, [e.target.id]: e.target.value });

    const handleSubmit = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        createAccount()
    }
    const createAccount = async () => {
        if (!signupState.Firstname || !signupState.Lastname || !signupState["email-address"] || !signupState.password) {
            setValidationMsg("All input fields are required");
        } else if (signupState.password !== signupState["confirm-password"]) {
            setValidationMsg("Your password has to match");
        } else {
            try {
                setValidationMsg("");
                await axios.post("/signup", signupState);
                navigate("/login");
            } catch (error: any) {
                setValidationMsg(error.response.data.message);
            }
        }
    }
    return (
        <form className="mt-8 space-y-6">
            <div className="">
                {
                    fields.map(field =>
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={signupState[field.id]}
                            labelText={field.labelText}
                            labelFor={field.labelFor}
                            id={field.id}
                            name={field.name}
                            type={field.type}
                            isRequired={field.isRequired}
                            placeholder={field.placeholder}
                        />

                    )
                }
                <div className="text-center m-0 text-red-600 font-bold font-sans text-sm">{validationMsg}</div>

                <FormAction handleSubmit={handleSubmit} text="Signup" type="Button" action="submit" isFetching={false} />
            </div>



        </form>
    )
}