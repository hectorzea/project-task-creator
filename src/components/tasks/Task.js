import React, {useContext} from 'react';
import TaskContext from "../../context/tasks/taskContext";
import projectContext from "../../context/projects/projectContext";

const Task = ({task}) => {

    const taskContext = useContext(TaskContext);
    const {
        deleteTask, getProjectTasks,updateTask, setSelectedTask
    } = taskContext;

    const projectsContext = useContext(projectContext);
    const {
        project
    } = projectsContext;

    const [actualProject] = project;

    const changeStatus = (task) => {
        task.state = !task.state;
        updateTask(task);
    };

    return (
        <li className="tarea sombra">
            <p>{task.name}</p>
            <div className="estado">
                {task.state
                    ? (<button type='submit' className='completo' onClick={() => {
                        changeStatus(task)
                    }}> Complete </button>)
                    : (<button type='submit' className='incompleto' onClick={() => {
                        changeStatus(task)
                    }}> Incomplete </button>)
                }
            </div>
            <div className="acciones">
                <button onClick={() => {
                    setSelectedTask(task)
                }} type='button' className='btn btn-primario'>Edit

                </button>
                <button type='button' className='btn btn-secundario' onClick={(e) => {
                    deleteTask(task._id, actualProject._id);
                    getProjectTasks(actualProject._id);
                }}>
                    Delete
                </button>
            </div>
        </li>
    );
};

export default Task;