import React, {useContext, useState, useEffect} from 'react';
import projectContext from "../../context/projects/projectContext";
import TaskContext from "../../context/tasks/taskContext";

const TaskForm = () => {
    const projectsContext = useContext(projectContext);
    const {
        project
    } = projectsContext;

    const taskContext = useContext(TaskContext);
    const {
        selectedTask, addTask, validateTask, taskError, getProjectTasks, updateTask, cleanSelectedTask
    } = taskContext;

    useEffect(() => {
        if (selectedTask !== null) {
            saveTask(selectedTask)
        } else {
            saveTask({
                name: ''
            })
        }
    }, [selectedTask]);


    const [task, saveTask] = useState({
        name: ''
    });

    const {name} = task;

    const handleChange = (e) => {
        saveTask({
            ...task,
            [e.target.name]: e.target.value
        })
    };

    if (!project) return null;

    const [selectedProject] = project;

    const onSubmit = (e) => {
        e.preventDefault();
        if (name.trim() === '') {
            validateTask();
            return;
        }

        if (selectedTask === null) {
            task.project = selectedProject._id;
            addTask(task);
        }else{
            updateTask(task);
            cleanSelectedTask();
        }


        getProjectTasks(selectedProject._id);
        saveTask({name: ''});
    };


    return (
        <div className="formulario">
            <form action="" onSubmit={onSubmit}>
                <div className="contenedor-input">
                    <input type="text" className='input-text' placeholder='task name' value={name} name='name'
                           onChange={handleChange}/>
                </div>
                <div className="contenedor-input">
                    <input type="submit" className='btn btn-primario btn-submit btn-block'
                           value={selectedTask ? 'Edit Task' : 'Add Task'}/>
                </div>
            </form>
            {taskError ? <p className="mensaje error">The name of the task is mandatory</p> : null}
        </div>
    );
};

export default TaskForm;