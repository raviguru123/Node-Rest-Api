let express=require("express")
let router=express.Router();


router.get("/",function(req,res,next){
	res.send("this is from admin section");
});

module.exports=router;