import React, {useState, useContext, useEffect} from 'react';
import {Link} from "react-router-dom";
import AlertsContext from "../../context/alerts/alertsContext";
import AuthContext from "../../context/auth/authContext";

const NewAccount = (props) => {
    const [user, setUser] = useState({
        email: '',
        password: '',
        username: '',
        confirmPassword: '',
    });

    const alertsContext = useContext(AlertsContext);
    const {alert, showAlert} = alertsContext;

    const authContext = useContext(AuthContext);
    const {registerUser, authenticated, msg} = authContext;

    const {username, email, password, confirmPassword} = user;

    useEffect(() => {
        if (authenticated)
            props.history.push('/projects');
        if (msg)
            showAlert(msg.msg, msg.category)

    }, [msg, authenticated, props.history]);

    const onChangeLogin = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (username.trim() === '' || email.trim() === '' || password.trim() === '' || confirmPassword.trim() === '') {
            showAlert('All fields are required', 'alerta-error');
            return;
        }
        if (password.length < 6) {
            showAlert('Password must have at least 6 characters', 'alerta-error');
            return;
        }
        if (password !== confirmPassword) {
            showAlert('Passwords are not equals', 'alerta-error');
            return;
        }
        registerUser({
            username, email, password
        })
    };

    return (
        <div className="form-usuario">
            {alert ?
                (<div className={`alerta ${alert.category}`}>
                    {alert.msg}
                </div>) : null}
            <div className="contenedor-form sombra-dark">
                <h1>Create Account</h1>
                <form action="" onSubmit={onSubmit}>
                    <div className="campo-form">
                        <label htmlFor="username">Username</label>
                        <input type="text" id='username' name='username' value={username} placeholder={'Your username'}
                               onChange={onChangeLogin}/>
                    </div>
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input type="email" id='email' name='email' value={email} placeholder={'Your email'}
                               onChange={onChangeLogin}/>
                    </div>
                    <div className="campo-form">
                        <label htmlFor="password">Password</label>
                        <input type="password" id='password' name='password' value={password}
                               placeholder={'Your password'}
                               onChange={onChangeLogin}/>
                    </div>
                    <div className="campo-form">
                        <label htmlFor="confirmPassword">Repeat password</label>
                        <input type="password" id='confirmPassword' name='confirmPassword' value={confirmPassword}
                               placeholder={'Repeat your password'}
                               onChange={onChangeLogin}/>
                    </div>
                    <div className="campo-form">
                        <input type="submit" className='btn btn-primario btn-block' value='Register'/>
                    </div>
                </form>
                <Link to={'/'} className={'enlace-cuenta'}>Go to login</Link>
            </div>
        </div>
    );
};

export default NewAccount;