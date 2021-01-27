import React, {Fragment, useContext} from 'react';
import Task from "./Task";
import projectContext from "../../context/projects/projectContext";
import TaskContext from "../../context/tasks/taskContext";
import {TransitionGroup, CSSTransition} from "react-transition-group";

const TaskList = () => {
    const projectsContext = useContext(projectContext);
    const {
        project, deleteProject
    } = projectsContext;

    const taskContext = useContext(TaskContext);
    const {
        projectTasks
    } = taskContext;


    if (!project) return <h2>Select a project</h2>;

    const [selectedProject] = project;
        //
    return (
        <Fragment>
            <h2>
                {selectedProject.name}
            </h2>
            <ul className="listado-tareas">
                {projectTasks.length === 0
                    ? (<li className="tarea"><p>No tasks</p></li>)
                    :<TransitionGroup>
                        {projectTasks.map(t => (<CSSTransition key={t._id} timeout={200} classNames={'tarea'}>
                            <Task task={t}/>
                        </CSSTransition>))}
                    </TransitionGroup>

                }
            </ul>
            <button type='button' onClick={() => {
                deleteProject(selectedProject._id)
            }} className='btn btn-primario'> Delete Project
            </button>
        </Fragment>
    );
};

export default TaskList;