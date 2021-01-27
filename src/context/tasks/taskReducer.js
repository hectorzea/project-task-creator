import {
    ACTUAL_TASK,
    ADD_TASK,
    CLEAN_SELECTED_TASK,
    DELETE_TASK,
    PROJECT_TASKS,
    UPDATE_TASK,
    VALIDATE_TASK
} from "../../types";

export default (state, action) => {
    switch (action.type) {
        case PROJECT_TASKS:
            return {
                ...state,
                projectTasks: action.payload
            };
        case ADD_TASK:
            return {
                ...state,
                projectTasks: [...state.projectTasks, action.payload],
                taskError: false
            };
        case VALIDATE_TASK:
            return {
                ...state,
                taskError: true
            };
        case DELETE_TASK:
            return {
                ...state,
                projectTasks: state.projectTasks.filter(e => e._id !== action.payload)
            };
        case UPDATE_TASK:
            return {
                ...state,
                projectTasks: state.projectTasks.map(t => t._id === action.payload._id ? action.payload : t)
            };
        case ACTUAL_TASK:
            return {
                ...state,
                selectedTask: action.payload
            };
        case CLEAN_SELECTED_TASK: {
            return {...state, selectedTask: null}
        }
        default:
            return state;
    }
}