const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();

app.use(cors());
app.use(express.json());

/* MYSQL CONNECTION */

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "2004",   // change if your MySQL has password
    database: "coursehub"
});

db.connect((err)=>{
    if(err){
        console.log("Database connection failed");
    }else{
        console.log("Connected to MySQL database");
    }
});

app.get("/", (req, res) => {
    res.send("CourseHub backend is running 🚀");
});

/* ENROLL API */

app.post("/api/enroll", (req, res) => {

const {name, email, reg, course, branch} = req.body;

const sql = "INSERT INTO enrollments (name,email,reg_number,course,branch) VALUES (?,?,?,?,?)";

db.query(sql, [name, email, reg, course, branch], (err, result) => {

    if(err){
        console.log(err);
        res.status(500).send("Error saving enrollment");
    } else {
        res.send("Enrollment successful");
    }

});

});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});