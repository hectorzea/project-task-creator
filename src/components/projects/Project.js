import React, {useContext} from 'react';
import projectContext from "../../context/projects/projectContext";
import TaskContext from "../../context/tasks/taskContext";

const Project = ({project}) => {
    const projectsContext = useContext(projectContext);
    const {
        goToProject,
    } = projectsContext;

    const taskContext = useContext(TaskContext);
    const {
        getProjectTasks
    } = taskContext;

    const selectProject = projectId => {
//        project(projectId);
        getProjectTasks(projectId);
        goToProject(projectId)
    };

    return (
        <li>
            <button className='btn btn-blank' onClick={() => {
                selectProject(project._id)
            }}>{project.name}
            </button>
        </li>
    );
};

export default Project;