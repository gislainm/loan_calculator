interface UserIput {
    labelText?: string,
    labelFor?: string,
    id: string,
    name?: string,
    type?: string,
    autoComplete?: string,
    isRequired?: boolean,
    placeholder?: string
}

const loginFields: UserIput[] = [
    {
        labelText: "Email address",
        labelFor: "email-address",
        id: "email-address",
        name: "email",
        type: "email",
        autoComplete: "email",
        isRequired: true,
        placeholder: "Email address"
    },
    {
        labelText: "Password",
        labelFor: "password",
        id: "password",
        name: "password",
        type: "password",
        autoComplete: "current-password",
        isRequired: true,
        placeholder: "Password"
    }
]

const signupFields: UserIput[] = [
    {
        labelText: "Firstname",
        labelFor: "Firstname",
        id: "Firstname",
        name: "Firstname",
        type: "text",
        autoComplete: "fFrstname",
        isRequired: true,
        placeholder: "Firstname"
    }, {
        labelText: "Lastname",
        labelFor: "Lastname",
        id: "Lastname",
        name: "Lastname",
        type: "text",
        autoComplete: "Lastname",
        isRequired: true,
        placeholder: "Lastname"
    }
    ,
    {
        labelText: "Email address",
        labelFor: "email-address",
        id: "email-address",
        name: "email",
        type: "email",
        autoComplete: "email",
        isRequired: true,
        placeholder: "Email address"
    },
    {
        labelText: "Password",
        labelFor: "password",
        id: "password",
        name: "password",
        type: "password",
        autoComplete: "current-password",
        isRequired: true,
        placeholder: "Password"
    },
    {
        labelText: "Confirm Password",
        labelFor: "confirm-password",
        id: "confirm-password",
        name: "confirm-password",
        type: "password",
        autoComplete: "confirm-password",
        isRequired: true,
        placeholder: "Confirm Password"
    }
]


export { loginFields, signupFields }