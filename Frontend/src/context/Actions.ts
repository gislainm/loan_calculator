export const LoginStart = (userCredentials: any) => ({
    type: "LOGIN_START",
});

export const LoginSuccess = (user: any) => ({
    type: "LOGIN_SUCCESS",
    payload: user,
});

export const LoginFailure = () => ({
    type: "LOGIN_FAILURE",
});

export const UpdateUser = (user: any) => ({
    type: "UPDATE_USER",
    payload: user,
});