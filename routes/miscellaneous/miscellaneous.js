let express=require("express")
let router=express.Router();

router.get("/exceldata",function(req,res,next){
	res.send("this is miscellaneous section");
});


module.exports=router;


