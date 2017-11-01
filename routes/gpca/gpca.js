let express=require("express")
let router=express.Router();

router.get("/",function(req,res,next){
	res.send("this is from gpca section");
});




module.exports=router;


