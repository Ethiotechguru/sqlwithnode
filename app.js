const express = require('express');
const mysql = require("mysql2");
const bodyParser  = require("body-parser");
const cors = require('cors')
const app = express();
// require('dotenv').config();
// const password = process.env.MYSQL_ROOT_PASSWORD;
app.set("view engine", "ejs");

app.use(cors())
app.use(bodyParser.json());

// app.use((req, res, next) => {
// 	res.setHeader("Access-Control-Allow-Origin", "*");
// 	res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
// 	res.setHeader("Access-Control-Allow-Headers", "Content-Type");
// 	next();
// });
// app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
//"@faker-js/faker": "^7.5.0",
//COPY package.json .
//process.env.DB_USER
//process.env.DB_PASSWORD
//process.env.DB_NAME
const connection = mysql.createConnection({
	host: "mysql_db",
	user: "root",
	password: process.env.MYSQL_ROOT_PASSWORD,
	database: process.env.MYSQL_DATABASE,
});
// const database = mysql.createConnection({
// 	user: process.env.DB_USER,
// 	password: process.env.DB_PASSWORD,
// 	database: process.env.DB_NAME,
// });
let users= [
	{ id: 1, username: "samule@me", email: "sam@gmail.com" },
	{ id: 1, username: "samule@me", email: "sam@gmail.com" },
	,
	{ id: 1, username: "su@me", email: "sam@gmail.com" },
	,
	{ id: 1, username: "me_me", email: "sam@gmail.com" },
	,
	{ id: 1, username: "sam_sam", email: "sam@gmail.com" },
];
app.get("/", function (req, res) {
    // Find count of users in DB
    const q = "SELECT COUNT(*) AS count FROM users";
    connection.query(q, function(err, results){
        if(err) throw err;

        // const count = results[0].count;
        res.render("home", {count: 200});
    });
    // res.render("home", { count: 200 });
});
app.get('/all-users',(req,res)=>{
    let q = 'select * from users';
    connection.query(q,(err,results)=>{
        if(err) throw err;
        res.render('users',{
            users:results
        })
        return;
    })
    // res.render("users", {
	// 	users:users
	// });
})
app.get('/api',(req,res)=>{
    let q = 'select * from users';
    connection.query(q,(err,results)=>{
        if(err) throw err;
        res.json(results)
        return;
    })
    // res.render("users", {
	// 	users:users
	// });
})
app.post("/register", function(req, res){
    console.log(req.body)
    const person = {
        username:req.body.username
    };
    console.log(person);
    if(person.username === ''){
        console.log('empty')
        console.log("required fields are empty");
        return res.redirect('/')
    }else{
        // console.log(person)
        connection.query("INSERT INTO users SET ?", person, function (err, result) {
            if (err) {
                throw new Error('something went wrong');
            }
            else{
                res
                .status(201)
                .json({ message: 'Goal saved', goal:result });
            }
        });
        // console.log(person)
        // users.push(person);
		// res.redirect("/");
    }
    
});
//172.19.0.3
//172.19.0.2

//9a4bab6c5e57ca61908f0680796b7cf2f8626490f4494c4a7f9ffbfb7da90e1b
//9a4bab6c5e57ca61908f0680796b7cf2f8626490f4494c4a7f9ffbfb7da90e1b

//b7f6e73f7e28009502c492c7d35028398dd3b9db2e8d54ec899381b95a620aea
app.listen(8080, function(){
    console.log("Server running on 8080!");
});