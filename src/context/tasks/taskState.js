import {useReducer} from 'react';
import TaskContext from "./taskContext";
import TaskReducer from "./taskReducer";
import {
    ACTUAL_TASK,
    ADD_TASK,
    CLEAN_SELECTED_TASK,
    DELETE_TASK,
    PROJECT_TASKS,
    UPDATE_TASK,
    VALIDATE_TASK
} from "../../types";
import axiosClient from "../../config/axios";

const TaskState = props => {
    const initialState = {
        projectTasks: [],
        taskError: false,
        selectedTask: null
    };

    const [state, dispatch] = useReducer(TaskReducer, initialState);

    const getProjectTasks = async project => {
        try {
            const result = await axiosClient.get(`/api/tasks`, {params: {project}});
            dispatch({
                type: PROJECT_TASKS,
                payload: result.data.tasks
            })
        } catch (e) {
            console.log(e);
        }
    };

    const addTask = async task => {
        try {
            const result = await axiosClient.post('/api/tasks', task);
            console.log(result);
            dispatch({
                type: ADD_TASK,
                payload: task
            })
        } catch (e) {

        }
    };

    const validateTask = (task) => {
        dispatch({
            type: VALIDATE_TASK
        })
    };

    const deleteTask = async (taskId, project) => {
        try {
            await axiosClient.delete(`/api/tasks/${taskId}`, {params: {project}});
            dispatch({
                type: DELETE_TASK,
                payload: taskId
            })
        } catch (e) {
            console.log(e);
        }
    };
    //
    const updateTask = async task => {
        console.log(task);
        try {
            const result = await axiosClient.put(`/api/tasks/${task._id}`, task);
            dispatch({
                type: UPDATE_TASK,
                payload: result.data.task
            })
        } catch (e) {

        }
    };


    const setSelectedTask = task => {
        dispatch({
            type: ACTUAL_TASK,
            payload: task
        })
    };
    const cleanSelectedTask = () => {
        dispatch({
            type: CLEAN_SELECTED_TASK,
        })
    };

    return (
        <TaskContext.Provider value={{
            projectTasks: state.projectTasks,
            taskError: state.taskError,
            selectedTask: state.selectedTask,
            setSelectedTask,
            deleteTask,
            getProjectTasks,
            validateTask,
            addTask,
            cleanSelectedTask,
            updateTask
        }}>
            {props.children}
        </TaskContext.Provider>
    )

};

export default TaskState;
