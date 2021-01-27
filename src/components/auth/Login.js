import React, {useState, useContext, useEffect} from 'react';
import {Link} from "react-router-dom";
import AlertsContext from "../../context/alerts/alertsContext";
import AuthContext from "../../context/auth/authContext";


const Login = (props) => {
    const alertsContext = useContext(AlertsContext);
    const {alert, showAlert} = alertsContext;

    const authContext = useContext(AuthContext);
    const {loginUser, authenticated, msg} = authContext;

    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    useEffect(() => {
        if (authenticated)
            props.history.push('/projects');
        if (msg)
            showAlert(msg.msg, msg.category)
    }, [msg, authenticated, props.history]);


    const {email, password} = user;

    const onChangeLogin = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (email.trim() === '' || password.trim() === '') {
            showAlert('All fields are required', 'alerta-error');
            return;
        }
        loginUser({email, password})
    };

    return (
        <div className="form-usuario">
            {alert ?
                (<div className={`alerta ${alert.category}`}>
                    {alert.msg}
                </div>) : null}
            <div className="contenedor-form sombra-dark">
                <h1>User Login</h1>
                <form action="" onSubmit={onSubmit}>
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input type="email" id='email' name='email' value={email} placeholder={'Your email'}
                               onChange={onChangeLogin}/>
                    </div>
                    <div className="campo-form">
                        <label htmlFor="password">Password</label>
                        <input type="password" id='password' value={password} name='password'
                               placeholder={'Your password'}
                               onChange={onChangeLogin}/>
                    </div>
                    <div className="campo-form">
                        <input type="submit" className='btn btn-primario btn-block' value='Login'/>
                    </div>
                </form>
                <Link to={'/new-account'} className={'enlace-cuenta'}>Create new account</Link>
            </div>
        </div>
    );
};

export default Login;