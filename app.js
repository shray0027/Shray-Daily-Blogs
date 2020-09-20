const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");
const ejs = require("ejs");
const app = express();
const homeStartingContent = "Hey, this is my personal Blog website , Here I upload my day to day experiance of understanding coding and development ,though I hate software coding but its is necessory for getting a job , so I have decided thhat I will give my best to learn data structures and algorithm and then there will see where I go .Stay tuned for my next Blog post and lets see what life awaits.";
const aboutContent = "My name is Shray Anand ,I am a college student  ,who fall on the path of computer science and now is dealing with it . I love web development bbecause its the thing which gives visual representation to my work . I have scored 93% in 12th standars and 9.12 CGPA in 10th ,currently studying in J.C.Bose UST, YMCA faridabad . I have 2 goals either to become a civil servent or go to germany and start a life there";
const contactContent = "I live in city named Faridabad , Haryana which is in India  .You can contact me via Facebook (Shray Anand) , Gmail (shrayanand000@gmail.com) or Phhone no. 8800836113 , my address is hno. - 2828 sector 7a Faridabad , Haryana ,India";
var posts =[];

app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));
app.set("view engine","ejs")

app.get("/",function(req,res){
  res.render("home",{
    homeSartingContent : homeStartingContent,
    posts :posts
  });
});
app.get ("/post/:postName",function(req,res){
   var postName = req.params.postName;
   posts.forEach(function(post){
     const title =post.title;
     const content = post.content
     if(_.lowerCase(title)==_.lowerCase(postName)){
       res.render("post",{
         title : title ,
         content : content
       });
     };
   });



});

app.get("/compose",function(req,res){
    res.render("compose");
})
app.get("/contact",function(req,res){
    res.render("contact",{
      contactContent :contactContent
    });
})
app.get("/about",function(req,res){
    res.render("about",{
      aboutContent :aboutContent
    });
})

app.post("/compose",function(req,res){
     const post = {
       title : req.body.title,
       content : req.body.content
     }
     posts.push(post);
     res.redirect("/");
});

app.listen(3000,function(){
  console.log("server just started on port 3000");
});
