import React from 'react';

import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Login from "./components/auth/Login";
import NewAccount from "./components/auth/NewAccount";
import Projects from "./components/projects/Projects";
import ProjectState from "./context/projects/projectState";
import TaskState from "./context/tasks/taskState";
import AlertsState from "./context/alerts/alertsState";
import AuthState from "./context/auth/authState";
import {AuthorizationToken} from "./config/tokenAuth";
import PrivateRoute from "./components/routes/PrivateRoute";

const token = localStorage.getItem('token');
if (token) {
    AuthorizationToken(token)
}

function App() {
    return (
        <ProjectState>
            <TaskState>
                <AlertsState>
                    <AuthState>
                        <Router>
                            <Switch>
                                <Route exact path='/' component={Login}/>
                                <Route exact path='/new-account' component={NewAccount}/>
                                <PrivateRoute exact path='/projects' component={Projects}/>
                            </Switch>
                        </Router>
                    </AuthState>
                </AlertsState>
            </TaskState>
        </ProjectState>
    );
}

export default App;
