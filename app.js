let express=require("express");
let bodyParser=require("body-parser");
let cookieParser=require("cookie-parser");
let logger=require("morgan");

let gpca=require("./routes/gpca");
let gpba=require("./routes/gpba");
let admin=require("./routes/admin");

let app=express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,"public")));


app.use(gpca);
app.use(gpba);
app.use(admin);

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









