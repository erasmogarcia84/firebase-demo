import { db } from "./index";

export async function addProject(project) {
  // example usind ADD
  // await db.collection("projects").add(project);

  // example usind SET
  await db.collection("projects").doc().set(project);
}

export async function loadProjects() {
  const projects = [];

  const response = await db.collection("projects").get();
  response.forEach((project) => {
    projects.push({ id: project.id, ...project.data() });
  });

  return projects;
}

export async function deleteProject(id) {
  await db.collection("projects").doc(id).delete();
}
