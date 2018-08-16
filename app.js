var express = require("express"),
app = express(),
bodyParser = require("body-parser"),
mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/blog_app', { useNewUrlParser: true });app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

// MONGOOSE/MODEL CONFIG

var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);


//RESETFUL ROUTES

app.get("/", function(req, res){
    res.redirect("/blogs");
});

app.get("/blogs", function(req, res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log("error");
        } else {
            res.render("index", {blogs: blogs});
        }
    });
})







app.listen(process.env.PORT, process.env.IP, function(){
    console.log("blog app server is running!");
})