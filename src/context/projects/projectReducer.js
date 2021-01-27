import {
    FORM_PROJECT,
    GET_PROJECTS,
    CREATE_PROJECT,
    VALIDATE_FORM,
    ACTUAL_PROJECT,
    DELETE_PROJECT,
    PROJECT_ERROR
} from "../../types";

export default (state, action) => {
    switch (action.type) {
        case FORM_PROJECT:
            return {
                ...state,
                formProject: true
            };
        case GET_PROJECTS:
            return {
                ...state,
                projects: action.payload
            };
        case CREATE_PROJECT:
            return {
                ...state,
                projects: [...state.projects, action.payload],
                formProject: false,
                errorForm: false
            };
        case VALIDATE_FORM:
            return {
                ...state,
                errorForm: true
            };
        case ACTUAL_PROJECT:
            return {
                ...state,
                project: state.projects.filter(p => p._id === action.payload)
            };
        case DELETE_PROJECT:
            return {
                ...state,
                projects: state.projects.filter(p => p._id !== action.payload),
                project: null
            };
        case PROJECT_ERROR:
            return {
                ...state,
                dialogMessage: action.payload
            };
        default:
            return state;
    }
}