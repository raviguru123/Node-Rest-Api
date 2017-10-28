let express=require("express");
let bodyParser=require("body-parser");
let cookieParser=require("cookie-parser");
let logger=require("morgan");
let path=require("path");

let app=express();

let gpca=require("./routes/gpca/gpca");
let gpba=require("./routes/gpba/gpba");
let admin=require("./routes/admin/admin");
let miscellaneous=require("./routes/miscellaneous/miscellaneous");

app.use("/api/gpca",gpca);
app.use("/api/gpba",gpba);
app.use("/api/admin",admin);
app.use("/api/miscellaneous",miscellaneous);


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());

app.use("/public",express.static(path.join(__dirname,"public")));
app.use("/public",express.static(path.join(__dirname,"bower_components")));

app.get("/",function(req,res,next){
	res.sendFile(path.join(__dirname,"views/index.html"));
});


app.use(function(req,res,next){
	var err=new Error("404 NOT FOUND");
	err.status=404;
	next(err);
});

app.use(function(err,req,res,next){
	res.locals.message=err.message;
	res.locals.err=req.app.get('env')==="development"?err:{};
	res.status(err.status||500);
	res.render("err");

});

module.exports=app;









