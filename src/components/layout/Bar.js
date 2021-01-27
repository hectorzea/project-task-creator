import React, {useEffect, useContext} from 'react';
import AuthContext from "../../context/auth/authContext";

const Bar = () => {
    const authContext = useContext(AuthContext);
    const {getUser, user, logout} = authContext;

    useEffect(() => {
        getUser();
    }, []);

    const onLogout = () => {
        logout();
    };


    return (
        <header className="app-header">
            {user ? <p className="nombre-usuario">
                Hi! <span>{user.username}</span>
            </p> : null}

            <nav className="nav-principal">
                <button className={'btn btn-blank cerrar-sesion'} onClick={onLogout}>
                    Cerrar Sesion
                </button>
            </nav>
        </header>
    );
};

export default Bar;