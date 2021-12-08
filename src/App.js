import { useEffect, useState } from "react";

import { db } from "./firebase";
import { login, logout } from "./firebase/actions";
import { addProject, deleteProject, loadProjects } from "./firebase/dbActions";

import "./App.css";

function App() {
  const initialState = {
    name: "",
    technology: "",
  };
  const [user, setUser] = useState(null);
  const [project, setProject] = useState(initialState);
  const [projectList, setProjectList] = useState([]);

  function handleLogin() {
    login().then((data) => setUser(data));
  }

  function handleLogout() {
    setUser(null);
    logout();
  }

  function handleName(event) {
    setProject({
      name: event.target.value,
      technology: project.technology,
    });
  }

  function handleTechnology(event) {
    setProject({
      name: project.name,
      technology: event.target.value,
    });
  }

  function handleAddProject(projectData) {
    addProject(projectData);
    setProject(initialState);
  }

  function handleDeleteProject(projectId) {
    deleteProject(projectId);
  }

  useEffect(() => {
    // suscription to Firebase Database (to checking changes)
    db.collection("projects").onSnapshot((results) => {
      const projects = [];
      results.forEach((project) => {
        projects.push({ id: project.id, ...project.data() });
      });
      setProjectList(projects);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {user && (
          <>
            <img src={user.picture} className="App-logo" alt="profile" />
            <h1>{user.name}</h1>
            <a className="App-link" href="https://reactjs.org">
              {user.email}
            </a>

            <div className="project--form">
              <div>
                <input
                  type="text"
                  id="project-name"
                  placeholder="Project Name"
                  value={project.name}
                  onChange={handleName}
                />
              </div>
              <div>
                <input
                  type="text"
                  id="project-tech"
                  placeholder="Technology"
                  value={project.technology}
                  onChange={handleTechnology}
                />
              </div>
              <div>
                <button type="button" onClick={() => handleAddProject(project)}>
                  Add project
                </button>
              </div>
            </div>

            <h3>{projectList?.length} proyectos</h3>

            <div className="project">
              {projectList?.length > 0 &&
                projectList?.map((item) => (
                  <div
                    className="project--card"
                    key={item.id}
                    onClick={() => handleDeleteProject(item.id)}
                  >
                    <h3>{item.name}</h3>
                    <h5>{item.technology}</h5>
                  </div>
                ))}
            </div>
          </>
        )}

        {!user ? (
          <button type="button" onClick={() => handleLogin()}>
            Login
          </button>
        ) : (
          <button type="button" onClick={() => handleLogout()}>
            LogOut
          </button>
        )}
      </header>
    </div>
  );
}

export default App;
