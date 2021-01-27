import React, {Fragment, useState, useContext} from 'react';
import projectContext from "../../context/projects/projectContext";

const NewProject = () => {

    const projectsContext = useContext(projectContext);
    const {
        formProject, showProjectForm, createProject, errorForm,
        validateForm
    } = projectsContext;

    const [project, setProject] = useState({
        name: ''
    });

    const onChangeProject = (e) => {
        setProject({
            ...project,
            [e.target.name]: e.target.value
        })
    };

    const onSubmitProject = (e) => {
        e.preventDefault();
        if (name === '') {
            validateForm(true);
            return;
        }
        createProject(project)
        setProject({
            name: ''
        });
    };

    const {name} = project;

    return (
        <Fragment>
            <button className='btn btn-block btn-primario' type={'button'} onClick={() => {
                showProjectForm()
            }}>
                New Project
            </button>
            {
                formProject ? (<form className={'formulario-nuevo-proyecto'} action="" onSubmit={onSubmitProject}>
                    <input type="text" className={'input-text'} placeholder={'Project name'} value={name} name={'name'}
                           onChange={onChangeProject}/>
                    <input type="submit" className={'btn btn-primario btn-block'} value={'Create Project'}/>
                </form>) : null}

            {errorForm ? <p className="mensaje error">The project name is mandatory</p> : null}
        </Fragment>
    );
};

export default NewProject;