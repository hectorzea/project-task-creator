import React, {useContext, useEffect} from 'react';
import Project from "./Project";
import projectContext from "../../context/projects/projectContext";
import {TransitionGroup, CSSTransition} from "react-transition-group";
import AlertsContext from "../../context/alerts/alertsContext";

const ProjectList = () => {
    const projectsContext = useContext(projectContext);
    const {dialogMessage, projects, getProjects} = projectsContext;

    const alertsContext = useContext(AlertsContext);
    const {alert, showAlert} = alertsContext;

    useEffect(() => {
        if (dialogMessage) {
            showAlert(dialogMessage.msg, dialogMessage.category);
        }
        getProjects();
    }, [dialogMessage]);
    if (projects.length === 0) return <p>No projects, maybe create one? =)</p>;


    return (
        <ul className="listado-proyectos">
            {alert ? (<div className={`alerta ${alert.category}`}>{alert.msg}</div>) : null}
            <TransitionGroup>
                {projects.map(p => (
                    <CSSTransition key={p._id} timeout={300} classNames={'proyecto'}>
                        <Project project={p}/>
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </ul>
    );
};

export default ProjectList;