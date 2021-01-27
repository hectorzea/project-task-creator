import React, {useReducer} from 'react';
import {v4 as uuidv4} from 'uuid';
import projectReducer from "./projectReducer";
import projectContext from "./projectContext";
import {
    FORM_PROJECT,
    GET_PROJECTS,
    CREATE_PROJECT,
    VALIDATE_FORM,
    ACTUAL_PROJECT,
    DELETE_PROJECT,
    PROJECT_ERROR
} from "../../types";
import axiosClient from "../../config/axios";

const ProjectState = props => {

    const initialState = {
        formProject: false,
        projects: [],
        errorForm: false,
        project: null,
        dialogMessage: null
    };

    //dispatch to execute actions
    const [state, dispatch] = useReducer(projectReducer, initialState);

    const showProjectForm = () => {
        dispatch({
            type: FORM_PROJECT
        })
    };

    const getProjects = async () => {
        try {
            const result = await axiosClient.get('/api/projects');
            dispatch({
                type: GET_PROJECTS,
                payload: result.data
            })
        } catch (e) {
            console.log(e);
        }
    };

    const createProject = async project => {
        try {
            const result = await axiosClient.post(`/api/projects`, project);
            dispatch({
                type: CREATE_PROJECT,
                payload: result.data
            })
        } catch (e) {
            console.log(e);
            const alert = {
                msg: 'There was an error',
                category: 'alerta-error'
            };
            dispatch({
                type: PROJECT_ERROR,
                payload: alert
            })
        }
    };

    const validateForm = () => {
        dispatch({
            type: VALIDATE_FORM,

        })
    };

    const goToProject = projectId => {
        dispatch({
            type: ACTUAL_PROJECT,
            payload: projectId
        })
    };

    const deleteProject = async projectId => {
        try {
            await axiosClient.delete(`/api/projects/${projectId}`);
            dispatch({
                type: DELETE_PROJECT,
                payload: projectId
            })
        } catch (e) {
            console.log(e);
            const alert = {
                msg: 'There was an error',
                category: 'alerta-error'
            };
            dispatch({
                type: PROJECT_ERROR,
                payload: alert
            })
        }
    };

    return (
        <projectContext.Provider
            value={{
                formProject: state.formProject,
                projects: state.projects,
                errorForm: state.errorForm,
                project: state.project,
                dialogMessage: state.dialogMessage,
                showProjectForm,
                getProjects,
                createProject,
                validateForm,
                goToProject,
                deleteProject
            }}>
            {props.children}
        </projectContext.Provider>
    )

};

export default ProjectState;

