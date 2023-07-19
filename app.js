//jshint esversion:6

const express = require("express");
const parse = require("body-parser");
const req = require("request");
const https = require("https");

const app = express();
app.use(express.static("public"));
app.use(parse.urlencoded({extended: true}));

app.post("/", function(req, res){
    const fnam = req.body.fname;
    const lnam = req.body.lname;
    const email = req.body.email;

    const data = {
        members: [{
            email_address: email,
            status : "subscribed",
            merge_fields:{
                FNAME: fnam,
                LNAME: lnam
            }
        }]
    };
    const jsonData = JSON.stringify(data);
    const url = "https://us8.api.mailchimp.com/3.0/lists/72e26bf35c"; 

    const option = {
        method: "POST", 
        auth: "satish1:102397731f2972a15cfad2dfbb2e3912-us8"
    }

//102397731f2972a15cfad2dfbb2e3912-us8
    const request = https.request(url, option, function(responce){

        if(responce.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        }else{
            res.sendFile(__dirname + "/failure.html");
        }

        responce.on("data", function(data){
            console.log(JSON.parse(data)); 
        })
    })
    request.write(jsonData);
    request.end();
});

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/failure", function(req, res){
    res.redirect("/");
})

app.listen(3000, function(){
    console.log("server has started 3000.");
});

