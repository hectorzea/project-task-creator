import React, {useReducer} from 'react';
import alertsContext from "./alertsContext";
import alertsReducer from "./alertsReducer";
import {HIDE_ALERT, SHOW_ALERT} from "../../types";

const AlertsState = props => {
    const initialState = {
        alert: null
    };
    const [state, dispatch] = useReducer(alertsReducer, initialState);
    const showAlert = (msg, category) => {
        dispatch({
            type: SHOW_ALERT,
            payload: {
                msg,
                category
            }
        });

        setTimeout(() => {
            dispatch({
                type: HIDE_ALERT,
            })
        }, 5000)

    };
    return (
        <alertsContext.Provider value={{alert: state.alert, showAlert}}>
            {props.children}
        </alertsContext.Provider>
    )
};

export default AlertsState;