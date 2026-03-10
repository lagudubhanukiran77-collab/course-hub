function goToCourses(branch){

localStorage.setItem("branch",branch)

window.location.href="courses.html"

}


const data={

aiml:[
{
name:"Machine Learning",
desc:"Machine learning helps computers learn patterns from data and make predictions.",
syl:"Regression, Classification, Decision Trees"
},
{
name:"Deep Learning",
desc:"Deep learning uses neural networks for complex AI tasks.",
syl:"CNN, RNN, TensorFlow"
}
],

ds:[
{
name:"Data Analysis",
desc:"Analyzing datasets to find useful insights.",
syl:"Python, Pandas, Visualization"
},
{
name:"Big Data",
desc:"Learn how to process and analyze massive datasets.",
syl:"Hadoop, Spark, Distributed Computing"
}
],

ece:[
{
name:"Digital Electronics",
desc:"Study of digital circuits used in computers.",
syl:"Logic gates, Flip flops"
},
{
name:"Communication Systems",
desc:"Learn how information is transmitted between devices.",
syl:"AM, FM, Modulation Techniques"
}
],

cyber:[
{
name:"Ethical Hacking",
desc:"Learn how to find and fix vulnerabilities in systems securely.",
syl:"Penetration Testing, Kali Linux, Vulnerability Scanning"
},
{
name:"Network Security",
desc:"Protect networks and data from unauthorized access and attacks.",
syl:"Firewalls, VPNs, Cryptography, Protocols"
}
],

civil:[
{
name:"Structural Analysis",
desc:"Study the effects of loads on physical structures and components.",
syl:"Beams, Trusses, Load Calculations, Mechanics"
},
{
name:"Construction Management",
desc:"Learn how to plan, coordinate, and build construction projects.",
syl:"Project Planning, Materials, Scheduling, Safety"
}
]

}


let selectedCourse=""

window.onload=function(){

let branch=localStorage.getItem("branch")

let container=document.getElementById("courses")

if(branch){
document.body.classList.add(branch + "-bg")
}

if(!container || !data[branch]) return

data[branch].forEach(course=>{

container.innerHTML+=`

<div class="course-card glassmorphism">

<h3>${course.name}</h3>

<button onclick="showDesc('${course.desc}')">Description</button>

<button onclick="showSyl('${course.syl}')">Syllabus</button>

<button onclick="openEnroll('${course.name}')">Enroll</button>

</div>

`

})

}


function showDesc(text){

document.getElementById("descText").innerText=text
document.getElementById("descPopup").style.display="block"

}

function closeDesc(){
document.getElementById("descPopup").style.display="none"
}


function showSyl(text){

document.getElementById("sylText").innerText=text
document.getElementById("sylPopup").style.display="block"

}

function closeSyl(){
document.getElementById("sylPopup").style.display="none"
}


function openEnroll(course){

selectedCourse=course

document.getElementById("enrollPopup").style.display="block"

}


function enroll(){

let name=document.querySelector('input[placeholder="Name"]').value
let email=document.querySelector('input[placeholder="Email"]').value
let reg=document.querySelector('input[placeholder="Register Number"]').value

if(name=="" || email=="" || reg==""){
alert("Please fill all fields")
return
}

if(selectedCourse==""){
alert("No course selected")
return
}

let namePattern=/^[A-Za-z ]+$/

if(!namePattern.test(name)){
alert("Name should contain only letters")
return
}

if(!email.endsWith("@gmail.com")){
alert("Email must be a Gmail address")
return
}

/* store student info locally */

localStorage.setItem("studentName",name)
localStorage.setItem("course",selectedCourse)

/* send data to backend */

fetch("http://localhost:3000/api/enroll",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
name:name,
email:email,
reg:reg,
course:selectedCourse,
branch:localStorage.getItem("branch")
})

})

.then(res=>res.text())
.then(data=>{
alert(data)

window.location.href="dashboard.html"
})
.catch(err=>{
console.log(err)
alert("Enrollment failed")
})

}

// CHATBOT LOGIC
function toggleChatbot() {
  const container = document.getElementById("chatbotContainer");
  if (container.style.display === "none" || container.style.display === "") {
    container.style.display = "flex";
  } else {
    container.style.display = "none";
  }
}

// Add event listener to the toggle button on load
document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("chatbotToggle");
  if(toggleBtn) {
    toggleBtn.addEventListener("click", toggleChatbot);
  }
});

function handleChatbotKeyPress(event) {
  if (event.key === "Enter") {
    sendMessage();
  }
}

function sendMessage() {
  const input = document.getElementById("chatbotInput");
  const message = input.value.trim();
  if (!message) return;

  addChatMessage(message, "user");
  input.value = "";

  // Process message and find course
  setTimeout(() => {
    const reply = getCourseSuggestion(message.toLowerCase());
    addChatMessage(reply, "bot");
  }, 500);
}

function addChatMessage(text, sender) {
  const messagesContainer = document.getElementById("chatbotMessages");
  const msgDiv = document.createElement("div");
  msgDiv.className = sender === "user" ? "user-message" : "bot-message";
  msgDiv.innerText = text;
  messagesContainer.appendChild(msgDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function getCourseSuggestion(text) {
  const keywords = {
    "python": "Data Analysis",
    "pandas": "Data Analysis",
    "data": "Data Analysis or Big Data",
    "big data": "Big Data",
    "hadoop": "Big Data",
    "machine learning": "Machine Learning",
    "ai": "Machine Learning or Deep Learning",
    "artificial intelligence": "Machine Learning",
    "neural": "Deep Learning",
    "electronics": "Digital Electronics",
    "circuits": "Digital Electronics",
    "communication": "Communication Systems",
    "signals": "Communication Systems",
    "cyber": "Ethical Hacking or Network Security",
    "security": "Network Security",
    "hack": "Ethical Hacking",
    "civil": "Structural Analysis or Construction Management",
    "construction": "Construction Management",
    "structures": "Structural Analysis",
    "web": "We don't currently have Web Development, but maybe check out Data Analysis!",
    "app": "We don't currently have App Development, but check out our AI courses."
  };

  let foundCourses = [];
  for (let key in keywords) {
    if (text.includes(key)) {
      foundCourses.push(keywords[key]);
    }
  }

  foundCourses = [...new Set(foundCourses)];

  if (foundCourses.length > 0) {
    return "Based on your interests, I recommend checking out: " + foundCourses.join(", ") + ". Click on the corresponding branch to enroll!";
  } else {
    return "I'm not sure which specific course matches that. Try mentioning keywords like 'Python', 'AI', 'data', or 'circuits'!";
  }
}