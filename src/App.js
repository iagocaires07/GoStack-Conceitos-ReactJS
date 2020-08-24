import React, {useState, useEffect} from 'react';

import api from './services/api';
import Header from './components/Header';

function App(){
    const [projects, setProjects] = useState([]);

    useEffect(() =>{
        api.get('projects').then(response => {
            setProjects(...projects, response.data);
        })
    }, []);

    async function handleAddProject(){
        // setProjects([...projects, `Novo Projeto ${Date.now()}`]);
        const response = await api.post('projects', {
            title: `Novo Projeto ${Date.now()}`,
            owner: "Iago Caires"
        });

        const project = response.data;

        setProjects([...projects, project]);
    }

    return(
        <>  
            <Header title="Homepage" />
            <ul>
                {
                    projects.map(project => <li key={project.id}>{project.title}</li>)
                }
            </ul>

            <button type="button" onClick={handleAddProject} >Adcionar projeto</button>
        </>
    );
}

export default App;