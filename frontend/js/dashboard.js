// get stored data

let name = localStorage.getItem("studentName");
if(name){
document.getElementById("userName").innerText = name;
}
let course = localStorage.getItem("course");

if(name){
document.getElementById("profileName").innerText = name;
}

if(course){
document.getElementById("profileCourse").innerText =
"Course: " + course;
}

// show welcome message

if(name){
document.getElementById("welcomeText").innerText =
"Welcome " + name;
}

// show enrolled course

let section = document.getElementById("courseSection");

if(course){

section.innerHTML += `
<div class="card glassmorphism">
<h3>${course}</h3>
<p>Enrolled Course</p>
</div>
`;

document.getElementById("courseCount").innerText = 1;

}

/* resources data */

const resourcesData={

"Machine Learning":{
video:"https://www.youtube.com/watch?v=GwIo3gDZCVQ",
notes:"../assets/ml-notes.pdf",
practice:"https://leetcode.com/problemset/"
},

"Deep Learning":{
video:"https://www.youtube.com/watch?v=aircAruvnKk",
notes:"../assets/dl-notes.pdf",
practice:"https://www.kaggle.com/learn"
},

"Data Analysis":{
video:"https://www.youtube.com/watch?v=ua-CiDNNj30",
notes:"../assets/ds-notes.pdf",
practice:"https://www.kaggle.com/learn"
},

"Big Data":{
video:"https://www.youtube.com/watch?v=9s-vSeWej1U",
notes:"../assets/bigdata-notes.pdf",
practice:"https://www.hackerrank.com/domains/data-science"
},

"Digital Electronics":{
video:"https://www.youtube.com/watch?v=Y1kYFgGJbSM",
notes:"../assets/ece-notes.pdf",
practice:"https://www.allaboutcircuits.com/"
},

"Communication Systems":{
video:"https://www.youtube.com/watch?v=ybEVx7bYUYY",
notes:"../assets/comm-notes.pdf",
practice:"https://www.electronics-tutorials.ws/"
},

"Ethical Hacking":{
video:"https://www.youtube.com/watch?v=cKEf8H9cQGM&list=PLwO5-rumi8A4J7h4Fm92TEC00gfZUk7ls",
notes:"../assets/eth-notes.pdf",
practice:"https://www.w3schools.com/cybersecurity/"
},

"Network Security":{
video:"https://www.youtube.com/watch?v=zIWGjkr0ENE",
notes:"../assets/networksecurity-notes.pdf",
practice:"https://www.geeksforgeeks.org/ethical-hacking/network-security-best-practices/"
},

"Structural Analysis":{
video:"https://www.youtube.com/watch?v=Gv7t_OVxf-Q",
notes:"../assets/structuralanalysis-notes.pdf",
practice:"https://www.youtube.com/watch?v=nPlYcsrLFjo"
},

"Construction Management":{
video:"https://www.youtube.com/watch?v=G1P7W119x1w&list=PLm_MSClsnwm8ZfOLmf8XJqE3rVe8BByzl",
notes:"../assets/cm-notes.pdf",
practice:"https://www.youtube.com/watch?v=wFGouP9ubcg"
}

};

let resourceContainer=document.getElementById("resources");

let data=resourcesData[course];

if(data){

resourceContainer.innerHTML=`

<div class="card glassmorphism">
<h3>🎥 Video</h3>
<a href="${data.video}" target="_blank">Watch</a>
</div>

<div class="card glassmorphism">
<h3>📄 Notes</h3>
<a href="${data.notes}" target="_blank" onclick="saveDownload('${data.notes}')">Download</a>
</div>

<div class="card glassmorphism">
<h3>💻 Practice</h3>
<a href="${data.practice}" target="_blank">Solve</a>
</div>

`;

}

/* Save downloads */

function saveDownload(file){

let downloads = JSON.parse(localStorage.getItem("downloads")) || [];

downloads.push(file);

localStorage.setItem("downloads", JSON.stringify(downloads));

showDownloads();

}

/* Show downloads */

function showDownloads(){

let list = JSON.parse(localStorage.getItem("downloads")) || [];

let container = document.getElementById("downloads");

container.innerHTML="";

list.forEach(file => {

container.innerHTML += `<p>${file}</p>`;

});

}

showDownloads();

/* Sidebar Navigation */

function showSection(section){

document.querySelectorAll(".section").forEach(sec=>{
sec.style.display="none";
});

if(section==="dashboard"){
document.getElementById("dashboardSection").style.display="flex";
}

if(section==="courses"){
document.getElementById("courseSection").style.display="block";
}

if(section==="resources"){
document.getElementById("resourceSection").style.display="block";
}

if(section==="downloads"){
document.getElementById("downloadsSection").style.display="block";
}

}

/* Default section */

showSection("dashboard");