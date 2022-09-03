const express = require('express');
const mysql = require('mysql');
const bodyParser  = require("body-parser");
const app = express();
require('dotenv').config();
const password = process.env.SQL_PASSWORD;
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

//COPY package.json .

// const connection = mysql.createConnection({
// 	host: "localhost",
// 	user: "root",
// 	password: password,
// 	database: "join_us",
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
    // const q = "SELECT COUNT(*) AS count FROM users";
    // connection.query(q, function(err, results){
    //     if(err) throw err;
    //     const count = results[0].count;
    //     res.render("home", {count: count});
    // });
    res.render("home", { count: 200 });
});
app.get('/all-users',(req,res)=>{
    // let q = 'select * from users';
    // connection.query(q,(err,results)=>{
    //     if(err) throw err;
    //     res.render('users',{
    //         users:results
    //     })
    //     return;
    // })
    res.render("users", {
		users:users
	});
})
app.post("/register", function(req, res){
    const person = {
        email: req.body.email,
        username:req.body.username
    };
    if(person.email === '' || person.username === ''){
        console.log('empty')
        console.log("required fields are empty");
        return res.redirect('/')
    }else{
        // console.log(person)
        // connection.query("INSERT INTO users SET ?", person, function (err, result) {
        //     if (err) {
        //         return res.redirect('/');

        //     };
        //     users.push(person);
        //     res.redirect("/");
        // });
        console.log(person)
        users.push(person);
		res.redirect("/");
    }
    
});

app.listen(8080, function(){
    console.log("Server running on 8080!");
});