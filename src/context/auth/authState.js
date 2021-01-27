import React, {useReducer} from 'react';
import AuthContext from "./authContext";
import AuthReducer from "./authReducer";
import {
    REGISTER_SUCCESS,
    REGISTER_ERROR,
    GET_USER,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOGOUT
} from "../../types";
import axiosClient from "../../config/axios";
import {AuthorizationToken} from "../../config/tokenAuth";

const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        authenticated: null,
        user: null,
        msg: null,
        loading:true
    };
    const [state, dispatch] = useReducer(AuthReducer, initialState);

    const registerUser = async (data) => {
        try {
            const response = await axiosClient.post('/api/users', data);
            dispatch({
                type: REGISTER_SUCCESS,
                payload: response.data
            });
            await getUser();
        } catch (e) {
            const alert = {
                msg: e.response.data.msg,
                category: 'alerta-error'
            };
            dispatch({
                type: REGISTER_ERROR,
                payload: alert
            })
        }
    };

    const loginUser = async data => {
        try {
            const response = await axiosClient.post('/api/auth', data);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: response.data
            });
            await getUser();
        } catch (e) {
            const alert = {
                msg: e.response.data.msg,
                category: 'alerta-error'
            };
            dispatch({
                type: LOGIN_ERROR,
                payload: alert
            })
        }
    };

    const getUser = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            AuthorizationToken(token);
        }
        try {
            const response = await axiosClient('/api/auth');
            dispatch({
                type: GET_USER,
                payload: response.data.user
            })
        } catch (e) {
            dispatch({
                type: LOGIN_ERROR,
            })
        }
    };

    const logout = () => {
        dispatch({
            type: LOGOUT
        })
    };

    return (
        <AuthContext.Provider value={{
            token: state.token,
            authenticated: state.authenticated,
            user: state.user,
            msg: state.msg,
            loading: state.loading,
            registerUser,
            loginUser,
            getUser,
            logout,

        }}>
            {props.children}
        </AuthContext.Provider>
    )

};
export default AuthState;