import { useState, ChangeEvent, useContext } from "react";
import { loginFields } from "../constants/formFields";
import Input from "./Input";
import FormAction from "./FormAction";
import { Context } from "../context/Context";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = "http://localhost:8080/sloanBuddy";
const fields = loginFields;
let fieldsState: any = {};
fields.forEach((field) => fieldsState[field.id] = "");

export default function Login(): JSX.Element {
    const [loginState, setLoginState] = useState(fieldsState);
    const [validationMsg, setValidationMsg] = useState("");
    const { dispatch, isFetching } = useContext(Context);
    const navigate = useNavigate();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLoginState({ ...loginState, [e.target.id]: e.target.value });
    };

    const handleSubmit = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        authenticateUser();
    }
    const authenticateUser = async () => {
        if (!loginState["email-address"] || !loginState.password) {
            setValidationMsg("All input fields are required");
        } else if (loginState["email-address"] === "admin@buddy.com" && loginState.password === "12345") {
            navigate(`/admin/users`);
            localStorage.setItem("role", "admin")
        } else {
            setValidationMsg("");
            dispatch({ type: "LOGIN_START" });
            try {
                const response = await axios.post("/login", { email: loginState["email-address"], password: loginState.password });
                dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
                navigate(`/home/${response.data.data.user.Firstname}`);
            } catch (error) {
                dispatch({ type: "LOGIN_FAILURE" });
                setValidationMsg("Something went wrong.try again");
            }
        }
    }

    return (
        <form className="mt-8 space-y-6">
            <div className="-space-y-px">
                {
                    fields.map(field =>
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={loginState[field.id]}
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
            </div>
            <div className="text-center m-0 text-red-600 font-bold font-sans text-sm">{validationMsg}</div>
            <FormAction handleSubmit={handleSubmit} text="Login" type="Button" action="submit" isFetching={isFetching} />
        </form>
    )
}