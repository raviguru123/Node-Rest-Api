let express=require("express")
let router=express.Router();

router.get("/",function(req,res,next){
	res.send("this is from gpba section");
});


module.exports=router;