import axiosClient from "./axios";

export const AuthorizationToken = token => {
    if (token) {
        axiosClient.defaults.headers.common['x-auth-token'] = token;
    } else {
        delete axiosClient.defaults.headers.common['x-auth-token'];
    }
};