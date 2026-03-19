const API = "http://localhost:5000/api";
function login() {
  fetch(API + "/auth/login", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      email: email.value,
      password: password.value
    })
  })
  .then(res => res.json())
  .then(data => {
    localStorage.setItem("user", JSON.stringify(data));
    window.location = "dashboard.html";
  });
}

function getProjects() {
  fetch(API + "/projects")
  .then(res => res.json())
  .then(data => {
    projects.innerHTML = data.map(p =>
      `<div onclick="openProject('${p._id}')">${p.name}</div>`
    ).join("");
  });
}

function openProject(id) {
  localStorage.setItem("project_id", id);
  window.location = "project.html";
}

function addTask() {
  fetch(API + "/tasks", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      title: taskTitle.value,
      project_id: localStorage.getItem("project_id")
    })
  }).then(() => alert("Task added"));
}